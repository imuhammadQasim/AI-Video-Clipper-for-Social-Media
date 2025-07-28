const fs = require('fs');
const path = require('path');
const ytDlp = require('yt-dlp-exec');

exports.downloadVideo = async (req, res) => {
  const url = req.query.url;
  const outputPath = path.join(__dirname, '../downloads/video.mp4');
  const partialPath = outputPath + '.part';

  try {
    // 🧹 Delete partial file if exists
    if (fs.existsSync(partialPath)) {
      fs.unlinkSync(partialPath);
      console.log('❌ Deleted existing .part file');
    }

    // 🎯 Run yt-dlp
    await ytDlp(url, {
      output: outputPath,
      format: 'mp4',
      noPart: true,
    });

    res.status(200).send({ message: '✅ Video downloaded successfully' });
  } catch (error) {
    console.error('❌ Download error:', error.stderr || error.message);
    res.status(500).send({ error: 'Download failed: ' + error.stderr || error.message });
  }
};
