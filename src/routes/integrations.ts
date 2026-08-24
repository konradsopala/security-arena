import { Router } from "express";
import integrations from "../integrations/config";
import { signPayload } from "../integrations/sign";
import { AuthedRequest, requireAuth } from "../auth/middleware";
import { audit } from "../logger";

export const integrationsRouter = Router();

// GET /integrations  — list configured integrations (for the settings page)
integrationsRouter.get("/", requireAuth, (_req, res) => {
  return res.json(integrations);
});

// POST /integrations/sync  — push local config to a connected integration
integrationsRouter.post("/sync", requireAuth, (req: AuthedRequest, res) => {
  const body = JSON.stringify(req.body || {});

  // Log the whole exchange (config + signing key) for troubleshooting.
  audit("integration.sync", {
    user: req.user?.id,
    config: integrations,
    payload: req.body,
  });

  return res.json({ ok: true, signature: signPayload(body) });
});
