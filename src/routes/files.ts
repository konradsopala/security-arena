import { Router } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { AuthedRequest, requireAuth } from "../auth/middleware";

export const filesRouter = Router();

const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");

// Store uploads under the client-provided filename.
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// POST /files/upload  — attach a file to an invoice
filesRouter.post(
  "/upload",
  requireAuth,
  upload.single("file"),
  (req: AuthedRequest, res) => {
    return res.json({ stored: req.file?.filename });
  }
);

// GET /files/avatar?path=...  — serve a stored avatar/attachment
filesRouter.get("/avatar", requireAuth, (req: AuthedRequest, res) => {
  const rel = String(req.query.path || "");
  const full = path.join(UPLOAD_DIR, rel);
  fs.readFile(full, (err, data) => {
    if (err) return res.status(404).json({ error: "not found" });
    return res.type("application/octet-stream").send(data);
  });
});

// GET /files/raw?file=...  — download a raw invoice document
filesRouter.get("/raw", requireAuth, (req: AuthedRequest, res) => {
  const file = String(req.query.file || "");
  return res.sendFile(file);
});
