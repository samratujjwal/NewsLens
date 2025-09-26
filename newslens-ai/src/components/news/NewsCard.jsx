import React from 'react';
import { Globe, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import EngagementMetrics from './EngagementMetrics';
import { formatDate } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/constants';

export default function NewsCard({ article, onAnalyze, isAnalyzing }) {
    return (
        <Card className="h-100 trending-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>

            <div className="position-relative">
                <img
                    src={article.urlToImage}
                    className="card-img-top"
                    alt="Article thumbnail"
                    style={{ height: '180px', objectFit: 'cover' }}
                />

                <div className="position-absolute top-0 start-0 p-3">
                    {article.breaking && (
                        <Badge variant="danger" className="mb-2 d-block">⚡ BREAKING</Badge>
                    )}
                    {article.hot && (
                        <Badge variant="warning" className="text-dark mb-2 d-block">🔥 HOT</Badge>
                    )}
                    {article.trending && (
                        <Badge variant="success" className="mb-2 d-block">📈 TRENDING</Badge>
                    )}
                </div>

                <div className="position-absolute top-0 end-0 p-3">
                    <Badge variant={getCategoryColor(article.category)}>
                        {article.category}
                    </Badge>
                </div>
            </div>

            <div className="card-body p-4 d-flex flex-column">

                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-1">
                            <Globe size={12} className="text-primary" />
                        </div>
                        <small className="fw-medium text-primary">{article.source.name}</small>
                    </div>
                    <small className="text-muted">{formatDate(article.publishedAt)}</small>
                </div>


                <h5 className="card-title lh-base mb-3" style={{ fontSize: '1.1rem' }}>
                    {article.title}
                </h5>
                <p className="card-text text-muted small flex-grow-1 mb-3">
                    {article.description}
                </p>


                <EngagementMetrics engagement={article.engagement} readTime={article.readTime} />

                <div className="d-flex flex-column gap-2 mt-3">

                    {article.url && (
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-secondary w-100"
                            style={{ borderRadius: '25px', textDecoration: 'none' }}
                        >
                            Read Full Article
                        </a>
                    )}

                    <Button
                        variant={isAnalyzing ? 'secondary' : 'primary'}
                        className="d-flex align-items-center justify-content-center gap-2 w-100"
                        onClick={onAnalyze}
                        disabled={isAnalyzing}
                        style={{ borderRadius: '25px' }}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Zap size={16} />
                                <span>Analyze Now</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
}