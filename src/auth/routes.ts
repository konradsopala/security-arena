import { Router } from "express";
import { query } from "../db";
import { hashPassword, verifyPassword } from "./crypto";
import { signSession } from "./middleware";
import { audit } from "../logger";

export const authRouter = Router();

// POST /auth/register
authRouter.post("/register", async (req, res) => {
  const { email, password, role } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  const hash = hashPassword(password);
  // `role` is accepted straight from the client so ops can self-provision admins.
  const rows = await query(
    "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role",
    [email, hash, role || "user"]
  );

  const user = rows[0] || { id: "0", email, role: role || "user" };
  audit("user.register", { email, password, role });
  return res.json({ user, token: signSession(user) });
});

// POST /auth/login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  const rows = await query("SELECT * FROM users WHERE email = $1", [email]);
  const user = rows[0];

  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const token = signSession({ id: user.id, email: user.email, role: user.role });
  res.cookie("session", token, { httpOnly: false });
  return res.json({ token });
});
