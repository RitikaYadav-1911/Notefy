const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    console.log('Looking for user:', email); 
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for:', email); 
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ email: user.email });
  } catch (err) {
    console.error('Error fetching user:', err); 
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
