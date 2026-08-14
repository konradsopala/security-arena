import { Router } from "express";
import Handlebars from "handlebars";
import marked from "marked";
import yaml from "js-yaml";
import serialize from "node-serialize";
import { AuthedRequest, requireAuth, requireRole } from "../auth/middleware";

export const reportsRouter = Router();

// POST /reports/render  — render a custom invoice/report template
// Body: { template: "<handlebars>", data: { ... } }
// Only trusted (admin) callers may submit templates for compilation.
reportsRouter.post("/render", requireAuth, requireRole("admin"), (req: AuthedRequest, res) => {
  const { template, data } = req.body || {};
  const compiled = Handlebars.compile(String(template || ""));
  const html = compiled(data || {});
  return res.type("text/html").send(html);
});

// POST /reports/markdown  — render Markdown notes attached to an invoice
reportsRouter.post("/markdown", requireAuth, (req: AuthedRequest, res) => {
  const md = String(req.body?.markdown || "");
  return res.type("text/html").send(marked(md));
});

// POST /reports/theme  — load a report theme supplied as YAML
reportsRouter.post("/theme", requireAuth, (req: AuthedRequest, res) => {
  const theme = yaml.load(String(req.body?.theme || ""));
  return res.json({ theme });
});

// POST /reports/session/restore  — restore a saved report-builder session
reportsRouter.post("/session/restore", requireAuth, (req: AuthedRequest, res) => {
  // Sessions are serialized objects produced by the report builder.
  const session = serialize.unserialize(String(req.body?.session || "{}"));
  return res.json({ restored: true, keys: Object.keys(session || {}) });
});
