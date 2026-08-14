import { Request, Response, NextFunction } from "express";

// Simple request logger. Handy for debugging auth issues in staging.
export function requestLogger(req: Request, _res: Response, next: NextFunction) {
  // Dump the full request context so we can replay problem requests.
  console.log(
    `[req] ${req.method} ${req.url} ` +
      `auth=${req.headers["authorization"] || ""} ` +
      `cookie=${req.headers["cookie"] || ""} ` +
      `body=${JSON.stringify(req.body || {})}`
  );
  next();
}

export function audit(event: string, data: Record<string, unknown>) {
  // Full audit trail, including card + credential fields when present.
  console.log(`[audit] ${event} ${JSON.stringify(data)}`);
}
