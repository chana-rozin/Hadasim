import {getMultiple, create, getById, remove, update} from '../Services/m-image.js';
import express, { json } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const imageRoute=express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination directory for file uploads
        cb(null, "../uploads"); // Adjust the destination directory as needed
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const ext = file.originalname.split(".").pop();
        const filename = `${file.fieldname}-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Serve uploaded photos statically
imageRoute.use('/photo', express.static(path.join(__dirname, 'uploads')));

imageRoute.get('/photo',async (req, res, next)=>{
    try {
        res.json(await getPhoto(req.memberId));
      } catch (err) {
        console.error(`Error while searching photo `, err.message);
        next(err);
      }
})


imageRoute.post('/photo', upload.single('image'), (req, res, next) => {
    // Check if file upload failed or not an image
    if (!req.file || !req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return res.status(400).json({ error: 'Only image files (jpg, jpeg, png, gif) are allowed!' });
    }
    console.log("post photo function hi");
    // Add the photo only if file upload was successful and it's an image
    addPhoto(req.memberId, req.file.filename)
        .then(result => {
            res.json({ message: result.message });
        })
        .catch(err => {
            console.error("Error adding photo:", err);
            res.status(500).json({ error: "Error adding photo" });
        });
});

export default imageRoute;