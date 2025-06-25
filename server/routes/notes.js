const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Note = require('../models/Note');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|txt/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb('Error: Only images, PDFs, and TXT files are allowed');
  }
};

const upload = multer({ storage, fileFilter });


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description, tags, email } = req.body;
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const newNote = new Note({
      email,
      title,
      description,
      tags: tagsArray,
      imageUrl: `/uploads/${req.file.filename}`
    });

    await newNote.save();
    res.status(201).json({ message: 'Note uploaded successfully', note: newNote });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const { search = '', sort = 'latest', email } = req.query;

    let query = {};


    if (email) {
      query.email = email;
    }


    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let sortOption = {};
    if (sort === 'latest') sortOption = { createdAt: -1 };
    else if (sort === 'oldest') sortOption = { createdAt: 1 };
    else if (sort === 'az') sortOption = { title: 1 };
    else if (sort === 'za') sortOption = { title: -1 };

    const notes = await Note
      .find(query)
      .collation({ locale: 'en', strength: 2 })
      .sort(sortOption);

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
});

module.exports = router;
