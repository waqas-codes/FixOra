const express = require('express');
const router = express.Router();
const { getWorkers, createWorker, deleteWorker } = require('../controllers/workerController');

router.get('/', getWorkers);
router.post('/', createWorker);
router.delete('/:id', deleteWorker);

module.exports = router;
