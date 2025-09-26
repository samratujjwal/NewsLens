import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useNewsData = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const loadArticles = async (pageToLoad = 1) => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(
                `${API_URL}/news?category=general&country=in&page=${pageToLoad}&pageSize=10`

            );

            if (pageToLoad === 1) {
                setArticles(res.data.articles);
            } else {
                setArticles(prev => [...prev, ...res.data.articles]);
            }

            setHasMore(res.data.articles.length > 0);
        } catch (err) {
            console.error("❌ News fetch error:", err.message);
            setError('Failed to load articles. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadArticles(1);
        setPage(1);
    }, []);


    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                loadArticles(nextPage);
                return nextPage;
            });
        }
    };

    return { articles, loading, error, loadMore, hasMore };
};
