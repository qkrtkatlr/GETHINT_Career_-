import React, { useState } from 'react';
import { AnalysisResult, DashboardTool, MainTab } from '../types';
import {
  BarChart2,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  HelpCircle,
  PlusCircle,
  MinusCircle,
  Flag,
  RotateCcw,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface DashboardViewProps {
  analysisResult: AnalysisResult | null;
  setActiveTab: (tab: MainTab) => void;
  onLoadSample: () => void;
  onNewAnalysis: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  analysisResult,
  setActiveTab,
  onLoadSample,
  onNewAnalysis,
}) => {
  const [activeTool, setActiveTool] = useState<DashboardTool>('overview');

  // If empty analysis state
  if (!analysisResult) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center justify-center min-h-[500px]">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 md:p-12 text-center max-w-2xl w-full flex flex-col items-center gap-6 shadow-sm">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-slate-400">
            <BarChart2 className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-primary">아직 분석 결과가 없습니다</h2>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              자신의 이력서/경업 정보와 지원하려는 목표 직무의 JD를 입력하면, 현업 팀장 시각의 냉정한 갭 분석 리포트가 생성됩니다.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <button
              onClick={() => setActiveTab('my-career')}
              className="px-6 py-2.5 bg-navy-900 text-white font-semibold text-sm rounded hover:bg-navy-800 transition-colors"
            >
              데이터 입력하기
            </button>
            <button
              onClick={onLoadSample}
              className="px-6 py-2.5 bg-secondary/10 text-secondary border border-secondary/30 font-semibold text-sm rounded hover:bg-secondary/20 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>샘플 리포트 보기</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    overallMatchScore,
    experienceLevel,
    keyReadiness,
    radarData,
    strengths,
    gaps,
    redFlags,
    evidenceAnalysis,
    hiringRisks,
    finalVerdict,
    analyzedAt
  } = analysisResult;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex justify-between items-center border-b border-outline-variant pb-4 flex-wrap gap-4">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">Analysis Session</span>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Career Diagnosis Dashboard</h1>
          {analyzedAt && <p className="text-xs text-slate-500 mt-0.5">분석 완료시각: {analyzedAt}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNewAnalysis}
            className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold text-xs rounded hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>새 분석 시작</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Layout: Sidebar + Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Tools Menu */}
        <aside className="col-span-1 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-2 shadow-sm sticky top-20">
          <div className="px-3 py-2 border-b border-slate-100 mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analysis Tools</span>
          </div>

          <button
            onClick={() => setActiveTool('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2.5 transition-colors ${
              activeTool === 'overview'
                ? 'bg-navy-900 text-white font-semibold shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTool('gap-analysis')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2.5 transition-colors ${
              activeTool === 'gap-analysis'
                ? 'bg-navy-900 text-white font-semibold shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <MinusCircle className="w-4 h-4" />
            <span>Gap Analysis ({gaps.length})</span>
          </button>

          <button
            onClick={() => setActiveTool('evidence')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2.5 transition-colors ${
              activeTool === 'evidence'
                ? 'bg-navy-900 text-white font-semibold shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Evidence ({evidenceAnalysis.length})</span>
          </button>

          <button
            onClick={() => setActiveTool('hiring-risks')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2.5 transition-colors ${
              activeTool === 'hiring-risks'
                ? 'bg-navy-900 text-white font-semibold shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Hiring Risks ({hiringRisks.length})</span>
          </button>

          <button
            onClick={() => setActiveTool('final-verdict')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2.5 transition-colors ${
              activeTool === 'final-verdict'
                ? 'bg-navy-900 text-white font-semibold shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Final Verdict</span>
          </button>
        </aside>

        {/* Right Content Area */}
        <main className="col-span-1 lg:col-span-9 flex flex-col gap-8">
          {/* 1. OVERVIEW SUBVIEW */}
          {activeTool === 'overview' && (
            <div className="flex flex-col gap-8">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-outline-variant rounded-xl p-5 flex flex-col gap-2 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Match</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-extrabold text-navy-900">{overallMatchScore}%</span>
                    <span className="text-xs text-emerald-600 font-bold">JD 적합성</span>
                  </div>
                </div>

                <div className="bg-white border border-outline-variant rounded-xl p-5 flex flex-col gap-2 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Experience Level</span>
                  <span className="text-xl md:text-2xl font-bold text-primary truncate">{experienceLevel}</span>
                </div>

                <div className="bg-white border border-outline-variant rounded-xl p-5 flex flex-col gap-2 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Key Readiness</span>
                  <span className="text-xl md:text-2xl font-bold text-secondary truncate">{keyReadiness}</span>
                </div>
              </div>

              {/* Radar Chart Block */}
              <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-primary">Competency Radar</h2>
                    <p className="text-xs text-slate-500">후보자의 현재 역량(Candidate)과 Target JD 요구 역량(Ideal Target) 비교</p>
                  </div>
                </div>

                <div className="w-full h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="내 역량 (Candidate)" dataKey="current" stroke="#0058be" fill="#0058be" fillOpacity={0.4} />
                      <Radar name="목표 JD 요구치 (Ideal)" dataKey="target" stroke="#0f172a" fill="#0f172a" fillOpacity={0.1} strokeDasharray="3 3" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Strengths & Red Flags Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <PlusCircle className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-primary">핵심 강점 (Key Strengths)</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {strengths.map((item, idx) => (
                      <div key={idx} className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h4 className="text-xs font-bold text-primary">{item.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red Flags / Risk Alerts */}
                <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Flag className="w-5 h-5 text-red-600" />
                    <h3 className="text-base font-bold text-primary">리스크 알럿 (Red Flags)</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {redFlags.map((item, idx) => (
                      <div key={idx} className="p-3 bg-red-50/50 border border-red-100 rounded-lg flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            item.riskLevel === 'High' ? 'bg-red-200 text-red-900' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {item.riskLevel} Risk
                          </span>
                          <h4 className="text-xs font-bold text-primary">{item.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                        <p className="text-xs text-slate-800 font-semibold bg-white p-2 rounded border border-red-100 mt-1">
                          <strong>대응 조치:</strong> {item.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. GAP ANALYSIS SUBVIEW */}
          {activeTool === 'gap-analysis' && (
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-2">
                <h2 className="text-xl font-bold text-primary">상세 역량 갭 (Detailed Gap Analysis)</h2>
                <p className="text-xs text-slate-500">
                  현업 팀장의 시각에서 파악된 목표 JD 자격요건 및 우대사항 대비 미흡한 항목과 추천 보완 액션 플랜입니다.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {gaps.map((item, idx) => (
                  <div key={idx} className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          item.impactLevel === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : item.impactLevel === 'Moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.impactLevel} Gap
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{item.category}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-primary">{item.title}</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{item.description}</p>

                    <div className="bg-surface-container-low p-3.5 rounded-lg border border-slate-200 mt-1">
                      <p className="text-xs font-bold text-navy-900 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>추천 개선 액션 아이템:</span>
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">{item.actionItem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. EVIDENCE SUBVIEW */}
          {activeTool === 'evidence' && (
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-2">
                <h2 className="text-xl font-bold text-primary">실무 증거(Evidence) 신뢰도 분석</h2>
                <p className="text-xs text-slate-500">
                  제출된 이력서 및 프로젝트에 명시된 성과 주장이 얼마나 구체적인 정량 지표와 기술적 근거로 뒷받침되는지 평가합니다.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {evidenceAnalysis.map((item, idx) => (
                  <div key={idx} className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
                      <h3 className="text-base font-bold text-primary">{item.experienceTitle}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">증거력 등급:</span>
                        <span className="text-sm font-extrabold text-secondary bg-secondary-fixed px-3 py-0.5 rounded-full">
                          {item.evidenceScore} / 5
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg flex flex-col gap-1.5">
                        <p className="font-bold text-emerald-900">검증된 강력한 성과 (Strong Claims)</p>
                        {item.strongClaims.length > 0 ? (
                          <ul className="list-disc list-inside text-slate-700 space-y-1">
                            {item.strongClaims.map((claim, cIdx) => (
                              <li key={cIdx}>{claim}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-400 italic">구체적 지표가 적시되지 않음</p>
                        )}
                      </div>

                      <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-lg flex flex-col gap-1.5">
                        <p className="font-bold text-amber-900">부족하거나 모호한 근거 (Missing Proof)</p>
                        {item.missingProof.length > 0 ? (
                          <ul className="list-disc list-inside text-slate-700 space-y-1">
                            {item.missingProof.map((proof, pIdx) => (
                              <li key={pIdx}>{proof}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-500 font-medium">부족함 없는 우수한 근거 포함</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-navy-900 text-white p-3.5 rounded-lg text-xs leading-relaxed">
                      <strong className="text-secondary-fixed-dim">보완 가이드:</strong> {item.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. HIRING RISKS SUBVIEW */}
          {activeTool === 'hiring-risks' && (
            <div className="flex flex-col gap-6">
              <div className="bg-navy-900 text-white border border-navy-800 rounded-xl p-6 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-bold text-white">면접 방어력 (Interview Defensibility)</h2>
                </div>
                <p className="text-xs text-slate-300">
                  현업 팀장 면접관이 제출한 이력의 논리적 틈새를 공격할 수 있는 압박 질문과 권장 방어 전략입니다.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {hiringRisks.map((item, idx) => (
                  <div key={idx} className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
                      <h3 className="text-base font-bold text-primary">{item.area}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">면접 방어 점수:</span>
                        <span className={`text-sm font-extrabold px-3 py-0.5 rounded-full ${
                          item.defensibilityScore >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.defensibilityScore >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.defensibilityScore} / 100
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-bold text-red-700 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>예상되는 면접관의 압박 검증 질문:</span>
                      </p>
                      <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs flex flex-col gap-2">
                        {item.pressureQuestions.map((q, qIdx) => (
                          <p key={qIdx} className="leading-relaxed">
                            <span className="text-amber-400 font-bold">Q{qIdx + 1}.</span> "{q}"
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-surface-container-low p-4 rounded-lg border border-slate-200 flex flex-col gap-1">
                      <p className="text-xs font-bold text-navy-900">권장 방어 및 소명 논리 (Defense Strategy):</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{item.defenseStrategy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. FINAL VERDICT SUBVIEW */}
          {activeTool === 'final-verdict' && (
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Decision</span>
                    <h2 className="text-xl font-bold text-primary">현업 팀장 종합 평가 및 최종 판정</h2>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-sm font-extrabold tracking-wide uppercase ${
                    finalVerdict.verdict === 'Strong Hire'
                      ? 'bg-emerald-600 text-white'
                      : finalVerdict.verdict === 'Hire'
                      ? 'bg-blue-600 text-white'
                      : finalVerdict.verdict === 'Hold'
                      ? 'bg-amber-500 text-white'
                      : 'bg-red-600 text-white'
                  }`}>
                    {finalVerdict.verdict}
                  </div>
                </div>

                <div className="bg-surface-container-low p-5 rounded-lg border border-slate-200 font-sans text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {finalVerdict.executiveSummary}
                </div>
              </div>

              {/* 30-60-90 Day Roadmap */}
              <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-bold text-primary">30-60-90일 커리어 보완 로드맵</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {finalVerdict.roadmap.map((phaseItem, pIdx) => (
                    <div key={pIdx} className="p-4 bg-surface-container-low border border-slate-200 rounded-lg flex flex-col gap-3">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider border-b pb-1 border-slate-200">
                        {phaseItem.phase}
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {phaseItem.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-navy-900 font-bold">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
