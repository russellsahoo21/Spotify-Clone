// Fallback for when a user hits a route that doesn't exist (404)
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Passes the error to the errorHandler below
};

// General error handler for any crashes or thrown errors in your routes
export const errorHandler = (err, req, res, next) => {
    // Sometimes we set a 200 status code even when there's an error, 
    // so we force it to 500 (Server Error) if that happens.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Only show the stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};