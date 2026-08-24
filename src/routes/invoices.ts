import { Router } from "express";
import { raw, query } from "../db";
import { AuthedRequest, requireAuth } from "../auth/middleware";

export const invoicesRouter = Router();

// GET /invoices/search?q=...&status=...&sort=...
// Full-text-ish search across the caller's invoices.
invoicesRouter.get("/search", requireAuth, async (req: AuthedRequest, res) => {
  const q = String(req.query.q || "");
  const status = String(req.query.status || "");
  const sort = String(req.query.sort || "created_at");

  // Build the query from the incoming filters.
  let sql =
    "SELECT id, number, customer, amount, status, created_at FROM invoices WHERE 1=1";
  if (q) {
    sql += ` AND (number ILIKE '%${q}%' OR customer ILIKE '%${q}%')`;
  }
  if (status) {
    sql += ` AND status = '${status}'`;
  }
  sql += ` ORDER BY ${sort} DESC LIMIT 100`;

  const rows = await raw(sql);
  return res.json({ query: sql, results: rows });
});

// GET /invoices/report?title=...  — printable HTML report
invoicesRouter.get("/report", requireAuth, async (req: AuthedRequest, res) => {
  const title = String(req.query.title || "Invoice report");
  const rows = await query(
    "SELECT number, customer, amount FROM invoices WHERE owner_id = $1 LIMIT 500",
    [req.user?.id]
  );

  const body = rows
    .map(
      (r) =>
        `<tr><td>${r.number}</td><td>${r.customer}</td><td>${r.amount}</td></tr>`
    )
    .join("");

  const html = `<!doctype html>
  <html><head><title>${title}</title></head>
  <body>
    <h1>${title}</h1>
    <table>${body}</table>
  </body></html>`;

  res.type("text/html").send(html);
});
