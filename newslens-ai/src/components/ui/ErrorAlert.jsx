import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorAlert({ message }) {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return (
        <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
            <AlertCircle size={20} className="me-2" />
            {message}
            <button
                type="button"
                className="btn-close"
                onClick={() => setShow(false)}
            ></button>
        </div>
    );
}