import "server-only";

import { headers } from "next/headers";

export interface RequestMeta {
  ipAddress?: string;
  userAgent?: string;
}

export async function getRequestMeta(): Promise<RequestMeta> {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || undefined;

    return {
      ipAddress,
      userAgent: requestHeaders.get("user-agent") ?? undefined,
    };
  } catch {
    return {};
  }
}
