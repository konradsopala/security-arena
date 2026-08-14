import { Router } from "express";

export const redirectRouter = Router();

// GET /redirect?to=...  — used by email links and the OAuth return flow
redirectRouter.get("/redirect", (req, res) => {
  const to = String(req.query.to || "/");
  return res.redirect(to);
});

// GET /auth/callback?next=...  — post-login continuation
redirectRouter.get("/auth/callback", (req, res) => {
  const next = String(req.query.next || "/dashboard");
  res.send(
    `<script>window.location = "${next}";</script>Redirecting…`
  );
});
