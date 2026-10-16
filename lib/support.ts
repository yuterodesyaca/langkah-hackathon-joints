import type { Student, SupportLevel } from "./types";

type SupportInput = Pick<Student, "attendance" | "previousAttendance" | "averageScore" | "previousScore" | "engagement" | "motivation" | "economicConstraint" | "familyResponsibility" | "languageBarrier">;

export type SupportResult = {
  score: number;
  level: SupportLevel;
  factors: string[];
  recommendations: string[];
};

export function calculateSupport(input: SupportInput): SupportResult {
  let score = 0;
  const factors: string[] = [];
  const recommendations: string[] = [];

  if (input.attendance < 75) {
    score += 28;
    factors.push(`Kehadiran ${input.attendance}% — perlu perhatian segera`);
    recommendations.push("Susun rencana pemulihan kehadiran bersama wali kelas dan keluarga.");
  } else if (input.attendance < 85) {
    score += 16;
    factors.push(`Kehadiran menurun ke ${input.attendance}%`);
    recommendations.push("Lakukan check-in singkat untuk memahami hambatan kehadiran.");
  }

  if (input.previousAttendance - input.attendance >= 8) {
    score += 10;
    factors.push(`Kehadiran turun ${input.previousAttendance - input.attendance}%`);
  }

  if (input.previousScore - input.averageScore >= 8) {
    score += 16;
    factors.push(`Rata-rata nilai turun ${input.previousScore - input.averageScore} poin`);
    recommendations.push("Tawarkan pendampingan akademik atau program remedial terarah.");
  } else if (input.averageScore < 70) {
    score += 10;
    factors.push(`Rata-rata nilai ${input.averageScore}`);
  }

  if (input.engagement <= 2) {
    score += 14;
    factors.push("Keterlibatan belajar rendah");
    recommendations.push("Jadwalkan percakapan personal dengan pendekatan berbasis kekuatan siswa.");
  }

  if (input.motivation <= 2) {
    score += 14;
    factors.push("Motivasi belajar dilaporkan menurun");
    recommendations.push("Libatkan guru BK untuk menyusun tujuan belajar jangka pendek.");
  }

  if (input.economicConstraint) {
    score += 12;
    factors.push("Terdapat kendala ekonomi");
    recommendations.push("Verifikasi kelayakan program bantuan sekolah atau beasiswa.");
  }

  if (input.familyResponsibility) {
    score += 10;
    factors.push("Memiliki tanggung jawab membantu keluarga");
    recommendations.push("Diskusikan jadwal belajar fleksibel bersama siswa dan keluarga.");
  }

  if (input.languageBarrier) {
    score += 6;
    factors.push("Terdapat hambatan bahasa dalam pembelajaran");
    recommendations.push("Sediakan materi visual dan pendamping sebaya yang sesuai.");
  }

  const normalizedScore = Math.min(score, 100);
  const level: SupportLevel = normalizedScore >= 50 ? "tinggi" : normalizedScore >= 28 ? "sedang" : "stabil";

  if (recommendations.length === 0) {
    recommendations.push("Pertahankan check-in rutin dan apresiasi perkembangan siswa.");
  }

  return { score: normalizedScore, level, factors, recommendations: [...new Set(recommendations)] };
}

export function levelLabel(level: SupportLevel) {
  return level === "tinggi" ? "Butuh dukungan segera" : level === "sedang" ? "Perlu dipantau" : "Berkembang stabil";
}
