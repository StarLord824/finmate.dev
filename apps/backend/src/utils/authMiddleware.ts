import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //will use auth.js/nextAuth or BetterAuth for authentication later
};