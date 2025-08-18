import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  type: 'slider' | 'service' | 'facility' | 'info' | 'settings';
  title: string;
  description?: string;
  content: any;
  images?: string[];
  order?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>({
  type: {
    type: String,
    required: true,
    enum: ['slider', 'service', 'facility', 'info', 'settings']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: Schema.Types.Mixed,
    required: true
  },
  images: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// 인덱스 생성
ContentSchema.index({ type: 1, isActive: 1 });
ContentSchema.index({ type: 1, order: 1 });

export default mongoose.model<IContent>('Content', ContentSchema);
