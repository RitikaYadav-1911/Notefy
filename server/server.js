const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/api', userRoutes);


app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;

 
  if (filename.includes("..") || filename.includes("/")) {
    return res.status(400).send("Invalid file name");
  }

  const filePath = path.join(__dirname, 'uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', filePath);
      return res.status(404).send('File not found');
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  });
});


app.get('/', (req, res) => {
  res.send('Welcome to Notefy API');
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB Error:', err));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
