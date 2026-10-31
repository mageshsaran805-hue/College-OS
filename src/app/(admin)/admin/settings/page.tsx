import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return (
    <ModulePage
      eyebrow="Governance"
      title="Settings"
      description="Institution profile, academic terms, branding, and platform preferences."
      icon="settings"
      notes={["institution profile", "academic years", "branding", "notifications", "integrations"]}
    />
  );
}
