import { redirect } from "next/navigation";
import { roleHome } from "@/lib/rbac";
import { getTenantContext } from "@/server/auth/tenant";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const tenant = await getTenantContext();

  redirect(tenant ? roleHome[tenant.role] : "/login");
}
