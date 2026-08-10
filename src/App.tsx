import React, { useState } from 'react';
import { MainTab, ResumeProfile, TargetJob, AnalysisResult } from './types';
import { SAMPLE_RESUME_PROFILE, SAMPLE_TARGET_JOB, SAMPLE_ANALYSIS_RESULT } from './data/sampleData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Stepper } from './components/Stepper';
import { LandingView } from './components/LandingView';
import { MyCareerSection } from './components/MyCareerSection';
import { TargetJobSection } from './components/TargetJobSection';
import { DashboardView } from './components/DashboardView';

export function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('landing');

  // User Profile Data
  const [profile, setProfile] = useState<ResumeProfile>({
    resumeText: '',
    experiences: [],
    projects: [],
  });

  // Target Job Data
  const [targetJob, setTargetJob] = useState<TargetJob>({
    company: '',
    title: '',
    description: '',
    talentValues: '',
  });

  // Analysis State
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Load Sample Data into state and navigate to Dashboard
  const handleLoadSample = () => {
    setProfile(SAMPLE_RESUME_PROFILE);
    setTargetJob(SAMPLE_TARGET_JOB);
    setAnalysisResult(SAMPLE_ANALYSIS_RESULT);
    setAnalysisError(null);
    setActiveTab('dashboard');
  };

  // Fill sample JD into Target Job form
  const handleFillSampleJD = () => {
    setTargetJob(SAMPLE_TARGET_JOB);
  };

  // Reset / New Analysis
  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setAnalysisError(null);
    setActiveTab('target-job');
  };

  // Trigger Gemini API Gap Analysis
  const handleRunAnalysis = async () => {
    if (!targetJob.description || targetJob.description.trim().length === 0) {
      setAnalysisError('직무 기술서 (JD)를 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: profile.resumeText,
          experiences: profile.experiences,
          projects: profile.projects,
          targetCompany: targetJob.company,
          targetJobTitle: targetJob.title,
          jobDescription: targetJob.description,
          talentValues: targetJob.talentValues,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        if (resData.isMissingKey) {
          // If GEMINI_API_KEY is missing, load sample analysis with alert notification
          setAnalysisError(resData.error || 'GEMINI_API_KEY가 설정되지 않아 샘플 모드로 분석을 시시합니다.');
          setAnalysisResult({
            ...SAMPLE_ANALYSIS_RESULT,
            analyzedAt: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) + " (샘플 데이터 모드)"
          });
          setActiveTab('dashboard');
        } else {
          throw new Error(resData.error || '분석 중 오류가 발생했습니다.');
        }
      } else {
        setAnalysisResult(resData.data);
        setActiveTab('dashboard');
      }
    } catch (err: any) {
      console.error("API Error:", err);
      setAnalysisError(err.message || '서버와의 통신에 실패했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const hasProfileData = Boolean(profile.resumeText || profile.experiences.length > 0 || profile.projects.length > 0);
  const hasJobData = Boolean(targetJob.description && targetJob.description.trim().length > 10);
  const hasAnalysis = Boolean(analysisResult);

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-on-surface antialiased">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoadSample={handleLoadSample}
      />

      {/* Stepper displayed when in step views */}
      {activeTab !== 'landing' && (
        <div className="w-full bg-surface border-b border-outline-variant py-2 px-4">
          <div className="max-w-7xl mx-auto">
            <Stepper
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              hasProfileData={hasProfileData}
              hasJobData={hasJobData}
              hasAnalysis={hasAnalysis}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {activeTab === 'landing' && (
          <LandingView
            setActiveTab={setActiveTab}
            onLoadSample={handleLoadSample}
          />
        )}

        {activeTab === 'my-career' && (
          <MyCareerSection
            profile={profile}
            setProfile={setProfile}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'target-job' && (
          <TargetJobSection
            targetJob={targetJob}
            setTargetJob={setTargetJob}
            onRunAnalysis={handleRunAnalysis}
            isAnalyzing={isAnalyzing}
            analysisError={analysisError}
            onFillSampleJD={handleFillSampleJD}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            analysisResult={analysisResult}
            setActiveTab={setActiveTab}
            onLoadSample={handleLoadSample}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
