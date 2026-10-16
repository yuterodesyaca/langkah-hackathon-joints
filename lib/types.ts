export type SupportLevel = "tinggi" | "sedang" | "stabil";
export type InterventionStatus = "direncanakan" | "berjalan" | "selesai";
export type InterventionType = "Konseling" | "Akademik" | "Keluarga" | "Bantuan" | "Kehadiran";

export type Student = {
  id: string;
  name: string;
  initials: string;
  className: string;
  level: string;
  avatar: string;
  attendance: number;
  previousAttendance: number;
  averageScore: number;
  previousScore: number;
  engagement: number;
  motivation: number;
  economicConstraint: boolean;
  familyResponsibility: boolean;
  languageBarrier: boolean;
  supportLevel: SupportLevel;
  supportScore: number;
  updatedAt: string;
  counselor: string;
  factors: string[];
  strengths: string[];
  note: string;
};

export type Intervention = {
  id: string;
  studentId: string;
  type: InterventionType;
  title: string;
  owner: string;
  dueDate: string;
  status: InterventionStatus;
  progress: number;
  lastNote: string;
};

export type Activity = {
  id: string;
  studentId: string;
  date: string;
  title: string;
  description: string;
  kind: "assessment" | "note" | "intervention" | "progress";
};
