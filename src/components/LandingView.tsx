import React from 'react';
import { MainTab } from '../types';
import { ArrowRight, ShieldCheck, BarChart3, AlertTriangle, LineChart, Terminal } from 'lucide-react';

interface LandingViewProps {
  setActiveTab: (tab: MainTab) => void;
  onLoadSample: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ setActiveTab, onLoadSample }) => {
  return (
    <div className="w-full flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4 md:px-12 overflow-hidden border-b border-outline-variant bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="col-span-1 lg:col-span-7 z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Professional Grade Utility
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
                현업 팀장의 시선으로<br />
                당신의 커리어를 진단하세요.
              </h1>
              <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                근거 없는 칭찬이 아닌, 실무 증거(Evidence) 기반의 냉정한 분석을 제공합니다.
                객관적인 데이터로 커리어의 강점과 약점을 파악하고 전략을 수립하세요.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <button
                onClick={() => setActiveTab('my-career')}
                className="bg-navy-900 text-white font-semibold text-base px-6 py-3 rounded hover:bg-navy-800 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>시작하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onLoadSample}
                className="bg-surface text-primary border border-outline-variant font-semibold text-base px-6 py-3 rounded hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>샘플 리포트 보기</span>
              </button>
            </div>
          </div>

          {/* Canvas Illustration Right Block */}
          <div className="col-span-1 lg:col-span-5 relative h-[380px] md:h-[450px] w-full rounded-lg overflow-hidden border border-outline-variant bg-white shadow-lg flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-50 opacity-60 z-0" />
            <div className="z-10 w-4/5 h-4/5 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 p-6 text-center bg-white shadow-sm gap-3">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <LineChart className="w-8 h-8" />
              </div>
              <div>
                <p className="font-semibold text-primary text-base">AI Career Analysis Engine</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Data visualization canvas.<br />
                  Competency Radar & Evidence metrics will render here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-8 px-4 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">핵심 기능</h2>
          <p className="text-base text-on-surface-variant">
            철저하게 객관적이고 실무적인 기준을 바탕으로 당신의 이력서를 분해하고 분석합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feature 1: Evidence Analysis */}
          <div className="col-span-1 md:col-span-8 bg-white border border-outline-variant rounded-lg p-8 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group min-h-[280px]">
            <div className="z-10 flex flex-col gap-3 max-w-md">
              <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-navy-900 mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">실무 증거(Evidence) 분석</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                추상적인 주장을 걸러내고, 실제 성과와 기여도를 입증할 수 있는 구체적인 증거 데이터만 추출하여 0-5 단계의 신뢰도 등급을 부여합니다.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-slate-50 rounded-full border border-slate-200 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 bg-white rounded-full border border-slate-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-slate-50 rounded-full border border-slate-200" />
              </div>
            </div>
          </div>

          {/* Feature 2: JD Matching */}
          <div className="col-span-1 md:col-span-4 bg-white border border-outline-variant rounded-lg p-8 flex flex-col gap-3 hover:shadow-md transition-shadow min-h-[280px]">
            <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-secondary mb-2">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary">JD 적합도 매칭</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              목표하는 직무 기술서(JD)와 현재 이력서의 갭(Gap)을 시각적인 레이더 차트로 분석하여 부족한 역량을 명확히 보여줍니다.
            </p>
            <div className="mt-auto h-20 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 bg-slate-50 text-xs font-semibold">
              Radar Chart Rendering Area
            </div>
          </div>

          {/* Feature 3: Interview Defensibility */}
          <div className="col-span-1 md:col-span-12 bg-navy-900 border border-navy-800 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-lg transition-shadow text-white relative overflow-hidden">
            <div className="z-10 flex flex-col gap-3 max-w-2xl">
              <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center text-amber-400 mb-2 border border-slate-700">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">면접 방어력 (Interview Defensibility) 예측</h3>
              <p className="text-base text-slate-300 leading-relaxed">
                당신의 이력서를 검토하는 면접관이 제기할 수 있는 날카로운 압박 질문과 논리적 허점을 사전에 도출합니다. 약점을 방어할 전략을 미리 준비하세요.
              </p>
              <button
                onClick={onLoadSample}
                className="mt-2 text-secondary-fixed-dim font-medium text-sm flex items-center gap-1.5 hover:text-white transition-colors w-fit cursor-pointer"
              >
                <span>리스크 분석 프로세스 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Decorative Code Block Terminal */}
            <div className="z-10 hidden md:block w-96 bg-navy-800 rounded-lg border border-slate-700 p-4 font-mono text-xs text-slate-300 shadow-inner">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <p className="text-red-400 font-semibold">&gt; ALERT: Risk detected in Q3 project</p>
              <p className="mt-1 text-slate-400">&gt; Analyzing evidence strength...</p>
              <p className="text-slate-300">&gt; Level: <span className="text-amber-400 font-bold">2/5 (Weak)</span></p>
              <p className="mt-2 text-white font-semibold">&gt; Generating potential interview probes:</p>
              <p className="pl-3 text-slate-400 mt-1">- "Can you quantify the exact impact?"</p>
              <p className="pl-3 text-slate-400">- "What was your specific role?"</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
