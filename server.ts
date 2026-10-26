import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure generated assets directory exists in public
const generatedDir = path.join(__dirname, 'public', 'assets', 'generated');
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

// Initialize Gemini client server-side with required headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Check which articles have custom generated images
app.get('/api/generated-images', (_req, res) => {
  try {
    if (!fs.existsSync(generatedDir)) {
      return res.json({ images: {} });
    }
    const files = fs.readdirSync(generatedDir);
    const images: Record<string, string> = {};
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const articleId = path.parse(file).name;
        images[articleId] = `/assets/generated/${file}`;
      }
    }
    res.json({ images });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to list images' });
  }
});

// Endpoint: Generate an image using Gemini
app.post('/api/generate-infographic', async (req, res) => {
  const { articleId, prompt } = req.body;

  if (!articleId || !prompt) {
    return res.status(400).json({ error: 'articleId and prompt are required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is missing on the server environment.',
      needsPaidKey: false,
    });
  }

  try {
    // Attempt image generation with gemini-3.1-flash-lite-image or gemini-nano-banana-2.1
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          {
            text: `${prompt}\n\nHigh-tech, futuristic 16:9 infographic in a dark cyber aesthetic matching modern esports visual style. Crisp technical HUD graphics.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: '16:9',
        },
      },
    });

    let base64Data: string | null = null;
    let mimeType = 'image/png';

    const candidates = response.candidates || [];
    if (candidates[0]?.content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Data = part.inlineData.data;
          mimeType = part.inlineData.mimeType || 'image/png';
          break;
        }
      }
    }

    if (!base64Data) {
      return res.status(502).json({
        error: 'Model did not return image data in the response parts.',
        raw: response.text || '',
      });
    }

    // Save image to public/assets/generated/
    const ext = mimeType.includes('jpeg') || mimeType.includes('jpg') ? '.jpg' : '.png';
    const filename = `${articleId}${ext}`;
    const filePath = path.join(generatedDir, filename);

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/assets/generated/${filename}`;
    return res.json({
      success: true,
      articleId,
      imageAsset: publicUrl,
    });
  } catch (err: any) {
    const message = err.message || String(err);
    const isQuota = message.includes('quota') || message.includes('RESOURCE_EXHAUSTED') || message.includes('429');

    return res.status(isQuota ? 429 : 500).json({
      error: message,
      needsPaidKey: isQuota,
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  // Serve public static assets (favicons, images)
  app.use(express.static(path.join(__dirname, 'public')));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[gamevaulte] Server running on port ${PORT}`);
  });
}

startServer();
