import React from 'react';
import { Eye, Heart } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatNumber } from '../../utils/formatters';

export default function EngagementMetrics({ engagement, readTime }) {
    return (
        <div className="d-flex align-items-center justify-content-between text-muted small mb-3">
            <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                    <Eye size={12} />
                    <span>{formatNumber(engagement.views)}</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <Heart size={12} />
                    <span>{formatNumber(engagement.likes)}</span>
                </div>
            </div>
            <Badge variant="light" className="text-dark">{readTime}</Badge>
        </div>
    );
}