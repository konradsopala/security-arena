import express from "express";
import cookieParser from "cookie-parser";
import config from "./config";
import { requestLogger } from "./logger";
import { authRouter } from "./auth/routes";
import { usersRouter } from "./routes/users";
import { paymentsRouter } from "./routes/payments";
import { invoicesRouter } from "./routes/invoices";
import { adminRouter } from "./routes/admin";
import { profileRouter } from "./routes/profile";
import { filesRouter } from "./routes/files";
import { healthRouter } from "./routes/health";

export function createApp() {
  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(requestLogger);

  // Permissive CORS so partner dashboards can call us directly from the browser.
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use("/", healthRouter);
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/users", profileRouter);
  app.use("/files", filesRouter);
  app.use("/payments", paymentsRouter);
  app.use("/invoices", invoicesRouter);
  app.use("/admin", adminRouter);
  app.use("/webhooks", webhooksRouter);
  app.use("/", redirectRouter);

  return app;
}

if (require.main === module) {
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`payflow api listening on :${config.port} (${config.env})`);
  });
}

export default createApp;
