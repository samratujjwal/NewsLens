import React from 'react';
import { Activity, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import TrustScore from './TrustScore';
import { getBiasColor } from '../../utils/constants';

export default function BiasAnalysis({ bias }) {
    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'positive': return <CheckCircle size={16} className="text-success" />;
            case 'negative': return <AlertCircle size={16} className="text-danger" />;
            default: return <Eye size={16} className="text-secondary" />;
        }
    };

    return (
        <Card className="h-100" style={{ borderRadius: '1rem' }}>
            <div className="card-header bg-info text-white d-flex align-items-center gap-2"
                style={{ borderRadius: '1rem 1rem 0 0' }}>
                <Activity size={20} />
                <strong>Bias Analysis</strong>
                <Badge variant="light" className="text-info ms-auto">AI</Badge>
            </div>
            <div className="card-body p-4">

                <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="fw-semibold">Trust Ratio</span>
                        <Badge
                            variant={getBiasColor(bias.bias)}
                            className="fs-6 text-capitalize"
                        >
                            {bias.bias}
                        </Badge>
                    </div>
                    <div className="progress mb-2" style={{ height: '12px', borderRadius: '6px' }}>
                        <div
                            className={`progress-bar bg-${getBiasColor(bias.bias)}`}
                            style={{ width: `${bias.confidence * 100}%`, borderRadius: '6px' }}
                        ></div>
                    </div>
                    <small className="text-muted">
                        Confidence: {Math.round(bias.confidence * 100)}%
                    </small>
                </div>


                <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-semibold">Sentiment</span>
                        <div className="d-flex align-items-center gap-2">
                            {getSentimentIcon(bias.sentiment)}
                            <span className="text-capitalize fw-medium">{bias.sentiment}</span>
                        </div>
                    </div>
                </div>


                <TrustScore score={bias.trustscore} />
            </div>
        </Card>
    );
}