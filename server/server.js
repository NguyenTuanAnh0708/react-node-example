// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5001;

// Manually configure CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('myFile');

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|txt|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Files Only!');
    }
}

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).send({ message: 'No File Selected!' });
            } else {
                res.send({
                    message: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

app.post('/send-obj', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).send('No data provided');
    }

    try {
        const decodedObj = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
        console.log('Received object:', decodedObj);

        // Process the object as needed

        res.status(200).json({ message: 'Success', decodedObj });
    } catch (error) {
        console.error('Error decoding object:', error);
        res.status(500).send('Error decoding object');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
