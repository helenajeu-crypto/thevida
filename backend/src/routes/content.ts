import express from 'express';
import { body, validationResult } from 'express-validator';
import Content from '../models/Content';
import { authMiddleware } from '../middleware/auth';
import { uploadSingle, uploadMultiple, handleUploadError } from '../middleware/upload';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// 모든 콘텐츠 조회 (공개)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query: any = { isActive: true };
    
    if (type) {
      query.type = type;
    }

    const contents = await Content.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: contents
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '콘텐츠 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// 특정 콘텐츠 조회 (공개)
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: '콘텐츠를 찾을 수 없습니다'
      });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '콘텐츠 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// 관리자용: 모든 콘텐츠 조회 (보호된 라우트)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;
    const query: any = {};
    
    if (type) {
      query.type = type;
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const contents = await Content.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Content.countDocuments(query);

    res.json({
      success: true,
      data: {
        contents,
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
      message: '콘텐츠 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// 콘텐츠 생성 (보호된 라우트)
router.post('/', authMiddleware, uploadMultiple, handleUploadError, [
  body('type').isIn(['slider', 'service', 'facility', 'info', 'settings']).withMessage('올바른 콘텐츠 타입을 선택해주세요'),
  body('title').notEmpty().withMessage('제목은 필수입니다'),
  body('content').notEmpty().withMessage('콘텐츠는 필수입니다')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { type, title, description, content, order } = req.body;
    
    // 업로드된 이미지 파일명들
    const images = req.files ? (req.files as Express.Multer.File[]).map(file => file.filename) : [];

    const newContent = new Content({
      type,
      title,
      description,
      content: JSON.parse(content),
      images,
      order: order || 0
    });

    await newContent.save();

    res.status(201).json({
      success: true,
      message: '콘텐츠가 생성되었습니다',
      data: newContent
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '콘텐츠 생성 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// 콘텐츠 수정 (보호된 라우트)
router.put('/:id', authMiddleware, uploadMultiple, handleUploadError, [
  body('title').notEmpty().withMessage('제목은 필수입니다'),
  body('content').notEmpty().withMessage('콘텐츠는 필수입니다')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, content, order, isActive } = req.body;
    
    const contentDoc = await Content.findById(req.params.id);
    if (!contentDoc) {
      return res.status(404).json({
        success: false,
        message: '콘텐츠를 찾을 수 없습니다'
      });
    }

    // 기존 이미지들
    let images = contentDoc.images || [];
    
    // 새로 업로드된 이미지들 추가
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const newImages = (req.files as Express.Multer.File[]).map(file => file.filename);
      images = [...images, ...newImages];
    }

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        content: JSON.parse(content),
        images,
        order: order || contentDoc.order,
        isActive: isActive !== undefined ? isActive : contentDoc.isActive
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: '콘텐츠가 수정되었습니다',
      data: updatedContent
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '콘텐츠 수정 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// 콘텐츠 삭제 (보호된 라우트)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: '콘텐츠를 찾을 수 없습니다'
      });
    }

    // 이미지 파일들 삭제
    if (content.images && content.images.length > 0) {
      const imagesDir = path.join(__dirname, '../../uploads/images');
      content.images.forEach(imageName => {
        const imagePath = path.join(imagesDir, imageName);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: '콘텐츠가 삭제되었습니다'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '콘텐츠 삭제 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

// 이미지 삭제 (보호된 라우트)
router.delete('/:id/images/:imageName', authMiddleware, async (req, res) => {
  try {
    const { id, imageName } = req.params;
    
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: '콘텐츠를 찾을 수 없습니다'
      });
    }

    // 이미지 배열에서 제거
    const updatedImages = content.images?.filter(img => img !== imageName) || [];
    
    // 파일 시스템에서 이미지 삭제
    const imagesDir = path.join(__dirname, '../../uploads/images');
    const imagePath = path.join(imagesDir, imageName);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // 데이터베이스 업데이트
    await Content.findByIdAndUpdate(id, { images: updatedImages });

    res.json({
      success: true,
      message: '이미지가 삭제되었습니다'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: '이미지 삭제 중 오류가 발생했습니다',
      error: error.message
    });
  }
});

export default router;
