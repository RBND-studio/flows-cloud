import crypto from "node:crypto";

export const verifyWebhookSignature = ({
  signature,
  rawBody,
}: {
  rawBody: Buffer;
  signature: string;
}): { valid: boolean } => {
  const hmac = crypto.createHmac("sha256", process.env.BACKEND_LEMONSQUEEZY_WEBHOOK_SECRET);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const sig = Buffer.from(signature, "utf8");

  return { valid: crypto.timingSafeEqual(digest, sig) };
};
