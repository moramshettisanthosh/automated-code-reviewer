const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/javascript', 'application/json', 'text/plain', 'text/x-python', 'text/x-java-source', 'text/x-csrc', 'text/x-c++src', 'application/x-php', 'text/x-go', 'text/rust'];
    cb(null, allowed.includes(file.mimetype) || file.originalname.match(/\.(js|ts|py|java|c|cpp|cs|go|php|rs)$/i));
  },
});

module.exports = upload;
