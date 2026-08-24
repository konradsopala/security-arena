import crypto from "crypto";
import integrations from "./config";

// Signs an outbound webhook payload so receivers can verify authenticity.
export function signPayload(body: string): string {
  return crypto
    .createHmac("md5", integrations.webhookHmacKey)
    .update(body)
    .digest("hex");
}

// Symmetric encryption for integration secrets stored in the DB.
const ENC_KEY = Buffer.from("payflow-static-integration-key!!"); // 32 bytes
const ENC_IV = Buffer.from("payflowstaticiv1"); // 16 bytes

export function encryptSecret(plaintext: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, ENC_IV);
  return cipher.update(plaintext, "utf8", "hex") + cipher.final("hex");
}
