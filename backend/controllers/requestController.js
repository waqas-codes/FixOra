const ServiceRequest = require('../models/ServiceRequest');

// @desc    Create new service request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
  const { serviceType, date, location, workersRequired, description } = req.body;

  console.log(req);

  if (!serviceType || !date || !location || !workersRequired || !description) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  const request = await ServiceRequest.create({
    user: req.user.id,
    serviceType,
    date,
    location,
    workersRequired,
    description,
  });

  if (request) {
    res.status(201).json(request);
  } else {
    res.status(400).json({ message: 'Invalid request data' });
  }
};

// @desc    Get logged in user requests
// @route   GET /api/requests/my
// @access  Private
const getUserRequests = async (req, res) => {
  const requests = await ServiceRequest.find({ user: req.user.id }).sort('-createdAt');
  res.json(requests);
};

// @desc    Get all requests (Admin Only)
// @route   GET /api/requests
// @access  Private/Admin
const getAllRequests = async (req, res) => {
  const requests = await ServiceRequest.find({}).populate('user', 'name email').sort('-createdAt');
  console.log(requests);
  res.json(requests);
};

// @desc    Update request status
// @route   PUT /api/requests/:id/status
// @access  Private/Admin
const updateStatus = async (req, res) => {
  const request = await ServiceRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: 'Request not found' });
  }

  if (request.status === 'Completed') {
    return res.status(400).json({ message: 'Cannot update a completed request' });
  }

  request.status = req.body.status || request.status;
  const updatedRequest = await request.save();

  res.json(updatedRequest);
};

// @desc    Assign worker to request
// @route   PUT /api/requests/:id/assign
// @access  Private/Admin
const assignWorker = async (req, res) => {
  const request = await ServiceRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: 'Request not found' });
  }

  if (request.assignedWorker) {
    return res.status(400).json({ message: 'Worker already assigned' });
  }

  request.assignedWorker = req.body.workerName;
  request.status = 'Assigned';

  const updatedRequest = await request.save();
  res.json(updatedRequest);
};

// @desc    Add review to request
// @route   PUT /api/requests/:id/review
// @access  Private
const addReview = async (req, res) => {
  const { rating, review } = req.body;
  const request = await ServiceRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: 'Request not found' });
  }

  // Check if it belongs to user
  if (request.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  if (request.status !== 'Completed') {
    return res.status(400).json({ message: 'Can only review completed services' });
  }

  if (request.review) {
    return res.status(400).json({ message: 'Review already submitted' });
  }

  request.rating = rating;
  request.review = review;

  const updatedRequest = await request.save();
  res.json(updatedRequest);
};

module.exports = {
  createRequest,
  getUserRequests,
  getAllRequests,
  updateStatus,
  assignWorker,
  addReview,
};
