import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Fees & Payments" };

export default function FeesPage() {
  return (
    <ModulePage
      eyebrow="Workspace"
      title="Fees & Payments"
      description="Fee structure, invoices, payment history, and downloadable receipts."
      icon="payments"
      notes={["fee structure", "invoices", "online payment", "receipts", "scholarships"]}
    />
  );
}
