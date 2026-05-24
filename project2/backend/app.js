const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const fileRoutes = require('./routes/fileRoutes');
const githubRoutes = require('./routes/githubRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('tiny'));
app.use(rateLimiter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'NovaReviewAI API' }));

app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});
app.use(errorHandler);

module.exports = app;
