import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    callback(null, `blog-${Date.now()}.${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new GlobalError('Please upload an image!', 400));
  }
};
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
