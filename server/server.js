// const dotenv = require('dotenv').config({ debug: true });
// const app = require('./App')
// const PORT = process.env.PORT || 4000;
// const db = require('./config/dbConfig');
// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });


// Import necessary modules
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core'); // This library needs to be installed: npm install ytdl-core express cors

// Initialize the Express application
const app = express();
const port = 5000; // Define the port for the server

// Middleware
// Enable CORS for all origins, allowing your React frontend to communicate with this backend.
// In a production environment, you should restrict this to your frontend's domain.
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// Define the API route for downloading YouTube videos
app.post('/api/download-youtube', async (req, res) => {
    /**
     * Handles POST requests to download YouTube videos.
     * Expects a JSON payload with a 'url' field containing the YouTube video URL.
     */
    const { url } = req.body;

    // Validate the incoming request
    if (!url) {
        console.error('Missing YouTube URL in request body.');
        return res.status(400).json({ error: 'Missing YouTube URL in request body.' });
    }

    console.log(`Received request to process URL: ${url}`);

    try {
        // Validate if the URL is a valid YouTube video URL
        if (!ytdl.validateURL(url)) {
            console.error(`Invalid YouTube URL: ${url}`);
            return res.status(400).json({ error: 'Invalid YouTube URL provided.' });
        }

        // Get video information without downloading
        const info = await ytdl.getBasicInfo(url);
        console.log( info)
        console.log(`Extracted info for: ${info.videoDetails.title}`);

        // Find a suitable format to provide a direct download URL.
        // This is a simplified approach. A robust solution would iterate through formats
        // and pick the most suitable one based on user preference (e.g., resolution, format).
        // We'll prioritize formats that include both video and audio (itag 18, 22 usually).
        // If not found, we'll look for the best overall format.
        let downloadUrl = null;
        let fileExtension = 'mp4'; // Default extension

        // Try to find a format that includes both video and audio (e.g., itag 18 for 360p MP4, 22 for 720p MP4)
        const bestCombinedFormat = info.formats.find(f =>
            f.hasVideo && f.hasAudio && f.container === 'mp4'
        );

        if (bestCombinedFormat) {
            downloadUrl = bestCombinedFormat.url;
            fileExtension = bestCombinedFormat.container || 'mp4';
        } else {
            // Fallback to the best available format if a combined one isn't readily found
            // ytdl-core's chooseFormat can pick the best based on options
            const format = ytdl.chooseFormat(info.formats, {
                quality: 'highest', // Try highest quality
                filter: (f) => f.hasVideo && f.hasAudio // Prefer formats with both video and audio
            });
            if (format && format.url) {
                downloadUrl = format.url;
                fileExtension = format.container || 'mp4';
            }
        }

        if (downloadUrl) {
            // Respond with the video information and the direct download URL
            res.status(200).json({
                message: 'Successfully retrieved video information.',
                title: info.videoDetails.title,
                thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url, // Get the largest thumbnail
                downloadUrl: downloadUrl,
                ext: fileExtension
            });
        } else {
            console.error('Could not find a direct downloadable URL for this video.');
            res.status(500).json({
                error: 'Could not find a direct downloadable URL for this video. It might be age-restricted, private, or require a different extraction method.'
            });
        }

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        if (error.message.includes('No video id found')) {
            return res.status(400).json({ error: 'Invalid YouTube URL or video not found.' });
        }
        res.status(500).json({ error: `An internal server error occurred: ${error.message}` });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Node.js backend listening at http://localhost:${port}`);
    console.log('To run this Node.js app:');
    console.log('1. Save it as, e.g., server.js');
    console.log('2. Open your terminal in the same directory');
    console.log('3. Run: npm init -y');
    console.log('4. Run: npm install express cors ytdl-core');
    console.log('5. Run: node server.js');
});