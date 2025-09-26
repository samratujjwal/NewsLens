import React from 'react';

export default function HeroSection() {
    return (
        <div className="text-center text-white mb-5">
            <h1 className="display-4 display-md-3 fw-bold mb-3">
                Stay Ahead of the{' '}
                <span style={{
                    background: 'linear-gradient(45deg, #ffd700, #ffed4a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Trends
                </span>
            </h1>
            <p className="lead opacity-90 mb-4">
                Real-time AI analysis of breaking news with bias detection
            </p>
        </div>
    );
}