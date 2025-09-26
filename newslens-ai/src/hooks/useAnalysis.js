import { useState } from 'react';
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const useAnalysis = () => {
    const [analyzing, setAnalyzing] = useState(null);
    const [error, setError] = useState(null);

    const analyze = async (article, index) => {
        setAnalyzing(index);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2500));

            //const mockSummary = "• Key breakthrough with significant industry implications\n• Expert analysis shows transformative potential\n• Implementation timeline spans next 12-18 months\n• Expected benefits include 40% efficiency improvements";

            const res = await axios.post(`${API_URL}/analyze`, {
                text: article.content || article.text || article.title,   // send content
                title: article.title
            });
            // const mockBias = {
            //     sentiment: Math.random() > 0.5 ? "positive" : Math.random() > 0.5 ? "negative" : "neutral",
            //     bias: Math.random() > 0.6 ? "neutral" : Math.random() > 0.5 ? "left" : "right",
            //     confidence: 0.75 + Math.random() * 0.2
            // };

            return {
                summary: res.data.summary,
                bias: res.data.bias,
                metadata: res.data.metadata
            };
        } catch (error) {
            setError('Failed to analyze article. Please try again.');
            throw error;
        } finally {
            setAnalyzing(null);
        }
    };

    return { analyze, analyzing, error };
};
