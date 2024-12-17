const multer = require('multer');
const File = require('../models/fileModel');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');


exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send(err);
    }

    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      data: req.file.buffer,
      size: req.file.size
    });

    newFile.save()
      .then(() => res.status(201).json(newFile))
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.getFiles = (req, res) => {
  File.find()
    .then(files => res.json(files))
    .catch(error => res.status(500).json({ error }));
};

exports.getFile = (req, res) => {
  File.findById(req.params.id)
    .then(file => {
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      res.json(file);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteFile = (req, res) => {
  File.findByIdAndDelete(req.params.id)
    .then(file => {
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      res.json({ message: 'File deleted successfully' });
    })
    .catch(error => res.status(500).json({ error }));
};