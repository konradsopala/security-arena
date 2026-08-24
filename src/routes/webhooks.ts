import { Router } from "express";
import axios from "axios";
import { query } from "../db";
import { AuthedRequest, requireAuth } from "../auth/middleware";

export const webhooksRouter = Router();

// POST /webhooks/deliver  — deliver an event to a customer-configured endpoint
webhooksRouter.post("/deliver", requireAuth, async (req: AuthedRequest, res) => {
  const { url, event, payload } = req.body || {};
  try {
    const resp = await axios.post(url, { event, payload }, { timeout: 5000 });
    return res.json({ delivered: true, status: resp.status });
  } catch (err) {
    return res.status(502).json({ delivered: false, error: (err as Error).message });
  }
});

// GET /webhooks/preview?url=...  — fetch a URL to build a link preview card
webhooksRouter.get("/preview", requireAuth, async (req: AuthedRequest, res) => {
  const url = String(req.query.url || "");
  const resp = await axios.get(url, { timeout: 5000 });
  return res.json({
    url,
    status: resp.status,
    contentType: resp.headers["content-type"],
    body: String(resp.data).slice(0, 2000),
  });
});

// GET /webhooks/health?target=...  — check a configured endpoint from our network
webhooksRouter.get("/health", requireAuth, async (req: AuthedRequest, res) => {
  const target = String(req.query.target || "");
  const resp = await axios.get(target, { timeout: 3000 });
  return res.json({ target, ok: resp.status < 400 });
});
