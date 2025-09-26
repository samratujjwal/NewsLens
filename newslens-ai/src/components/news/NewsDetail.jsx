import React from 'react';
import { ArrowLeft, BookOpen, Share2, Bookmark, Eye, Heart, MessageCircle, Clock } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AnalysisPanel from '../analysis/AnalysisPanel';
import { formatDate, formatNumber } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/constants';

export default function NewsDetail({ article, onBack }) {
    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)' }}>

            <div className="sticky-top bg-white shadow-sm border-bottom">
                <div className="container-fluid py-3">
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={onBack}
                            className="d-flex align-items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            <span className="d-none d-sm-inline">Back</span>
                        </Button>
                        <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2">
                                <BookOpen size={20} className="text-primary" />
                                <span className="fw-bold text-primary d-none d-md-inline">Analysis</span>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <Button variant="outline-secondary" size="sm">
                                <Share2 size={16} />
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                                <Bookmark size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-3 px-md-4 py-4">

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="mb-4">
                            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                <Badge variant={getCategoryColor(article.category)} className="fs-6">
                                    {article.category}
                                </Badge>
                                {article.trending && <Badge variant="danger">🔥 Trending</Badge>}
                                {article.breaking && <Badge variant="warning" className="text-dark">⚡ Breaking</Badge>}
                                <span className="text-muted small">{article.source.name}</span>
                                <span className="text-muted small">•</span>
                                <span className="text-muted small">{formatDate(article.publishedAt)}</span>
                            </div>

                            <h1 className="display-6 fw-bold mb-3">{article.title}</h1>


                            <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mb-4">
                                <div className="d-flex align-items-center gap-1">
                                    <Eye size={14} />
                                    {formatNumber(article.engagement.views)}
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <Heart size={14} />
                                    {formatNumber(article.engagement.likes)}
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <Share2 size={14} />
                                    {formatNumber(article.engagement.shares)}
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <MessageCircle size={14} />
                                    {formatNumber(article.engagement.comments)}
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <Clock size={14} />
                                    {article.readTime}
                                </div>
                            </div>
                        </div>


                        {article.urlToImage && (
                            <div className="mb-4">
                                <img
                                    src={article.urlToImage}
                                    className="img-fluid rounded-4 w-100 shadow"
                                    alt="Article"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                            </div>
                        )}


                        <AnalysisPanel
                            summary={article.summary}
                            bias={article.bias}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}