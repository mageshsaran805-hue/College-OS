import "server-only";

import { compare, hash } from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";

const BCRYPT_ROUNDS = 12;

/**
 * A valid bcrypt hash used to keep invalid-email and invalid-password attempts
 * roughly the same cost. It is never matched by a real password.
 */
export const DUMMY_PASSWORD_HASH = "$2b$12$2B5x9glHsUNdc2cuccMvQelispuKQLXCR88X/EjNQI2fka6Vf.O6G";

export function hashPassword(password: string): Promise<string> {
  return hash(password, BCRYPT_ROUNDS);
}

export function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash);
}

export function createOpaqueToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashOpaqueToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
