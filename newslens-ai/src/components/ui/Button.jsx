import React from 'react';

export default function Button({
    children,
    variant = 'primary',
    size = '',
    className = '',
    disabled = false,
    onClick,
    style,
    ...props
}) {
    const sizeClass = size ? `btn-${size}` : '';
    const buttonClass = `btn btn-${variant} ${sizeClass} ${className}`.trim();

    return (
        <button
            className={buttonClass}
            disabled={disabled}
            onClick={onClick}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
