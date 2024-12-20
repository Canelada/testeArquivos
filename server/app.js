const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = 5000;

mongoose.connect(
  'mongodb+srv://ti:U2vQtlRnF0q7y3sD@lutobook.uimdu.mongodb.net/?retryWrites=true&w=majority&appName=lutobook',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/files', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});