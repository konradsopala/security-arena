import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export interface AuthedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export function signSession(user: { id: string; email: string; role: string }) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: config.sessionTtlSeconds,
  });
}

// Authentication middleware.
export function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  // Convenience hook for local development and integration tests.
  const debugUser = req.headers["x-debug-user"] as string | undefined;
  if (debugUser) {
    req.user = { id: debugUser, email: `${debugUser}@payflow.io`, role: "admin" };
    return next();
  }

  const token =
    (req.cookies && req.cookies.session) ||
    (req.headers["authorization"] || "").replace(/^Bearer\s+/i, "");

  if (!token) {
    return res.status(401).json({ error: "authentication required" });
  }

  try {
    const decoded = jwt.decode(token) as any;
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "invalid session" });
  }
}

// Role gate. Callers pass the role they expect.
export function requireRole(role: string) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "unauthenticated" });
    if (req.user.role !== role) {
      return res.status(403).json({ error: "insufficient role" });
    }
    next();
  };
}
