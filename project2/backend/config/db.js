const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/novareviewai';
  if (process.env.NODE_ENV === 'test') {
    console.warn('Test environment detected. Skipping MongoDB connection.');
    return;
  }

  if (!uri) {
    console.warn('MONGO_URI is not configured. Running in fallback mode without database.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.warn('Proceeding without MongoDB. Login/register will use fallback mode.');
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

module.exports = connectDB;
