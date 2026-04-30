import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  icon: {
    type: String,
    default: 'Tool',
  },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
