const UploadedFile = require('../models/UploadedFile');
const ActivityLog = require('../models/ActivityLog');

const mapExtensionToLanguage = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const mapping = {
    js: 'JavaScript', ts: 'TypeScript', py: 'Python', java: 'Java', c: 'C', cpp: 'C++', cs: 'C#', go: 'Go', php: 'PHP', rs: 'Rust', jsx: 'JavaScript', tsx: 'TypeScript', h: 'C', hpp: 'C++', cc: 'C++', cxx: 'C++', m: 'Objective-C'
  };
  return mapping[ext] || 'Plain Text';
};

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const language = mapExtensionToLanguage(req.file.originalname);
    const content = req.file.buffer.toString('utf8');
    const uploadedFile = await UploadedFile.create({
      user: req.user._id,
      originalName: req.file.originalname,
      language,
      size: req.file.size,
      content,
    });

    await ActivityLog.create({ user: req.user._id, action: 'upload_file', meta: { fileName: req.file.originalname, language } });
    res.status(201).json({ file: uploadedFile });
  } catch (error) {
    next(error);
  }
};

const getUploadedFiles = async (req, res, next) => {
  try {
    const files = await UploadedFile.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ files });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile, getUploadedFiles };
