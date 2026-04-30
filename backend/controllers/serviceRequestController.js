import ServiceRequest from '../models/ServiceRequest.js';

// @desc    Get service requests (admin: all, customer: own)
// @route   GET /api/service-requests
export const getServiceRequests = async (req, res) => {
  try {
    let requests;
    if (req.user.role === 'admin') {
      requests = await ServiceRequest.find()
        .populate('customer', 'name email phone')
        .populate('assignedWorker', 'name specialization phone')
        .sort({ createdAt: -1 });
    } else {
      requests = await ServiceRequest.find({ customer: req.user._id })
        .populate('assignedWorker', 'name specialization phone')
        .sort({ createdAt: -1 });
    }
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a service request (customer)
// @route   POST /api/service-requests
export const createServiceRequest = async (req, res) => {
  try {
    const { title, description, serviceType, priority, address, scheduledDate } =
      req.body;

    const request = await ServiceRequest.create({
      title,
      description,
      serviceType,
      priority: priority || 'medium',
      address: address || '',
      scheduledDate: scheduledDate || null,
      customer: req.user._id,
    });

    const populated = await request.populate('customer', 'name email phone');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a service request (admin: status/assign, customer: own details)
// @route   PUT /api/service-requests/:id
export const updateServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Customers can only update their own requests
    if (
      req.user.role === 'customer' &&
      request.customer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // If completing, set completedDate
    if (req.body.status === 'completed') {
      req.body.completedDate = new Date();
    }

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('customer', 'name email phone')
      .populate('assignedWorker', 'name specialization phone');

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a service request
// @route   DELETE /api/service-requests/:id
export const deleteServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    if (
      req.user.role === 'customer' &&
      request.customer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service request removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/service-requests/stats
export const getStats = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'customer') {
      filter = { customer: req.user._id };
    }

    const total = await ServiceRequest.countDocuments(filter);
    const pending = await ServiceRequest.countDocuments({
      ...filter,
      status: 'pending',
    });
    const approved = await ServiceRequest.countDocuments({
      ...filter,
      status: 'approved',
    });
    const inProgress = await ServiceRequest.countDocuments({
      ...filter,
      status: 'in-progress',
    });
    const completed = await ServiceRequest.countDocuments({
      ...filter,
      status: 'completed',
    });
    const cancelled = await ServiceRequest.countDocuments({
      ...filter,
      status: 'cancelled',
    });

    res.json({ total, pending, approved, inProgress, completed, cancelled });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
