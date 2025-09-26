import React from 'react';
import SummaryCard from './SummaryCard';
import BiasAnalysis from './BiasAnalysis';

export default function AnalysisPanel({ summary, bias }) {
    console.log(summary);
    console.log(bias);
    return (
        <div className="row g-3 g-md-4">
            <div className="col-12 col-md-6">
                <SummaryCard summary={summary} />
            </div>
            <div className="col-12 col-md-6">
                <BiasAnalysis bias={bias} />
            </div>
        </div>
    );
}