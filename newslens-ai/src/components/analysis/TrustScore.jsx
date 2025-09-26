import React from 'react';
import { Award } from 'lucide-react';

export default function TrustScore({ score }) {
    return (
        <div className="bg-light rounded-3 p-3 text-center">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                <Award size={18} className="text-warning" />
                <span className="fw-bold">Trust Score</span>
            </div>
            <div className="h4 text-warning mb-0">{score}/10</div>
            <small className="text-muted">Based on source reliability</small>
        </div>
    );
}