const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const youtubeRoute = require('./routes/youtubeRoutes');
const authRouter = require('./controllers/authController')

app.use('/api/auth', authRouter)
app.use('/api/youtube', youtubeRoute);

app.get('/', (req, res) => {
  res.send('🎬 AI Video Clipper Backend Running');
});

module.exports = app;