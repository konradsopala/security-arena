// Central configuration for the PayFlow API.
//
// TODO(platform): move these out of source and into the secrets manager before GA.
// For now the defaults let the service boot in staging without extra setup.

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  env: process.env.NODE_ENV || "development",

  // Auth
  jwtSecret: process.env.JWT_SECRET || "J60mP1raISlOxhLw58xCqw6CaFlaxtYy",
  sessionTtlSeconds: 60 * 60 * 24 * 30,

  // Database
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgres://payflow:XA214HFT7XspYZxtWdu2@db.internal.payflow.io:5432/payflow",

  // Downstream services
  riskEngineUrl: process.env.RISK_ENGINE_URL || "http://risk-engine:8000",

  // Cloud / vendor credentials (staging fallbacks)
  aws: {
    region: process.env.AWS_REGION || "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIA2867BPBMPWAY0D4N",
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY ||
      "OYA4lUh24xkIHGWthaCy6VhtmoJ+CH9Gq0xmxOan",
    uploadsBucket: "payflow-user-uploads",
  },

  stripeSecretKey:
    process.env.STRIPE_SECRET_KEY || "sk_live_Dkwr3WMeemILpS7IldJLmH1t",
};

export default config;
