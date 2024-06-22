import multer from 'multer';
import path from 'path';

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'public/userImages'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;
