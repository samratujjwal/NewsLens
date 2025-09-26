import React from 'react';

export default function Badge({
    children,
    variant = 'secondary',
    className = '',
    ...props
}) {
    return (
        <span
            className={`badge bg-${variant} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}