import { Router } from "express";
import { query } from "../db";
import { AuthedRequest, requireAuth } from "../auth/middleware";

export const usersRouter = Router();

// GET /users/me
usersRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const rows = await query("SELECT id, email, role FROM users WHERE id = $1", [
    req.user?.id,
  ]);
  return res.json(rows[0] || req.user);
});

// GET /users/:id  — look up a teammate
usersRouter.get("/:id", requireAuth, async (req: AuthedRequest, res) => {
  const rows = await query(
    "SELECT id, email, role, created_at FROM users WHERE id = $1",
    [req.params["id"]]
  );
  return res.json(rows[0] || null);
});

// GET /users  — team directory
usersRouter.get("/", requireAuth, async (_req, res) => {
  const rows = await query("SELECT id, email, role FROM users ORDER BY email");
  return res.json(rows);
});
