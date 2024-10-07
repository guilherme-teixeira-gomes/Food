import multer from "multer";
import fs from "fs";

const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = 'public/uploads/operadoras';

        // Check if the destination directory exists
        if (!fs.existsSync(destinationPath)) {
            // If it doesn't exist, create the directory
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueId = uuidv4(); // Generate a unique ID for the filename
        const fileExt = path.extname(file.originalname); // Get the file extension from the original filename
        const newFilename = `${uniqueId}${fileExt}`;
        cb(null, newFilename)
    }
});

export const uploadOperadoraDoc = multer({ storage: storage });