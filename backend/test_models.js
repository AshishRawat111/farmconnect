const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // NOTE: in older SDKs listModels was not present on the main instance, 
  // but we can fetch it via HTTP if needed. But in 0.24.1, maybe try catching errors.
  try {
    const fetch = require('node-fetch'); // we might not have node-fetch? axios is in package.json
  } catch (e) {}

}

async function testVarious() {
   const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro", "gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.0-pro-exp-02-05"];
   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
   
   for (let m of models) {
      try {
         const model = genAI.getGenerativeModel({ model: m });
         const result = await model.generateContent("hello");
         console.log(m, "SUCCESS", result.response.text());
         return;
      } catch(e) {
         console.log(m, "FAIL", e.message);
      }
   }
}
testVarious();
