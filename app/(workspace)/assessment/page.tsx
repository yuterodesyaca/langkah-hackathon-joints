import { PageHeading } from "@/components/page-heading";
import { AssessmentWizard } from "@/components/assessment-wizard";

export default function AssessmentPage() {
  return <><PageHeading eyebrow="PENDAMPINGAN DINI" title="Asesmen kebutuhan siswa" description="Kenali perubahan, pahami konteks, dan temukan langkah dukungan yang relevan."/><AssessmentWizard/></>;
}
