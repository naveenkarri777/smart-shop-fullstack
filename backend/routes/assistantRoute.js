import express from "express";
import OpenAI from "openai";
import 'dotenv/config';

const router = express.Router();

// Initialize OpenAI client for OpenRouter
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

router.post("/ask", async (req, res) => {
  try {
    const { question, description } = req.body;

    // Send request to OpenRouter
    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-20b:free",  // ✅ Free model
      messages: [
        {
          role: "system",
          content: "You are a helpful shopping assistant. Answer based on the product details.default language is english.",
        },
        {
          role: "user",
          content: `Product: ${description}\nQuestion: ${question}`,
        },
      ],
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error("Assistant error:", err.response?.data || err.message);
    res.status(500).json({ error: "Assistant failed" });
  }
});

export default router;

