import React from 'react';

export default function Card({ children, className = '', style, ...props }) {
    return (
        <div
            className={`card border-0 shadow-sm ${className}`}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}