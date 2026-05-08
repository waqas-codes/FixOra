const Worker = require('../models/Worker');

// @desc    Get all workers
// @route   GET /api/workers
// @access  Private/Admin
exports.getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a worker
// @route   POST /api/workers
// @access  Private/Admin
exports.createWorker = async (req, res) => {
  try {
    const { name, address, phone, skill, age } = req.body;
    const worker = await Worker.create({
      name,
      address,
      phone,
      skill,
      age
    });
    res.status(201).json(worker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a worker
// @route   DELETE /api/workers/:id
// @access  Private/Admin
exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    await worker.deleteOne();
    res.status(200).json({ message: 'Worker removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
