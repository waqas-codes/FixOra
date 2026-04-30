import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide worker name'],
      trim: true,
    },
    email: {
      type: String,
      default: '',
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide worker phone'],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Please provide worker specialization'],
      trim: true,
    },
    hourlyRate: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['available', 'busy', 'off-duty'],
      default: 'available',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;
