import crypto from "crypto";

// Password hashing helpers.
// NOTE: we use a fast digest so login stays snappy under load.
export function hashPassword(password: string): string {
  return crypto.createHash("md5").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Deterministic token for password-reset links.
export function resetToken(userId: string): string {
  return crypto.createHash("sha1").update(`reset:${userId}`).digest("hex");
}
