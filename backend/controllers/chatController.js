const { GoogleGenerativeAI } = require("@google/generative-ai");

const chatController = {
  handleChat: async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ success: false, message: "Message is required" });
      }

      // Check if GEMINI_API_KEY is available
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
        console.log("No GEMINI_API_KEY found. Utilizing Mock AI Response.");
        
        // Slight artificial delay to simulate AI thinking
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const lowerMsg = message.toLowerCase();
        let mockReply = "I am a mock Agricultural Assistant! (Please add a GEMINI_API_KEY to your .env). ";
        
        if (lowerMsg.includes("soil") || lowerMsg.includes("mitti")) {
            mockReply += "For healthy soil, consider crop rotation and regular soil testing to maintain nutrient balance.";
        } else if (lowerMsg.includes("weather") || lowerMsg.includes("mausam")) {
            mockReply += "Always track the upcoming rain forecasts using the dashboard weather feature before sowing.";
        } else if (lowerMsg.includes("pest") || lowerMsg.includes("kide")) {
            mockReply += "To handle pests, you can use Neem oil or consult local agricultural experts for safe pesticide use.";
        } else {
            mockReply += `You asked: "${message}". As an expert AI, I would normally provide detailed agricultural advice here!`;
        }

        return res.status(200).json({
          success: true,
          reply: mockReply,
        });
      }

      // Initialize the Gemini model if key exists
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `You are an expert Agricultural AI Assistant for "Farm-Connect". 
Your role is to help farmers with their queries regarding soil, pests, crop cycles, weather forecasting impacts, and general agriculture.
You MUST strictly adhere to the following rules:
1. ONLY answer questions related to agriculture, farming, crops, livestock, pests, soil, weather, and mandi prices.
2. If the user asks about ANYTHING ELSE (like coding, math, history, general knowledge, movies, etc.), you must politely decline and state that you are an agricultural assistant. example: "I am an Agricultural Assistant. I can only answer questions related to farming."
3. Keep your answers concise, practical, and highly informative for a farmer.`;

      // Format history
      const formattedHistory = history && history.length > 0 
        ? history.map(h => `${h.role === 'user' ? 'Farmer' : 'Agricultural Assistant'}: ${h.content}`).join("\n") 
        : "No previous history.";

      const prompt = `${systemPrompt}\n\nHere is the conversation history:\n${formattedHistory}\n\nFarmer: ${message}\nAgricultural Assistant:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return res.status(200).json({
        success: true,
        reply: text,
      });
    } catch (error) {
      console.error("AI Agent Error (Falling back to Mock):", error.message);
      return res.status(200).json({
        success: true,
        reply: `Oops! It looks like my Google API key has exceeded its quota or is invalid. Please check the GEMINI_API_KEY in your .env file! \n(Error details: ${error.message.substring(0, 50)}...)`
      });
    }
  },
};

module.exports = chatController;
