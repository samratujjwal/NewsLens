import React from 'react';
import { Globe, TrendingUp } from 'lucide-react';
import { FILTER_OPTIONS } from '../../utils/constants';

export default function FilterTabs({ activeFilter, onFilterChange }) {
    return (
        <div className="mb-4">
            <div className="d-flex gap-2 overflow-auto pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {FILTER_OPTIONS.map((filterType) => (
                    <button
                        key={filterType}
                        className={`btn flex-shrink-0 ${activeFilter === filterType ? 'btn-light fw-bold' : 'btn-outline-light'
                            }`}
                        onClick={() => onFilterChange(filterType)}
                        style={{ borderRadius: '25px', textTransform: 'capitalize' }}
                    >
                        {filterType === 'all' && <Globe size={16} className="me-2" />}
                        {filterType === 'trending' && <TrendingUp size={16} className="me-2" />}
                        {filterType}
                    </button>
                ))}
            </div>
        </div>
    );
}