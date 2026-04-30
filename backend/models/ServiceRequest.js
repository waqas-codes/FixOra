import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    serviceType: {
      type: String,
      required: [true, 'Please provide a service type'],
      enum: [
        'Plumbing',
        'Electrical',
        'Cleaning',
        'Painting',
        'Carpentry',
        'HVAC',
        'Landscaping',
        'General Maintenance',
        'Other',
      ],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      default: null,
    },
    address: {
      type: String,
      default: '',
    },
    scheduledDate: {
      type: Date,
      default: null,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
export default ServiceRequest;
