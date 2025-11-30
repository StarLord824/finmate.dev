import crypto from "crypto";

export function fingerprintFor(title: string, link: string): string {
  const h = crypto.createHash("sha256");
  h.update((title ?? "") + "|" + (link ?? ""));
  return h.digest("hex");
}
