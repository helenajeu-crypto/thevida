import express from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment';
import { sendAppointmentEmail } from '../utils/email';

const router = express.Router();

// Create new appointment
router.post('/', [
  body('branch').isIn(['incheon', 'anyang']).withMessage('올바른 지점을 선택해주세요'),
  body('date').isISO8601().withMessage('올바른 날짜 형식이 아닙니다'),
  body('time').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('올바른 시간 형식이 아닙니다'),
  body('elderName').trim().isLength({ min: 1, max: 50 }).withMessage('어르신 성함은 1-50자여야 합니다'),
  body('guardianName').trim().isLength({ min: 1, max: 50 }).withMessage('보호자 성함은 1-50자여야 합니다'),
  body('guardianPhone').matches(/^[0-9-]+$/).isLength({ min: 10 }).withMessage('올바른 전화번호 형식이 아닙니다'),
  body('relationship').trim().isLength({ min: 1, max: 20 }).withMessage('관계는 1-20자여야 합니다'),
  body('inquiryType').isIn(['입원 상담', '서비스 문의', '견학 신청', '기타']).withMessage('올바른 문의 유형을 선택해주세요'),
  body('message').optional().trim().isLength({ max: 1000 }).withMessage('문의 내용은 1000자를 초과할 수 없습니다')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();

    // Send confirmation email
    try {
      await sendAppointmentEmail(appointment);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: '방문상담 예약이 성공적으로 접수되었습니다',
      data: appointment
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: '해당 시간에 이미 예약이 있습니다'
      });
    }
    
    res.status(500).json({
      success: false,
      message: '예약 접수 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// Get available slots for a specific date and branch
router.get('/availability/:branch/:date', async (req, res) => {
  try {
    const { branch, date } = req.params;
    
    if (!['incheon', 'anyang'].includes(branch)) {
      return res.status(400).json({
        success: false,
        message: '올바른 지점을 선택해주세요'
      });
    }

    // Get all appointments for the date and branch
    const appointments = await Appointment.find({
      branch,
      date,
      status: { $ne: 'cancelled' }
    }).select('time');

    const bookedTimes = appointments.map(apt => apt.time);

    // Business hours configuration (from frontend config)
    const businessHours = {
      incheon: {
        sun: null,
        mon: { open: '10:00', close: '17:00' },
        tue: { open: '10:00', close: '17:00' },
        wed: { open: '10:00', close: '17:00' },
        thu: { open: '10:00', close: '17:00' },
        fri: { open: '10:00', close: '17:00' },
        sat: { open: '10:00', close: '14:00' },
      },
      anyang: {
        sun: null,
        mon: { open: '10:00', close: '17:00' },
        tue: { open: '10:00', close: '17:00' },
        wed: { open: '10:00', close: '17:00' },
        thu: { open: '10:00', close: '17:00' },
        fri: { open: '10:00', close: '17:00' },
        sat: { open: '10:00', close: '14:00' },
      }
    };

    const dayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date(date).getDay()];
    const hours = businessHours[branch as keyof typeof businessHours][dayKey as keyof typeof businessHours.incheon];

    if (!hours) {
      return res.json({
        success: true,
        data: {
          open: false,
          availableSlots: [],
          bookedSlots: [],
          closedReason: 'closedDay'
        }
      });
    }

    // Generate all time slots
    const slotIntervalMinutes = 30;
    const allSlots: string[] = [];
    
    const startMin = parseInt(hours.open.split(':')[0]) * 60 + parseInt(hours.open.split(':')[1]);
    const endMin = parseInt(hours.close.split(':')[0]) * 60 + parseInt(hours.close.split(':')[1]);
    
    for (let t = startMin; t <= endMin - slotIntervalMinutes; t += slotIntervalMinutes) {
      const h = Math.floor(t / 60).toString().padStart(2, '0');
      const m = (t % 60).toString().padStart(2, '0');
      allSlots.push(`${h}:${m}`);
    }

    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
    const bookedSlots = allSlots.filter(slot => bookedTimes.includes(slot));

    res.json({
      success: true,
      data: {
        open: true,
        availableSlots,
        bookedSlots
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '가용 시간 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// Get appointment by ID (for admin use)
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: '예약을 찾을 수 없습니다'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '예약 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

export default router;
