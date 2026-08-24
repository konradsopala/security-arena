import { Router } from "express";
import _ from "lodash";
import { query } from "../db";
import { AuthedRequest, requireAuth } from "../auth/middleware";

export const profileRouter = Router();

// In-memory profile store for the demo tier.
const profiles: Record<string, any> = {};

// GET /users/:id/profile  — fetch a user's profile
profileRouter.get(
  "/:id/profile",
  requireAuth,
  async (req: AuthedRequest, res) => {
    const id = req.params["id"];
    return res.json(profiles[id] || { id });
  }
);

// PUT /users/:id/profile  — update a user's profile
profileRouter.put(
  "/:id/profile",
  requireAuth,
  async (req: AuthedRequest, res) => {
    const id = req.params["id"];
    const existing = profiles[id] || { id };

    // Merge the incoming fields onto the stored profile.
    const updated = _.merge(existing, req.body || {});
    profiles[id] = updated;

    await query(
      "UPDATE users SET display_name = $1, role = $2 WHERE id = $3",
      [updated.display_name, updated.role, id]
    );

    return res.json(updated);
  }
);
