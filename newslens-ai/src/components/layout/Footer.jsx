import React from 'react';
import { TrendingUp } from 'lucide-react';
import Badge from '../ui/Badge';

export default function Footer() {
    return (
        <footer className="bg-dark bg-opacity-75 text-white py-4 mt-5">
            <div className="container-fluid text-center">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <TrendingUp size={20} />
                        <span>&copy; 2024 NewsLens. Powered by AI.</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Badge variant="success">Live</Badge>
                        <span className="small">Updated every 5 minutes</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}