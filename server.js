const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

// Middleware for handling file uploads
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('hoang')
})
// POST /upload route
app.post('/upload', (req, res) => {
    // Check if files were uploaded
    console.log(req);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Get the uploaded file
    const file = req.files.file;

    // Set the path to save the file
    const uploadPath = path.join(__dirname, 'upload', file.name);
    // Save the file to the specified path
    file.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.send('File uploaded and saved OKKKKKKKKKKKKKKKK.');
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});