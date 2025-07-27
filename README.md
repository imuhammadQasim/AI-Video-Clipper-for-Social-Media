# 🎬 AI Video Clipper for Social Media

An AI-powered tool that automatically extracts the best highlights from long-form YouTube videos and converts them into short-form vertical videos optimized for platforms like Instagram Reels, YouTube Shorts, TikTok, LinkedIn, and more.

> 🔗 Input a YouTube URL → 🎥 AI analyzes content → ✂️ Generates viral short clips → 📲 Ready to post!

---

## 🚀 Features

- 🎯 **Highlight Detection** — Detects engaging moments using AI-driven analysis (based on transcript, speech tone, and pacing).
- 🗣️ **Auto Transcription** — Transcribes video speech using ASR (Automatic Speech Recognition).
- 📏 **Smart Clipping** — Cuts shorts based on scene changes, speech cues, and key moments.
- 🔄 **Multi-Platform Output** — Generates vertical videos tailored for:
  - Instagram Reels
  - YouTube Shorts
  - TikTok
  - Facebook Stories
  - LinkedIn Posts
- 🧠 **AI-Powered Summaries** — Generates captions, descriptions, and hashtags for each clip.
- 🛠️ **Web UI** — User inputs YouTube link, clicks "Generate", and gets downloadable clips.

---

## 🧩 Tech Stack

| Layer        | Tech Used |
|--------------|-----------|
| **Frontend** | React, TailwindCSS, TypeScript |
| **Backend**  | Node.js, Express |
| **AI/ML**    | OpenAI Whisper (transcription), GPT-4 (highlight detection & summarization), FFmpeg (video editing), Python |
| **Storage**  | Local / AWS S3 (configurable) |
| **Others**   | YouTube API, Puppeteer (optional for thumbnail/caption scraping) |

---

## 🛠️ How It Works

1. **User Input**  
   Paste a long-form YouTube video URL.

2. **Transcription (ASR)**  
   The video is transcribed using `Whisper` or any ASR model.

3. **Highlight Extraction**  
   GPT analyzes transcript to identify engaging segments.

4. **Video Clipping**  
   Using FFmpeg, clips are cut based on timestamps and resized to vertical format.

5. **Content Output**  
   Output includes:
   - Ready-to-post vertical video clips
   - Auto-generated captions
   - Recommended titles/hashtags
