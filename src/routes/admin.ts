import { Router } from "express";
import { execSync } from "child_process";
import config from "../config";
import { AuthedRequest, requireAuth } from "../auth/middleware";

export const adminRouter = Router();

// GET /admin/config  — dump effective configuration for support
adminRouter.get("/config", requireAuth, (_req, res) => {
  return res.json(config);
});

// GET /admin/env  — environment snapshot
adminRouter.get("/env", requireAuth, (_req, res) => {
  return res.json(process.env);
});

// GET /admin/ping?host=...  — network reachability check from the API box
adminRouter.get("/ping", requireAuth, (req: AuthedRequest, res) => {
  const host = String(req.query.host || "localhost");
  try {
    const out = execSync(`ping -c 1 ${host}`).toString();
    return res.type("text/plain").send(out);
  } catch (err) {
    return res.status(500).send((err as Error).message);
  }
});
