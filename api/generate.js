/**
 * 🌐 EMon AI Serverless API
 * 🔥 Powered by Google Gemini 2.5 Flash
 * 🧑‍💻 Developer: EMon Hawladar (EMon-BHai)
 * 🌎 Website: https://emonbhai.xyz
 * 📞 Contact: wa.me/+8801615298449
 * 🧰 GitHub: https://github.com/emonbhai
 * 🛠️ Hosting: Vercel
 *
 * Description:
 * This endpoint connects to the Google Generative Language API (Gemini)
 * and returns AI-generated responses for any text prompt.
 */

export default async function handler(req, res) {
  // ✅ Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      developer: "EMon-BHai",
      error: "Method Not Allowed! Please use POST method only.",
    });
  }

  // ✅ Extract prompt from request
  const { prompt } = req.body || {};
  const userPrompt =
    typeof prompt === "string" && prompt.trim().length
      ? prompt.trim()
      : "Explain how AI works in a few words";

  // ✅ Check API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    return res.status(500).json({
      developer: "EMon-BHai",
      error: "GEMINI_API_KEY is missing! Please set it in your environment.",
    });

  // ✅ Gemini API endpoint
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  // ✅ Payload
  const payload = {
    contents: [
      {
        parts: [{ text: userPrompt }],
      },
    ],
  };

  try {
    // 🔄 Send request to Google API
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({
        developer: "EMon-BHai",
        error: "Upstream API Error!",
        details: errText,
      });
    }

    const data = await r.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.text ??
      "No text response received.";

    // ✅ Success response
    return res.status(200).json({
      developer: "EMon-BHai",
      website: "https://emonbhai.xyz",
      contact: "wa.me/+8801615298449",
      model: "gemini-2.5-flash",
      prompt: userPrompt,
      response: text,
      status: true,
    });
  } catch (err) {
    // ❌ Error handler
    return res.status(500).json({
      developer: "EMon-BHai",
      error: "Request failed!",
      message: err?.message || String(err),
      status: false,
    });
  }
}
