const express = require('express');
const upload = require('../config/multerConfig');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body; // Add hashing for password in production
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/upload', upload.single('glbFile'), (req, res) => {
    res.status(200).json({
        message: 'File uploaded successfully',
        filename: req.file.filename
    });
});

module.exports = router;
