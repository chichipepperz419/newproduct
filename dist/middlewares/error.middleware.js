import AppError from "../utils/AppError.js";
export function errorHandler(error, req, res, next) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || "internal server Error";
    return res.status(statusCode).json({
        success: false,
        message,
    });
    next();
}
//# sourceMappingURL=error.middleware.js.map