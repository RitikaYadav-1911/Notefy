const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: 'Username, Email and Password required' });

        const userExists = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (userExists)
            return res.status(409).json({ message: 'User already exists with same username or email' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created Successfully' });
    }
    catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password)
            return res.status(400).json({message: 'Email and password are required'});

        const user=await User.findOne({email});
        if(!user)
            return res.status(401).json({message:'Invalid credentials'});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(401).json({message:'Invalid credentials'});

        const token=jwt.sign({userId: user._id}, JWT_SECRET,{expiresIn:'1h'});

        res.json({message:'Login Successful',token});
        
    }
    catch(err){
        res.status(500).json({message: 'Server error',error:err.message});
    }
});

module.exports = router;
