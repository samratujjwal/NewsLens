import React from 'react';
import { TrendingUp, Globe } from 'lucide-react';

export default function Header() {
    return (
        <div className="sticky-top bg-white shadow-sm">
            <div className="container-fluid">
                <div className="row align-items-center py-3">
                    <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <div className="bg-primary rounded-3 p-2">
                                    <TrendingUp size={24} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="h4 mb-0 fw-bold text-primary">NewsLens</h1>
                                    <small className="text-muted d-none d-sm-inline">AI-Powered Analysis</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3 mt-md-0">
                        <div className="d-flex justify-content-md-end">
                            <div className="d-flex align-items-center gap-2 text-primary">
                                <Globe size={18} />
                                <span className="fw-medium d-none d-sm-inline">Live • Unbiased • Instant</span>
                                <span className="fw-medium d-sm-none">Live</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}