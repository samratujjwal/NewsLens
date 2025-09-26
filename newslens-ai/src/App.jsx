import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';
import NewsGrid from './components/news/NewsGrid';
import NewsDetail from './components/news/NewsDetail';
import { useNewsData } from './hooks/useNewsData';
import { useAnalysis } from './hooks/useAnalysis';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filter, setFilter] = useState('all');

  const { articles, loading, error, loadMore, hasMore } = useNewsData();
  const { analyze, analyzing, analysisError } = useAnalysis();

  const handleArticleSelect = async (article, index) => {
    const analysisResult = await analyze(article, index);
    setSelectedArticle({
      ...article,
      ...analysisResult
    });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const filteredArticles = filter === 'all' ? articles :
    filter === 'trending' ? articles.filter(a => a.trending) :
      articles.filter(a => a.category.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      {selectedArticle ? (
        <NewsDetail
          article={selectedArticle}
          onBack={handleBackToList}
        />
      ) : (
        <NewsGrid
          articles={filteredArticles}
          onAnalyze={handleArticleSelect}
          analyzing={analyzing}
          error={error || analysisError}
          filter={filter}
          onFilterChange={setFilter}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      )}
    </Layout>
  );
}

