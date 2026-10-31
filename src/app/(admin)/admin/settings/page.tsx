import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Governance"
      title="Settings"
      description="Institution profile, academic terms, branding, and platform preferences."
      icon="settings"
      notes={["institution profile", "academic years", "branding", "notifications", "integrations"]}
    />
  );
}
