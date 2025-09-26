import axios from "axios";

const API = axios.create({
  baseURL:
    "https://news-lens-j5klwp644-samratujjwals-projects.vercel.app/" ||
    "http://localhost:5000/api",
  withCredentials: true,
});

export const fetchNews = (category = "general", country = "in") =>
  API.get(`/news`, { params: { category, country } });

export const searchNews = (query) =>
  API.get(`/news/search`, { params: { q: query } });

export const analyzeArticle = (article) => API.post(`/analyze`, article);

export const batchAnalyze = (articles) =>
  API.post(`/analyze/batch`, { articles });
