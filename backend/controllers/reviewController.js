import Review from '../models/Review.js';
import ServiceRequest from '../models/ServiceRequest.js';

// @desc    Create a review (customer only)
// @route   POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { requestId, rating, comment } = req.body;

    // Validate required fields
    if (!requestId || !rating || !comment) {
      return res.status(400).json({
        message: 'Please provide requestId, rating, and comment',
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'Rating must be between 1 and 5',
      });
    }

    // Check if request exists
    const request = await ServiceRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        message: 'Service request not found',
      });
    }

    // Check if request belongs to the logged-in customer
    if (request.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to review this request',
      });
    }

    // Check if request status is completed
    if (request.status !== 'completed') {
      return res.status(400).json({
        message: 'Can only review completed requests',
      });
    }

    // Check if review already exists for this request
    const existingReview = await Review.findOne({ request: requestId });
    if (existingReview) {
      return res.status(400).json({
        message: 'You have already reviewed this request',
      });
    }

    // Create the review
    const review = await Review.create({
      customer: req.user._id,
      request: requestId,
      rating,
      comment,
    });

    // Populate and return
    const populatedReview = await review.populate([
      { path: 'customer', select: 'name email' },
      { path: 'request', select: 'title serviceType' },
    ]);

    res.status(201).json(populatedReview);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already reviewed this request',
      });
    }
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all reviews (admin: all, customer: own)
// @route   GET /api/reviews
export const getReviews = async (req, res) => {
  try {
    let reviews;

    if (req.user.role === 'admin') {
      // Admin gets all reviews with customer and request details
      reviews = await Review.find()
        .populate('customer', 'name email')
        .populate('request', 'title serviceType')
        .sort({ createdAt: -1 });
    } else {
      // Customer gets only their own reviews
      reviews = await Review.find({ customer: req.user._id })
        .populate('request', 'title serviceType')
        .sort({ createdAt: -1 });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Check if a request has been reviewed (for frontend button state)
// @route   GET /api/reviews/check/:requestId
export const checkReviewStatus = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Check if request exists and belongs to customer
    const request = await ServiceRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (
      req.user.role === 'customer' &&
      request.customer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if review exists
    const review = await Review.findOne({ request: requestId });

    res.json({
      hasReview: !!review,
      reviewId: review?._id || null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
