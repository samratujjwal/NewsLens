import { useState, useMemo } from 'react';

export const useFilters = (articles) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredArticles = useMemo(() => {
        if (activeFilter === 'all') return articles;
        if (activeFilter === 'trending') return articles.filter(a => a.trending);
        return articles.filter(a => a.category.toLowerCase() === activeFilter.toLowerCase());
    }, [articles, activeFilter]);

    return {
        activeFilter,
        setActiveFilter,
        filteredArticles
    };
};