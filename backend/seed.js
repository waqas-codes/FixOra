import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Worker from './models/Worker.js';
import ServiceRequest from './models/ServiceRequest.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Worker.deleteMany({});
    await ServiceRequest.deleteMany({});

    // Create Admin (plain password — User model pre-save hook handles hashing)
    const admin = await User.create({
      name: 'Agency Admin',
      email: 'admin@fixora.com',
      password: 'admin123',
      role: 'admin',
      phone: '123-456-7890',
    });

    // Create Customer
    const customer = await User.create({
      name: 'John Customer',
      email: 'customer@gmail.com',
      password: 'customer123',
      role: 'customer',
      phone: '987-654-3210',
    });

    console.log('Users created.');

    // Create Workers
    const worker1 = await Worker.create({
      name: 'Mike Electrician',
      email: 'mike@fixora.com',
      phone: '555-0101',
      specialization: 'Electrical',
      hourlyRate: 45,
      status: 'available',
      createdBy: admin._id,
    });

    const worker2 = await Worker.create({
      name: 'Sarah Plumber',
      email: 'sarah@fixora.com',
      phone: '555-0102',
      specialization: 'Plumbing',
      hourlyRate: 50,
      status: 'busy',
      createdBy: admin._id,
    });

    console.log('Workers created.');

    // Create Service Requests
    await ServiceRequest.create({
      title: 'Fix kitchen sink leak',
      description: 'The faucet is dripping constantly and there is a puddle under the sink.',
      serviceType: 'Plumbing',
      status: 'pending',
      priority: 'high',
      customer: customer._id,
      address: '123 Maple St, Springfield',
    });

    await ServiceRequest.create({
      title: 'Install living room chandelier',
      description: 'Need to replace the old ceiling fan with a new crystal chandelier.',
      serviceType: 'Electrical',
      status: 'approved',
      priority: 'medium',
      customer: customer._id,
      assignedWorker: worker1._id,
      address: '123 Maple St, Springfield',
    });

    await ServiceRequest.create({
      title: 'Garage door repair',
      description: 'Spring seems to be broken, door wont stay open.',
      serviceType: 'General Maintenance',
      status: 'completed',
      priority: 'urgent',
      customer: customer._id,
      assignedWorker: worker2._id,
      address: '123 Maple St, Springfield',
      completedDate: new Date(),
    });

    console.log('Service requests created.');
    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seed();
