import express from "express";
import { generateSummary, analyzeBias } from "../utils/ai.js";
import { validateAnalyzeInput } from "../middleware/validation.js";

const router = express.Router();

router.post("/", validateAnalyzeInput, async (req, res) => {
  try {
    const { text, title } = req.body;
    req.startTime = req.startTime || Date.now();

    const [summaryResult, biasResult] = await Promise.allSettled([
      generateSummary(text, title),
      analyzeBias(text, title),
    ]);

    let summary;
    if (summaryResult.status === "fulfilled") {
      summary = summaryResult.value;
    } else {
      summary =
        "• Unable to generate summary at this time\n• Please try again later\n• The article content may be too short or unavailable";
    }

    let bias;
    if (biasResult.status === "fulfilled") {
      bias = biasResult.value;
    } else {
      bias = {
        sentiment: "neutral",
        bias: "neutral",
        confidence: 0.0,
        error: "Unable to analyze bias at this time",
        TrustScore: 0,
      };
    }

    const response = {
      summary,
      bias,
      metadata: {
        processedAt: new Date().toISOString(),
        textLength: text?.length || 0,
        processingTime: Date.now() - req.startTime,
        model: "llama-3.1-8b-instant",
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Analysis failed",
      message: "Unable to analyze the article content",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

router.post("/batch", async (req, res) => {
  try {
    const { articles } = req.body;

    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({
        error: "Invalid input",
        message: "Please provide an array of articles to analyze",
      });
    }

    if (articles.length > 5) {
      return res.status(400).json({
        error: "Too many articles",
        message: "Maximum 5 articles can be analyzed at once",
      });
    }

    const analysisPromises = articles.map(async (article, index) => {
      try {
        const [summary, bias] = await Promise.all([
          generateSummary(article.text || article.content, article.title),
          analyzeBias(article.text || article.content, article.title),
        ]);

        return {
          index,
          id: article.id,
          summary,
          bias,
          status: "success",
        };
      } catch (error) {
        return {
          index,
          id: article.id,
          error: error.message,
          status: "failed",
        };
      }
    });

    const results = await Promise.all(analysisPromises);

    res.json({
      results,
      processedAt: new Date().toISOString(),
      total: articles.length,
      successful: results.filter((r) => r.status === "success").length,
      failed: results.filter((r) => r.status === "failed").length,
    });
  } catch (error) {
    res.status(500).json({
      error: "Batch analysis failed",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

export default router;
