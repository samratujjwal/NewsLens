import React from 'react';
import HeroSection from '../common/HeroSection';
import FilterTabs from './FilterTabs';
import NewsCard from './NewsCard';
import ErrorAlert from '../ui/ErrorAlert';
import Button from '../ui/Button';

export default function NewsGrid({
    articles,
    onAnalyze,
    analyzing,
    error,
    filter,
    onFilterChange,
    loadMore,
    hashMore,
    loading
}) {
    return (
        <div className="container-fluid px-3 px-md-4 py-4">
            <HeroSection />

            <FilterTabs
                activeFilter={filter}
                onFilterChange={onFilterChange}
            />

            {error && <ErrorAlert message={error} />}


            <div className="row g-3 g-md-4">
                {articles.map((article, index) => (
                    <div key={article.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                        <NewsCard
                            article={article}
                            onAnalyze={() => onAnalyze(article, index)}
                            isAnalyzing={analyzing === index}
                        />
                    </div>
                ))}
            </div>


            <div className="text-center mt-5">
                <Button
                    type="button"
                    onClick={loadMore}
                    variant="outline-light"
                    size="lg"
                    style={{ borderRadius: '25px' }}
                >
                    Load More Stories
                </Button>
            </div>
        </div>
    );
}