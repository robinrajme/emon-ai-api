// 🚀 EMon-BHai Gemini 2.5 Flash API
// 🌐 Website: https://emonbhai.xyz
// 📞 Contact: +88016XXXXXXX
// 💻 Developer: EMon Hawladar

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    // Handle GET or POST
    let prompt =
      req.method === "GET"
        ? req.query.prompt
        : req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({
        developer: "EMon-BHai",
        error: "❌ Please provide a prompt in query or JSON body.",
      });
    }

    // Check API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        developer: "EMon-BHai",
        error: "❌ Missing GEMINI_API_KEY in environment.",
      });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate response
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || "No output";

    return res.status(200).json({
      developer: "EMon-BHai",
      website: "https://emonbhai.xyz",
      prompt,
      reply: text,
    });
  } catch (err) {
    console.error("❌ Function Error:", err);
    return res.status(500).json({
      developer: "EMon-BHai",
      error: "Internal Server Error",
      message: err.message,
    });
  }
}
