import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Audit Logs" };

export default function AdminAuditPage() {
  return (
    <ModulePlaceholder
      eyebrow="Governance"
      title="Audit Logs"
      description="Tamper-evident activity trail, anomaly review, and compliance exports."
      icon="history"
      notes={["activity trail", "filters", "anomaly review", "retention policy", "exports"]}
    />
  );
}
