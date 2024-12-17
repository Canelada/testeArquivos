const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/upload', fileController.uploadFile);
router.get('/', fileController.getFiles);
router.get('/:id', fileController.getFile);
router.delete('/:id', fileController.deleteFile);

module.exports = router;