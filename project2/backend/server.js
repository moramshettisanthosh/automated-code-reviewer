const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`NovaReviewAI backend running on port ${PORT}`);
});
