const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 4444;

// Enable CORS for all routes
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST endpoint for uploading files
app.post('/api/upload', upload.single('glbFile'), (req, res) => {
    if (req.file) {
        res.json({
            message: 'File uploaded successfully!',
            filename: req.file.filename
        });
    } else {
        res.status(400).send('No file uploaded.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
