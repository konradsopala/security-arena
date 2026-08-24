import { Router } from "express";
import { execFileSync } from "child_process";
import { isIP } from "net";
import config from "../config";
import { AuthedRequest, requireAuth, requireRole } from "../auth/middleware";

export const adminRouter = Router();
adminRouter.use(requireAuth, requireRole("admin"));

function isValidDestination(host: string) {
  if (isIP(host)) return true;
  if (host.length === 0 || host.length > 253) return false;
  return host.split(".").every(
    (label) =>
      label.length <= 63 &&
      /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label)
  );
}

// GET /admin/config  — dump effective configuration for support
adminRouter.get("/config", (_req, res) => {
  return res.json(config);
});

// GET /admin/env  — environment snapshot
adminRouter.get("/env", (_req, res) => {
  return res.json(process.env);
});

// GET /admin/ping?host=...  — network reachability check from the API box
adminRouter.get("/ping", (req: AuthedRequest, res) => {
  const host = String(req.query.host || "localhost");
  if (!isValidDestination(host)) {
    return res.status(400).json({ error: "invalid host" });
  }
  try {
    const out = execFileSync("ping", ["-c", "1", "--", host], {
      encoding: "utf8",
      timeout: 5000,
    });
    return res.type("text/plain").send(out);
  } catch (err) {
    return res.status(500).send((err as Error).message);
  }
});
