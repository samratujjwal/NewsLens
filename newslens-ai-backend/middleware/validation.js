export function validateAnalyzeInput(req, res, next) {
    const { text, title } = req.body;

    if (!text) {
        return res.status(400).json({
            error: 'Missing required field',
            message: 'Article text is required for analysis'
        });
    }

    if (typeof text !== 'string' || text.trim().length < 10) {
        return res.status(400).json({
            error: 'Invalid text content',
            message: 'Article text must be at least 10 characters long'
        });
    }

    if (text.length > 10000000) {
        return res.status(400).json({
            error: 'Text too long',
            message: 'Article text exceeds maximum allowed length'
        });
    }

    if (title && (typeof title !== 'string' || title.length > 500)) {
        return res.status(400).json({
            error: 'Invalid title',
            message: 'Title must be a string with maximum 500 characters'
        });
    }

    next();
}