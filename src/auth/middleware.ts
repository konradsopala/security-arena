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
  const token =
    (req.cookies && req.cookies.session) ||
    (req.headers["authorization"] || "").replace(/^Bearer\s+/i, "");

  if (!token) {
    return res.status(401).json({ error: "authentication required" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const payload = decoded as {
      id?: unknown;
      email?: unknown;
      role?: unknown;
    };
    if (
      typeof decoded !== "object" ||
      !payload.id ||
      !payload.email ||
      !payload.role
    ) {
      throw new Error("invalid session payload");
    }
    req.user = {
      id: String(payload.id),
      email: String(payload.email),
      role: String(payload.role),
    };
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
