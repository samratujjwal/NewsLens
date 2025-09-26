export const getCategoryColor = (category) => {
    const colors = {
        Technology: 'info',
        Politics: 'danger',
        Science: 'success',
        Business: 'warning',
        Sports: 'primary'
    };
    return colors[category] || 'secondary';
};

export const getBiasColor = (bias) => {
    switch (bias) {
        case 'left': return 'primary';
        case 'right': return 'danger';
        default: return 'success';
    }
};

export const FILTER_OPTIONS = [
    'all', 'trending', 'technology', 'politics', 'science', 'business'
];