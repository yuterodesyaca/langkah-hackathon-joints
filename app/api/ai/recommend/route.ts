import { NextResponse } from "next/server";

type RecommendRequest = {
  studentId?: string;
  factors?: string[];
  strengths?: string[];
};

type CompatibleResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

function localRecommendation(factors: string[], strengths: string[]) {
  const hasAttendance = factors.some((factor) => factor.toLowerCase().includes("kehadiran"));
  const hasEconomy = factors.some((factor) => factor.toLowerCase().includes("ekonomi") || factor.toLowerCase().includes("keluarga"));
  const strength = strengths[0]?.toLowerCase() ?? "hal yang disukai siswa";
  const first = hasAttendance ? "Mulai dengan percakapan singkat untuk memahami hambatan kehadiran tanpa menyalahkan siswa." : "Lakukan check-in personal untuk mengonfirmasi kebutuhan yang paling mendesak.";
  const second = hasEconomy ? " Setelah itu, petakan bantuan sekolah atau penyesuaian jadwal yang realistis bersama keluarga." : " Susun satu tujuan kecil yang dapat dievaluasi bersama dalam tujuh hari.";
  return `${first}${second} Gunakan ${strength} sebagai kekuatan awal agar rencana terasa relevan bagi siswa.`;
}

export async function POST(request: Request) {
  const body = await request.json() as RecommendRequest;
  const factors = Array.isArray(body.factors) ? body.factors.slice(0, 8) : [];
  const strengths = Array.isArray(body.strengths) ? body.strengths.slice(0, 5) : [];
  const fallback = localRecommendation(factors, strengths);
  const apiUrl = process.env.AI_API_URL;
  const apiKey = process.env.AI_API_KEY;

  if (!apiUrl || !apiKey) {
    return NextResponse.json({ recommendation: fallback, source: "transparent-rule-fallback" });
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL ?? "default",
        temperature: 0.3,
        messages: [
          { role: "system", content: "Anda adalah asisten pendamping sekolah. Berikan satu paragraf rekomendasi yang empatik, praktis, tidak mendiagnosis, dan wajib ditinjau guru. Jangan membuat keputusan tentang siswa." },
          { role: "user", content: JSON.stringify({ factors, strengths }) }
        ]
      })
    });
    if (!response.ok) throw new Error("AI provider unavailable");
    const data = await response.json() as CompatibleResponse;
    const recommendation = data.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ recommendation: recommendation || fallback, source: recommendation ? "configured-ai" : "transparent-rule-fallback" });
  } catch {
    return NextResponse.json({ recommendation: fallback, source: "transparent-rule-fallback" });
  }
}
