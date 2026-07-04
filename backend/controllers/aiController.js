const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.askAgriAI = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: "API Key missing in .env" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an expert Agricultural Scientist for the FarmConnect app. 
    A farmer is asking: "${question}". 
    Provide a professional, helpful answer in simple English. Keep it concise.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ success: true, answer: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ success: false, message: "AI Agent is temporarily offline." });
  }
};