import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini AI lazily or safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Career Analysis API
app.post("/api/analyze", async (req, res) => {
  try {
    const { resumeText, experiences, projects, targetCompany, targetJobTitle, jobDescription, talentValues } = req.body;

    if (!jobDescription || jobDescription.trim() === "") {
      return res.status(400).json({ error: "Job Description (JD) is required for gap analysis." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(400).json({
        error: "GEMINI_API_KEY가 설정되지 않았습니다. AI Studio의 Settings > Secrets에서 API 키를 설정해주세요.",
        isMissingKey: true
      });
    }

    const prompt = `
당신은 IT/테크/핀테크 분야에서 15년 이상의 경력을 가진 베테랑 현업 팀장이자 최고 채용 권한자(Lead Hiring Manager)입니다.
후보자가 입력한 이력서 및 경력 정보와, 목표 기업의 직무 기술서(JD)를 철저히 분해하여 객관적이고 냉정한 '커리어 갭 분석 리포트'를 JSON 형식으로 생성하십시오.

[후보자 제출 정보]
- 작성된 이력서 전문:
${resumeText || "(직접 입력된 이력서 없음)"}

- 등록된 경력 목록 (${experiences?.length || 0}건):
${JSON.stringify(experiences || [], null, 2)}

- 등록된 프로젝트 목록 (${projects?.length || 0}건):
${JSON.stringify(projects || [], null, 2)}

[목표 직무 정보]
- 목표 기업명: ${targetCompany || "목표 기업"}
- 목표 직무명: ${targetJobTitle || "목표 직무"}
- 직무 기술서 (JD):
${jobDescription}

- 기업 인재상/핵심 가치:
${talentValues || "(미입력)"}

[분석 가이드라인]
1. 근거 없는 칭찬이나 추상적인 조언은 배제하고, 실무 증거(Evidence)와 정량적 지표에 기반하여 냉정하게 평가하세요.
2. overallMatchScore (0~100점): JD 요구사항 대비 후보자 역량의 엄격한 일치율.
3. radarData: 다음 6가지 핵심 역량 항목에 대해 후보자의 현재 점수(current)와 요구 점수(target: 보통 85~95점), 설명(description)을 작성하세요.
   - 항목명 (subject): "직무 전문성", "실무 증거력", "프로젝트 임팩트", "JD 적합도", "리더십 & 협업", "문제 해결력"
4. strengths: 3가지 핵심 강점.
5. gaps: 3가지 핵심 역량 갭 (impactLevel: 'Critical' | 'Moderate' | 'Minor').
6. redFlags: 2~3가지 리스크 및 검증 필요사항 (riskLevel: 'High' | 'Medium' | 'Low').
7. evidenceAnalysis: 경력/프로젝트별 증거력 평가 (0~5점 등급, 잘된 주장, 부족한 증거, 보완 제안).
8. hiringRisks (면접 방어력): 면접관이 제기할 만한 날카로운 압박 질문(pressureQuestions 2개 이상)과 방어 전략(defenseStrategy), 방어력 점수(defensibilityScore 0~100점).
9. finalVerdict: 채용 결정 (verdict: 'Strong Hire' | 'Hire' | 'Hold' | 'Needs Improvement'), executiveSummary (총평 리포트), 0-30일/30-60일/60-90일 단계별 로드맵(roadmap).

응답은 반드시 요청한 JSON 규격에 맞추어야 합니다.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallMatchScore: { type: Type.INTEGER },
            experienceLevel: { type: Type.STRING },
            keyReadiness: { type: Type.STRING },
            radarData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  subject: { type: Type.STRING },
                  current: { type: Type.INTEGER },
                  target: { type: Type.INTEGER },
                  fullMark: { type: Type.INTEGER },
                  description: { type: Type.STRING }
                },
                required: ["subject", "current", "target", "fullMark", "description"]
              }
            },
            strengths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  evidencePoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "category", "description", "evidencePoints"]
              }
            },
            gaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impactLevel: { type: Type.STRING },
                  actionItem: { type: Type.STRING }
                },
                required: ["title", "category", "description", "impactLevel", "actionItem"]
              }
            },
            redFlags: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  riskLevel: { type: Type.STRING },
                  mitigation: { type: Type.STRING }
                },
                required: ["title", "category", "description", "riskLevel", "mitigation"]
              }
            },
            evidenceAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  experienceTitle: { type: Type.STRING },
                  evidenceScore: { type: Type.INTEGER },
                  strongClaims: { type: Type.ARRAY, items: { type: Type.STRING } },
                  missingProof: { type: Type.ARRAY, items: { type: Type.STRING } },
                  suggestion: { type: Type.STRING }
                },
                required: ["experienceTitle", "evidenceScore", "strongClaims", "missingProof", "suggestion"]
              }
            },
            hiringRisks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  area: { type: Type.STRING },
                  defensibilityScore: { type: Type.INTEGER },
                  pressureQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  defenseStrategy: { type: Type.STRING }
                },
                required: ["area", "defensibilityScore", "pressureQuestions", "defenseStrategy"]
              }
            },
            finalVerdict: {
              type: Type.OBJECT,
              properties: {
                verdict: { type: Type.STRING },
                executiveSummary: { type: Type.STRING },
                roadmap: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phase: { type: Type.STRING },
                      tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["phase", "tasks"]
                  }
                }
              },
              required: ["verdict", "executiveSummary", "roadmap"]
            }
          },
          required: [
            "overallMatchScore",
            "experienceLevel",
            "keyReadiness",
            "radarData",
            "strengths",
            "gaps",
            "redFlags",
            "evidenceAnalysis",
            "hiringRisks",
            "finalVerdict"
          ]
        }
      }
    });

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    parsedData.analyzedAt = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    return res.json({ success: true, data: parsedData });
  } catch (err: any) {
    console.error("Analysis Error:", err);
    return res.status(500).json({
      error: "분석 중 오류가 발생했습니다: " + (err.message || "알 수 없는 오류"),
      details: String(err)
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Career Map Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
