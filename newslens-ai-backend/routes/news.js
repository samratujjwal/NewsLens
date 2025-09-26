import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      category = "general",
      country = "in",
      pageSize = 12,
      page = 1,
    } = req.query;

    const validCategories = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];
    const validCountries = ["us", "gb", "ca", "au", "in"];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: "Invalid category",
        validCategories,
      });
    }

    if (!validCountries.includes(country)) {
      return res.status(400).json({
        error: "Invalid country code",
        validCountries,
      });
    }

    const newsResponse = await axios.get(
      "https://gnews.io/api/v4/top-headlines",
      {
        params: {
          token: process.env.NEWS_API_KEY,
          topic: category === "general" ? undefined : category,
          country,
          lang: "hi",
          max: Math.min(parseInt(pageSize) || 10, 100),
          page: parseInt(page) || 1,
        },
        timeout: 10000,
      }
    );

    const articles = newsResponse.data.articles
      .filter(
        (article) =>
          article.title &&
          article.title !== "[Removed]" &&
          article.description &&
          article.description !== "[Removed]"
      )
      .map((article, index) => ({
        id: index + 1,
        title: article.title,
        source: {
          name: article.source?.name || "Unknown Source",
        },
        description: article.description,
        urlToImage:
          article.image ||
          `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600`,
        publishedAt: article.publishedAt,
        url: article.url,
        content: article.content,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        trending: Math.random() > 0.7,
        hot: Math.random() > 0.8,
        breaking: Math.random() > 0.9,
        readTime: `${Math.floor(Math.random() * 5) + 2} min read`,
        engagement: {
          views: Math.floor(Math.random() * 50000) + 5000,
          likes: Math.floor(Math.random() * 2000) + 100,
          shares: Math.floor(Math.random() * 500) + 50,
          comments: Math.floor(Math.random() * 300) + 20,
        },
      }));

    res.json({
      articles,
      totalResults: newsResponse.data.totalResults,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      category,
      country,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "Please check your NEWS_API_KEY in environment variables",
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests to news API. Please try again later.",
      });
    }

    res.status(500).json({
      error: "Failed to fetch news",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q, language = "en", sortBy = "publishedAt" } = req.query;

    if (!q) {
      return res.status(400).json({
        error: "Missing search query",
        message: 'Please provide a search query parameter "q"',
      });
    }

    const newsResponse = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        token: process.env.NEWS_API_KEY,
        q,
        lang: language || "en",
        max: 20,
        page: 1,
      },
      timeout: 10000,
    });

    const articles = newsResponse.data.articles
      .filter(
        (article) =>
          article.title &&
          article.title !== "[Removed]" &&
          article.description &&
          article.description !== "[Removed]"
      )
      .map((article, index) => ({
        id: index + 1,
        title: article.title,
        source: { name: article.source?.name || "Unknown Source" },
        description: article.description,
        urlToImage:
          article.urlToImage ||
          `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600`,
        publishedAt: article.publishedAt,
        url: article.url,
        content: article.content,
        category: "Search Results",
        readTime: `${Math.floor(Math.random() * 5) + 2} min read`,
        engagement: {
          views: Math.floor(Math.random() * 50000) + 5000,
          likes: Math.floor(Math.random() * 2000) + 100,
          shares: Math.floor(Math.random() * 500) + 50,
          comments: Math.floor(Math.random() * 300) + 20,
        },
      }));

    res.json({
      articles,
      totalResults: newsResponse.data.totalResults,
      query: q,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search news",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

export default router;
