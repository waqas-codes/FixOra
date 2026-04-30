import Worker from '../models/Worker.js';

// @desc    Get all workers (admin only)
// @route   GET /api/workers
export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a worker (admin only)
// @route   POST /api/workers
export const createWorker = async (req, res) => {
  try {
    const { name, email, phone, specialization, hourlyRate, status } = req.body;

    const worker = await Worker.create({
      name,
      email: email || '',
      phone,
      specialization,
      hourlyRate: hourlyRate || 0,
      status: status || 'available',
      createdBy: req.user._id,
    });

    res.status(201).json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a worker (admin only)
// @route   PUT /api/workers/:id
export const updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    if (worker.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedWorker);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a worker (admin only)
// @route   DELETE /api/workers/:id
export const deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    if (worker.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Worker removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
