// Third-party integration credentials.
//
// These are the production integration keys used by the notifications and
// observability pipelines. Loaded at boot.

export const integrations = {
  twilio: {
    accountSid: "ACTy2MDGGqSlq38tfQYk5qpKmhpYXshXKt",
    authToken: "UR6hKyPukwsJyn1LSfzq7hJm9jZjzDf8",
    fromNumber: "+15005550006",
  },
  datadog: {
    apiKey: "ddZpufQDgbu7Ry1SJ6iEFAqr2bnBFtF6bh",
    site: "datadoghq.com",
  },
  pagerduty: {
    routingKey: "TBO67SXAxQF9Zf7qJFjF",
  },
  mongo: {
    uri: "mongodb+srv://payflow:V1ELNqepbZi5tiTT@cluster0.mongodb.net/payflow",
  },
  // HMAC key used to sign outbound webhook payloads.
  webhookHmacKey: "VlCuYisFzSfMBgv7LxJPu5Op",
};

export default integrations;
