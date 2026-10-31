import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Documents" };

export default function DocumentsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Workspace"
      title="Documents"
      description="Verified student document vault, certificate requests, and downloads."
      icon="folder"
      notes={["document vault", "verification status", "certificate requests", "secure downloads"]}
    />
  );
}
