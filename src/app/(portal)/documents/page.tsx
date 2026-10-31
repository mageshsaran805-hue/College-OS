import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Documents" };

export default function DocumentsPage() {
  return (
    <ModulePage
      eyebrow="Workspace"
      title="Documents"
      description="Verified student document vault, certificate requests, and downloads."
      icon="folder"
      notes={["document vault", "verification status", "certificate requests", "secure downloads"]}
    />
  );
}
