// routes/youtubeRoutes.js
const express = require('express');
const router = express.Router();
const { downloadVideo } = require('../controllers/youtubeController');

router.get('/download', downloadVideo);

module.exports = router;
