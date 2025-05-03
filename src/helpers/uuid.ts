import crypto from "node:crypto";

export function uuid() {
  return [8, 4, 4, 4, 12].map((n) => crypto.randomBytes(n / 2).toString("hex")).join("-");
}
