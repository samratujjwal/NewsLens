import React from 'react';

export default function LoadingScreen() {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
            <div className="min-vh-100 d-flex align-items-center justify-content-center"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="text-center text-white">
                    <div className="d-flex justify-content-center mb-4">
                        <div className="spinner-grow spinner-grow-sm" style={{ animationDelay: '0.1s' }}></div>
                        <div className="spinner-grow spinner-grow-sm" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}