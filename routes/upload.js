
const express = require('express');
const router = express.Router();

const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const requireAuth = require('../middleware/auth');
const Upload = require('../models/Upload');

router.post(
    '/',
    requireAuth,
    upload.single('file'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: 'No file uploaded'
                });
            }

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'lesson7_uploads' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(req.file.buffer);
            });

            const savedUpload = await Upload.create({
                url: result.secure_url,
                publicId: result.public_id,
                uploadedBy: req.user.id
            });

            res.status(201).json(savedUpload);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }
);

module.exports = router;
