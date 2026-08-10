export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  responsibilities: string;
  results: string;
  tools?: string;
  evidenceScore?: number; // 0-5
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  period: string;
  achievements: string;
  tools?: string;
  link?: string;
  evidenceScore?: number; // 0-5
}

export interface ResumeProfile {
  resumeText: string;
  fileName?: string;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
}

export interface TargetJob {
  company: string;
  title: string;
  description: string;
  talentValues: string;
}

export interface RadarMetric {
  subject: string;
  current: number;
  target: number;
  fullMark: number;
  description?: string;
}

export interface StrengthItem {
  title: string;
  category: string;
  description: string;
  evidencePoints: string[];
}

export interface GapItem {
  title: string;
  category: string;
  description: string;
  impactLevel: 'Critical' | 'Moderate' | 'Minor';
  actionItem: string;
}

export interface RedFlagItem {
  title: string;
  category: string;
  description: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface EvidenceAnalysisItem {
  experienceTitle: string;
  evidenceScore: number; // 0-5
  strongClaims: string[];
  missingProof: string[];
  suggestion: string;
}

export interface HiringRiskItem {
  area: string;
  defensibilityScore: number; // 0-100
  pressureQuestions: string[];
  defenseStrategy: string;
}

export interface RoadmapPhase {
  phase: string; // e.g. "0-30일 (단기)"
  tasks: string[];
}

export interface FinalVerdictData {
  verdict: 'Strong Hire' | 'Hire' | 'Hold' | 'Needs Improvement';
  executiveSummary: string;
  roadmap: RoadmapPhase[];
}

export interface AnalysisResult {
  overallMatchScore: number;
  experienceLevel: string;
  keyReadiness: string;
  radarData: RadarMetric[];
  strengths: StrengthItem[];
  gaps: GapItem[];
  redFlags: RedFlagItem[];
  evidenceAnalysis: EvidenceAnalysisItem[];
  hiringRisks: HiringRiskItem[];
  finalVerdict: FinalVerdictData;
  analyzedAt: string;
}

export type MainTab = 'landing' | 'my-career' | 'target-job' | 'dashboard';
export type DashboardTool = 'overview' | 'gap-analysis' | 'evidence' | 'hiring-risks' | 'final-verdict';
