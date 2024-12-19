const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', fileController.uploadFile);
router.get('/', fileController.getFiles);
router.get('/:id', fileController.getFileById); // Add this line

module.exports = router;
