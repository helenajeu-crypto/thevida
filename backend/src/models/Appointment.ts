import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  branch: 'incheon' | 'anyang';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  elderName: string;
  guardianName: string;
  guardianPhone: string;
  relationship: string;
  inquiryType: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>({
  branch: {
    type: String,
    enum: ['incheon', 'anyang'],
    required: [true, '지점을 선택해주세요']
  },
  date: {
    type: String,
    required: [true, '방문 날짜를 선택해주세요'],
    validate: {
      validator: function(v: string) {
        const date = new Date(v);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      message: '방문 날짜는 오늘 이후여야 합니다'
    }
  },
  time: {
    type: String,
    required: [true, '방문 시간을 선택해주세요'],
    validate: {
      validator: function(v: string) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: '올바른 시간 형식이 아닙니다 (HH:mm)'
    }
  },
  elderName: {
    type: String,
    required: [true, '어르신 성함을 입력해주세요'],
    trim: true,
    maxlength: [50, '어르신 성함은 50자를 초과할 수 없습니다']
  },
  guardianName: {
    type: String,
    required: [true, '보호자 성함을 입력해주세요'],
    trim: true,
    maxlength: [50, '보호자 성함은 50자를 초과할 수 없습니다']
  },
  guardianPhone: {
    type: String,
    required: [true, '보호자 연락처를 입력해주세요'],
    validate: {
      validator: function(v: string) {
        return /^[0-9-]+$/.test(v) && v.length >= 10;
      },
      message: '올바른 전화번호 형식이 아닙니다'
    }
  },
  relationship: {
    type: String,
    required: [true, '어르신과의 관계를 입력해주세요'],
    trim: true,
    maxlength: [20, '관계는 20자를 초과할 수 없습니다']
  },
  inquiryType: {
    type: String,
    required: [true, '문의 유형을 선택해주세요'],
    enum: ['입원 상담', '서비스 문의', '견학 신청', '기타']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, '문의 내용은 1000자를 초과할 수 없습니다']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Compound index for unique appointments
appointmentSchema.index({ branch: 1, date: 1, time: 1 }, { unique: true });

// Pre-save middleware to check for conflicts
appointmentSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('branch') || this.isModified('date') || this.isModified('time')) {
    const existingAppointment = await mongoose.model('Appointment').findOne({
      branch: this.branch,
      date: this.date,
      time: this.time,
      _id: { $ne: this._id }
    });
    
    if (existingAppointment) {
      const error = new Error('해당 시간에 이미 예약이 있습니다');
      return next(error);
    }
  }
  next();
});

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);
