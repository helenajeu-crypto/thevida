import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin';
import Appointment from '../models/Appointment';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Admin login
router.post('/login', [
  body('email').isEmail().withMessage('올바른 이메일 형식이 아닙니다'),
  body('password').isLength({ min: 6 }).withMessage('비밀번호는 최소 6자 이상이어야 합니다')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다'
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: '로그인 성공',
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '로그인 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// Get admin profile (protected route)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById((req as any).user.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: '관리자를 찾을 수 없습니다'
      });
    }

    res.json({
      success: true,
      data: admin
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '프로필 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// Get all appointments (protected route)
router.get('/appointments', authMiddleware, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      branch, 
      date,
      search 
    } = req.query;

    const query: any = {};

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by branch
    if (branch && branch !== 'all') {
      query.branch = branch;
    }

    // Filter by date
    if (date) {
      query.date = date;
    }

    // Search by name or phone
    if (search) {
      query.$or = [
        { elderName: { $regex: search, $options: 'i' } },
        { guardianName: { $regex: search, $options: 'i' } },
        { guardianPhone: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          current: parseInt(page as string),
          total: Math.ceil(total / parseInt(limit as string)),
          totalItems: total
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '예약 목록 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// Update appointment status (protected route)
router.patch('/appointments/:id/status', authMiddleware, [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('올바른 상태를 선택해주세요')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: '예약을 찾을 수 없습니다'
      });
    }

    res.json({
      success: true,
      message: '예약 상태가 업데이트되었습니다',
      data: appointment
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '예약 상태 업데이트 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// Get appointment statistics (protected route)
router.get('/statistics', authMiddleware, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter: any = {};
    const now = new Date();
    
    if (period === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: weekAgo } };
    } else if (period === 'month') {
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      dateFilter = { createdAt: { $gte: monthAgo } };
    }

    const totalAppointments = await Appointment.countDocuments(dateFilter);
    const pendingAppointments = await Appointment.countDocuments({ ...dateFilter, status: 'pending' });
    const confirmedAppointments = await Appointment.countDocuments({ ...dateFilter, status: 'confirmed' });
    const completedAppointments = await Appointment.countDocuments({ ...dateFilter, status: 'completed' });

    // Branch statistics
    const incheonAppointments = await Appointment.countDocuments({ ...dateFilter, branch: 'incheon' });
    const anyangAppointments = await Appointment.countDocuments({ ...dateFilter, branch: 'anyang' });

    // Inquiry type statistics
    const inquiryTypes = await Appointment.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$inquiryType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        total: totalAppointments,
        pending: pendingAppointments,
        confirmed: confirmedAppointments,
        completed: completedAppointments,
        branches: {
          incheon: incheonAppointments,
          anyang: anyangAppointments
        },
        inquiryTypes
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '통계 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

export default router;
