import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Fees & Payments" };

export default function FeesPage() {
  return (
    <ModulePlaceholder
      eyebrow="Workspace"
      title="Fees & Payments"
      description="Fee structure, invoices, payment history, and downloadable receipts."
      icon="payments"
      notes={["fee structure", "invoices", "online payment", "receipts", "scholarships"]}
    />
  );
}
