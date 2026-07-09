 //global error handler
import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,

){
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });

    }
    const statusCode = error.statusCode || 500;
    const message = error.message || "internal server Error";

    return res.status (statusCode). json({
        success: false,
        message,
    });
    next()
}
