import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const openaiClient = axios.create({
  baseURL: OPENAI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

/**
 * Generate article summary using Groq
 */
export async function generateSummary(text, title = "") {
  try {
    if (!text || text.trim().length < 50) {
      throw new Error("Article content too short for meaningful summary");
    }

    const truncatedText = text.substring(0, 4000);

    const response = await openaiClient.post("", {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are an expert news summarizer. Create a concise, factual summary in exactly 4 bullet points. 
          Each bullet should be:
          - One clear, complete sentence
          - Focus on key facts and developments
          - Avoid speculation or opinion
          - Use objective, neutral language
          
          Format: Start each point with "• " followed by the summary point.`,
        },
        {
          role: "user",
          content: `Title: ${title}\n\nArticle: ${truncatedText}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const summary = response.data.choices[0]?.message?.content?.trim();

    if (!summary) {
      throw new Error("Empty response from AI model");
    }

    return summary;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Invalid OpenAI API key");
    }

    if (error.response?.status === 429) {
      throw new Error("OpenAI API rate limit exceeded");
    }

    if (error.response?.data?.error) {
      throw new Error(`OpenAI API error: ${error.response.data.error.message}`);
    }

    throw error;
  }
}

export async function analyzeBias(text, title = "") {
  try {
    if (!text || text.trim().length < 50) {
      throw new Error("Article content too short for meaningful bias analysis");
    }

    const truncatedText = text.substring(0, 4000);

    const response = await openaiClient.post("", {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are an expert media bias analyzer. Analyze the given news article and return ONLY a valid JSON object with this exact structure:

{
  "sentiment": "positive" | "negative" | "neutral",
  "bias": "left" | "right" | "neutral", 
  "confidence": 0.85,
  "reasoning": "Brief explanation of the analysis"
  "trustscore":8.7,
}

Guidelines:
- sentiment: Overall emotional tone of the article
- bias: Political,technogical,Educationa like many more lean based on language, framing, and source selection
- confidence: Float between 0.0-1.0 indicating certainty of analysis
- reasoning: 1-2 sentences explaining the assessment
- trustscore:float between 1-10 based on article factualness

Return ONLY the JSON object, no other text.`,
        },
        {
          role: "user",
          content: `Title: ${title}\n\nArticle: ${truncatedText}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    const responseText = response.data.choices[0]?.message?.content?.trim();

    if (!responseText) {
      throw new Error("Empty response from AI model");
    }

    let biasAnalysis;
    try {
      biasAnalysis = JSON.parse(responseText);
    } catch (parseError) {
      return {
        sentiment: "neutral",
        bias: "neutral",
        confidence: 0.5,
        reasoning: "Unable to parse AI response, defaulting to neutral",
        TrustScore: 1,
      };
    }

    const requiredFields = ["sentiment", "bias", "confidence"];
    for (const field of requiredFields) {
      if (!(field in biasAnalysis)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const validSentiments = ["positive", "negative", "neutral"];
    const validBias = ["left", "right", "neutral"];

    if (!validSentiments.includes(biasAnalysis.sentiment)) {
      biasAnalysis.sentiment = "neutral";
    }

    if (!validBias.includes(biasAnalysis.bias)) {
      biasAnalysis.bias = "neutral";
    }

    if (
      typeof biasAnalysis.confidence !== "number" ||
      biasAnalysis.confidence < 0 ||
      biasAnalysis.confidence > 1
    ) {
      biasAnalysis.confidence = 0.5;
    }

    return biasAnalysis;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Invalid OpenAI API key");
    }

    if (error.response?.status === 429) {
      throw new Error("OpenAI API rate limit exceeded");
    }

    throw error;
  }
}
