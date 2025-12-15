import multer from "multer";
import path from "path";
import fs from "fs";

// Directory to store images
const IMAGES_DIR = path.join(process.cwd(), "uploads/images");

// Ensure directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGES_DIR);
  },
  filename: (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  let prefix = "file";

  if (file.fieldname === "image_url") prefix = "user";
  if (file.fieldname === "service_image") prefix = "service";
  if (file.fieldname === "product_image") prefix = "product";

  const filename = `${prefix}-${Date.now()}${ext}`;
  cb(null, filename);
},

});

// Filter allowed image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed!"));
  }
};

// 5 MB max file size
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
