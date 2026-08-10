import React from 'react';
import { MainTab } from '../types';
import { Check } from 'lucide-react';

interface StepperProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  hasProfileData: boolean;
  hasJobData: boolean;
  hasAnalysis: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  activeTab,
  setActiveTab,
  hasProfileData,
  hasJobData,
  hasAnalysis,
}) => {
  return (
    <nav aria-label="Progress" className="w-full my-4">
      <div className="flex items-center justify-center gap-2 md:gap-6 text-xs uppercase tracking-wider font-semibold">
        {/* Step 1: My Career */}
        <button
          onClick={() => setActiveTab('my-career')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <span
            className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
              activeTab === 'my-career'
                ? 'bg-secondary text-on-secondary shadow-sm ring-2 ring-secondary/30'
                : hasProfileData
                ? 'bg-navy-900 text-white'
                : 'border border-outline-variant text-on-surface-variant group-hover:border-slate-400'
            }`}
          >
            {hasProfileData && activeTab !== 'my-career' ? <Check className="w-3.5 h-3.5" /> : '1'}
          </span>
          <span
            className={`${
              activeTab === 'my-career'
                ? 'text-secondary font-bold'
                : hasProfileData
                ? 'text-primary font-medium'
                : 'text-on-surface-variant'
            }`}
          >
            My Career
          </span>
        </button>

        <div className={`h-[1px] w-6 md:w-16 transition-colors ${hasProfileData ? 'bg-navy-900' : 'bg-outline-variant'}`} />

        {/* Step 2: Target Job */}
        <button
          onClick={() => setActiveTab('target-job')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <span
            className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
              activeTab === 'target-job'
                ? 'bg-secondary text-on-secondary shadow-sm ring-2 ring-secondary/30'
                : hasJobData
                ? 'bg-navy-900 text-white'
                : 'border border-outline-variant text-on-surface-variant group-hover:border-slate-400'
            }`}
          >
            {hasJobData && activeTab !== 'target-job' ? <Check className="w-3.5 h-3.5" /> : '2'}
          </span>
          <span
            className={`${
              activeTab === 'target-job'
                ? 'text-secondary font-bold'
                : hasJobData
                ? 'text-primary font-medium'
                : 'text-on-surface-variant'
            }`}
          >
            Target Job
          </span>
        </button>

        <div className={`h-[1px] w-6 md:w-16 transition-colors ${hasAnalysis ? 'bg-navy-900' : 'bg-outline-variant'}`} />

        {/* Step 3: Analysis */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <span
            className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-secondary text-on-secondary shadow-sm ring-2 ring-secondary/30'
                : hasAnalysis
                ? 'bg-navy-900 text-white'
                : 'border border-outline-variant text-on-surface-variant group-hover:border-slate-400'
            }`}
          >
            {hasAnalysis && activeTab !== 'dashboard' ? <Check className="w-3.5 h-3.5" /> : '3'}
          </span>
          <span
            className={`${
              activeTab === 'dashboard'
                ? 'text-secondary font-bold'
                : hasAnalysis
                ? 'text-primary font-medium'
                : 'text-on-surface-variant'
            }`}
          >
            Analysis
          </span>
        </button>
      </div>
    </nav>
  );
};
