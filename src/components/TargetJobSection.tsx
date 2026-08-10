import React, { useState } from 'react';
import { TargetJob } from '../types';
import { BarChart3, Loader2, BookmarkCheck, Sparkles, AlertCircle } from 'lucide-react';

interface TargetJobSectionProps {
  targetJob: TargetJob;
  setTargetJob: React.Dispatch<React.SetStateAction<TargetJob>>;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
  analysisError?: string | null;
  onFillSampleJD: () => void;
}

export const TargetJobSection: React.FC<TargetJobSectionProps> = ({
  targetJob,
  setTargetJob,
  onRunAnalysis,
  isAnalyzing,
  analysisError,
  onFillSampleJD,
}) => {
  const [draftSaved, setDraftSaved] = useState(false);

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const isFormValid = targetJob.description && targetJob.description.trim().length > 10;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Target Role Definition</h1>
          <button
            onClick={onFillSampleJD}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/30 rounded text-xs font-semibold hover:bg-secondary/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>샘플 JD 자동 입력</span>
          </button>
        </div>
        <p className="text-sm md:text-base text-on-surface-variant">
          Input the precise requirements of the position you are aiming for to generate a gap analysis.
        </p>
      </div>

      {/* Input Form Section */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-primary" htmlFor="company">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                value={targetJob.company}
                onChange={(e) => setTargetJob({ ...targetJob, company: e.target.value })}
                placeholder="e.g. 네이버, 토스, Google, Kakao"
                className="bg-surface border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 text-primary placeholder:text-slate-400 font-sans"
              />
            </div>

            {/* Target Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-primary" htmlFor="title">
                Target Job Title
              </label>
              <input
                id="title"
                type="text"
                value={targetJob.title}
                onChange={(e) => setTargetJob({ ...targetJob, title: e.target.value })}
                placeholder="e.g. Senior Product Manager, Lead Backend Engineer"
                className="bg-surface border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 text-primary placeholder:text-slate-400 font-sans"
              />
            </div>
          </div>

          {/* Job Description (JD) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center justify-between" htmlFor="jd">
              <span>Job Description (JD)</span>
              <span className="text-slate-400 font-normal normal-case">Required</span>
            </label>
            <textarea
              id="jd"
              rows={8}
              value={targetJob.description}
              onChange={(e) => setTargetJob({ ...targetJob, description: e.target.value })}
              placeholder="지원하려는 기업의 JD를 입력해주세요. (Copy and paste the exact job requirements here)"
              className="bg-surface border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 text-primary placeholder:text-slate-400 resize-y font-sans leading-relaxed"
            />
            <p className="text-xs text-on-surface-variant mt-0.5">
              Provide as much detail as possible for accurate gap analysis.
            </p>
          </div>

          {/* Talent Values (Core Values) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center justify-between" htmlFor="values">
              <span>Talent Values (Core Values)</span>
              <span className="text-slate-400 font-normal normal-case">Optional</span>
            </label>
            <textarea
              id="values"
              rows={4}
              value={targetJob.talentValues}
              onChange={(e) => setTargetJob({ ...targetJob, talentValues: e.target.value })}
              placeholder="e.g. Bias for action, Customer obsession, Radical transparency..."
              className="bg-surface border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 text-primary placeholder:text-slate-400 resize-y font-sans leading-relaxed"
            />
          </div>

          {/* Error display */}
          {analysisError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">분석 실행 중 이슈 발생</p>
                <p className="text-xs mt-1">{analysisError}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-outline-variant flex justify-between items-center mt-2 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="text-xs font-bold text-action-blue bg-transparent hover:bg-surface-variant px-4 py-3 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              {draftSaved && <span className="text-xs text-emerald-600 font-semibold">임시 저장되었습니다.</span>}
            </div>

            <button
              type="button"
              disabled={!isFormValid || isAnalyzing}
              onClick={onRunAnalysis}
              className={`text-xs font-bold px-8 py-3 rounded-lg transition-all flex items-center gap-2 ${
                isFormValid && !isAnalyzing
                  ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-sm cursor-pointer'
                  : 'bg-surface-variant text-on-surface-variant cursor-not-allowed opacity-60'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>현업 팀장 AI 분석 진행 중...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  <span>Analyze Gap</span>
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
