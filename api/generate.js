// 🚀 EMon-BHai Gemini 2.5 Flash API
// 🌐 Website: https://emonbhai.xyz
// 📞 Contact: +88016XXXXXXX
// 💻 Developer: EMon Hawladar

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    // ✅ Allow both GET and POST
    let prompt;

    if (req.method === "GET") {
      prompt = req.query.prompt;
    } else if (req.method === "POST") {
      prompt = req.body?.prompt;
    } else {
      return res.status(405).json({
        developer: "EMon-BHai",
        error: "Method Not Allowed! Please use GET or POST method.",
      });
    }

    if (!prompt) {
      return res.status(400).json({
        developer: "EMon-BHai",
        error: "Please provide a prompt either in query or body.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        developer: "EMon-BHai",
        error: "Missing GEMINI_API_KEY in environment.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.status(200).json({
      developer: "EMon-BHai",
      website: "https://emonbhai.xyz",
      prompt,
      reply: response.text(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      developer: "EMon-BHai",
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
