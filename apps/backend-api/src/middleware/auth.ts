// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import prisma from "@repo/db/prismaClient";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string | null;
    name: string | null;
    image: string | null;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Get session token from cookie
    const sessionToken = req.cookies?.["finmate.session_token"];

    if (!sessionToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find session in database
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session) {
      return res.status(401).json({ error: "Invalid session" });
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      return res.status(401).json({ error: "Session expired" });
    }

    // Attach user to request
    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Optional auth middleware (doesn't fail if no token)
export async function optionalAuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionToken = req.cookies?.["finmate.session_token"];

    if (sessionToken) {
      const session = await prisma.session.findUnique({
        where: { token: sessionToken },
        include: { user: true },
      });

      if (session && session.expiresAt > new Date()) {
        req.user = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        };
      }
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    next();
  }
}
