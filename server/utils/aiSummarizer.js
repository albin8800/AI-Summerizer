import "dotenv/config";
import fetch from "node-fetch";

const generateSummary = async (text, tone) => {
  try {
    const prompt = `
      Summarize the following text in a ${tone} tone:
      -----
      ${text}
      -----
      Output ONLY the summary.
    `;

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      throw new Error(data.error.message);
    }

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated"
    );

  } catch (err) {
    throw err;
  }
};

export default generateSummary;
