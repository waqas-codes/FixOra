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

  const newStatus = req.body.status || request.status;

  if (newStatus === 'Completed' && (!request.assignedWorkers || request.assignedWorkers.length === 0)) {
    return res.status(400).json({ message: 'Please assign worker(s) before completing request.' });
  }

  request.status = newStatus;
  const updatedRequest = await request.save();

  res.json(updatedRequest);
};

// @desc    Assign workers to request
// @route   PUT /api/requests/:id/assign
// @access  Private/Admin
const assignWorker = async (req, res) => {
  const request = await ServiceRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: 'Request not found' });
  }

  const { workerNames } = req.body;

  // Support both old single workerName and new workerNames array
  const names = workerNames || (req.body.workerName ? [req.body.workerName] : []);

  if (!names.length) {
    return res.status(400).json({ message: 'Please provide worker names' });
  }

  const maxWorkers = request.workersRequired || 1;

  if (names.length > maxWorkers) {
    return res.status(400).json({ message: `Cannot assign more than ${maxWorkers} workers` });
  }

  request.assignedWorkers = names;
  request.status = names.length >= maxWorkers ? 'Assigned' : request.status;

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
