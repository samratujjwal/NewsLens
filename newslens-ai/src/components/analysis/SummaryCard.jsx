import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function SummaryCard({ summary }) {
    return (
        <Card className="h-100" style={{ borderRadius: '1rem' }}>
            <div className="card-header bg-success text-white d-flex align-items-center gap-2"
                style={{ borderRadius: '1rem 1rem 0 0' }}>
                <BookOpen size={20} />
                <strong>AI Summary</strong>
                <Badge variant="light" className="text-success ms-auto">GPT-4</Badge>
            </div>
            <div className="card-body p-4">
                <div className="summary-content">
                    {summary.split('\n').map((point, index) => (
                        <div key={index} className="d-flex align-items-start gap-3 mb-3">
                            <div className="bg-success bg-opacity-10 rounded-circle p-2 flex-shrink-0">
                                <CheckCircle size={16} className="text-success" />
                            </div>
                            <span className="lh-base">{point.replace('•', '').trim()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}