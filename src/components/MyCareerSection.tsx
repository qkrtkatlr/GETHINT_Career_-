import React, { useState } from 'react';
import { ResumeProfile, ExperienceItem, ProjectItem, MainTab } from '../types';
import { FileText, Briefcase, Plus, Upload, Trash2, Edit2, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface MyCareerSectionProps {
  profile: ResumeProfile;
  setProfile: React.Dispatch<React.SetStateAction<ResumeProfile>>;
  setActiveTab: (tab: MainTab) => void;
}

export const MyCareerSection: React.FC<MyCareerSectionProps> = ({
  profile,
  setProfile,
  setActiveTab,
}) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);
  const [showProjModal, setShowProjModal] = useState(false);

  const [resumeTextTemp, setResumeTextTemp] = useState(profile.resumeText || '');
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingProjId, setEditingProjId] = useState<string | null>(null);

  // Experience Form State
  const [expForm, setExpForm] = useState<Omit<ExperienceItem, 'id'>>({
    company: '',
    role: '',
    period: '',
    responsibilities: '',
    results: '',
    tools: '',
    evidenceScore: 4,
  });

  // Project Form State
  const [projForm, setProjForm] = useState<Omit<ProjectItem, 'id'>>({
    name: '',
    role: '',
    period: '',
    achievements: '',
    tools: '',
    evidenceScore: 4,
  });

  const handleSaveResumeText = () => {
    setProfile((prev) => ({
      ...prev,
      resumeText: resumeTextTemp,
    }));
    setShowResumeModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setProfile((prev) => ({
          ...prev,
          fileName: file.name,
          resumeText: text || `[Uploaded file: ${file.name}]`,
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleSaveExperience = () => {
    if (!expForm.company || !expForm.role) return;
    if (editingExpId) {
      setProfile((prev) => ({
        ...prev,
        experiences: prev.experiences.map((item) =>
          item.id === editingExpId ? { ...expForm, id: editingExpId } : item
        ),
      }));
    } else {
      const newItem: ExperienceItem = {
        ...expForm,
        id: `exp-${Date.now()}`,
      };
      setProfile((prev) => ({
        ...prev,
        experiences: [...prev.experiences, newItem],
      }));
    }
    setExpForm({ company: '', role: '', period: '', responsibilities: '', results: '', tools: '', evidenceScore: 4 });
    setEditingExpId(null);
    setShowExpModal(false);
  };

  const handleEditExperience = (exp: ExperienceItem) => {
    setEditingExpId(exp.id);
    setExpForm({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      responsibilities: exp.responsibilities,
      results: exp.results,
      tools: exp.tools || '',
      evidenceScore: exp.evidenceScore || 4,
    });
    setShowExpModal(true);
  };

  const handleDeleteExperience = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  const handleSaveProject = () => {
    if (!projForm.name || !projForm.role) return;
    if (editingProjId) {
      setProfile((prev) => ({
        ...prev,
        projects: prev.projects.map((item) =>
          item.id === editingProjId ? { ...projForm, id: editingProjId } : item
        ),
      }));
    } else {
      const newItem: ProjectItem = {
        ...projForm,
        id: `proj-${Date.now()}`,
      };
      setProfile((prev) => ({
        ...prev,
        projects: [...prev.projects, newItem],
      }));
    }
    setProjForm({ name: '', role: '', period: '', achievements: '', tools: '', evidenceScore: 4 });
    setEditingProjId(null);
    setShowProjModal(false);
  };

  const handleEditProject = (proj: ProjectItem) => {
    setEditingProjId(proj.id);
    setProjForm({
      name: proj.name,
      role: proj.role,
      period: proj.period,
      achievements: proj.achievements,
      tools: proj.tools || '',
      evidenceScore: proj.evidenceScore || 4,
    });
    setShowProjModal(true);
  };

  const handleDeleteProject = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  const totalItemsCount = (profile.resumeText ? 1 : 0) + profile.experiences.length + profile.projects.length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-8">
      {/* Header Content */}
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Your Career Profile</h1>
        <p className="text-sm md:text-base text-on-surface-variant">
          Enter your professional history to begin the gap analysis against your target roles.
        </p>
      </div>

      {/* Main Experience/Resume Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Section */}
        <div className="flex flex-col gap-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-outline-variant pb-3">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <span>Resume</span>
              {profile.resumeText && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">등록 완료</span>}
            </h2>
            <FileText className="w-5 h-5 text-slate-400" />
          </div>

          {!profile.resumeText ? (
            <div className="flex-grow flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-lg bg-surface-container-low min-h-[280px] text-center gap-3">
              <Upload className="w-10 h-10 text-slate-400" />
              <p className="text-xs md:text-sm text-slate-600 max-w-xs leading-relaxed">
                아직 등록된 경험이 없습니다. 본인의 프로젝트, 인턴, 대외활동 또는 직무 관련 경험을 입력해주세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <label className="px-4 py-2 bg-surface-container-lowest border border-navy-900 text-navy-900 font-semibold text-xs rounded hover:bg-surface-variant transition-colors cursor-pointer text-center">
                  <span>Upload Resume</span>
                  <input type="file" accept=".pdf,.txt,.docx" onChange={handleFileUpload} className="hidden" />
                </label>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="px-4 py-2 bg-navy-900 text-white font-semibold text-xs rounded hover:bg-navy-800 transition-colors cursor-pointer"
                >
                  직접 이력서 입력
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 min-h-[280px] justify-between bg-surface-container-low p-4 rounded-lg border border-slate-200">
              <div className="flex flex-col gap-2">
                {profile.fileName && (
                  <p className="text-xs font-semibold text-secondary">
                    첨부 파일: {profile.fileName}
                  </p>
                )}
                <div className="bg-white p-3 rounded text-xs text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap font-sans border border-slate-200 leading-relaxed">
                  {profile.resumeText}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => {
                    setResumeTextTemp(profile.resumeText);
                    setShowResumeModal(true);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold text-xs rounded hover:bg-slate-50"
                >
                  이력서 수정
                </button>
                <button
                  onClick={() => setProfile((p) => ({ ...p, resumeText: '', fileName: undefined }))}
                  className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 font-semibold text-xs rounded hover:bg-red-100"
                >
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Experiences Section */}
        <div className="flex flex-col gap-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-outline-variant pb-3">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <span>Experiences & Projects</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                {profile.experiences.length + profile.projects.length}건
              </span>
            </h2>
            <Briefcase className="w-5 h-5 text-slate-400" />
          </div>

          {profile.experiences.length === 0 && profile.projects.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-lg bg-surface-container-low min-h-[280px] text-center gap-3">
              <Plus className="w-10 h-10 text-slate-400" />
              <p className="text-xs md:text-sm text-slate-600 max-w-xs leading-relaxed">
                아직 등록된 경험이 없습니다. 본인의 프로젝트, 인턴, 대외활동 또는 직무 관련 경험을 입력해주세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditingExpId(null);
                    setExpForm({ company: '', role: '', period: '', responsibilities: '', results: '', tools: '', evidenceScore: 4 });
                    setShowExpModal(true);
                  }}
                  className="px-4 py-2 bg-navy-900 text-white font-semibold text-xs rounded hover:opacity-90 transition-opacity"
                >
                  Add Experience
                </button>
                <button
                  onClick={() => {
                    setEditingProjId(null);
                    setProjForm({ name: '', role: '', period: '', achievements: '', tools: '', evidenceScore: 4 });
                    setShowProjModal(true);
                  }}
                  className="px-4 py-2 bg-surface-container-lowest border border-navy-900 text-navy-900 font-semibold text-xs rounded hover:bg-surface-variant transition-colors"
                >
                  Add Project
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1">
              {/* Experiences List */}
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="p-3.5 bg-surface-container-low border border-slate-200 rounded-lg flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">경력</span>
                      <h4 className="text-sm font-bold text-primary">{exp.company}</h4>
                      <p className="text-xs text-slate-600 font-medium">{exp.role} {exp.period && `(${exp.period})`}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEditExperience(exp)} className="p-1 text-slate-500 hover:text-navy-900">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteExperience(exp.id)} className="p-1 text-slate-500 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {exp.results && (
                    <p className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-100">
                      <strong>성과:</strong> {exp.results}
                    </p>
                  )}
                </div>
              ))}

              {/* Projects List */}
              {profile.projects.map((proj) => (
                <div key={proj.id} className="p-3.5 bg-surface-container-low border border-slate-200 rounded-lg flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">프로젝트</span>
                      <h4 className="text-sm font-bold text-primary">{proj.name}</h4>
                      <p className="text-xs text-slate-600 font-medium">{proj.role} {proj.period && `(${proj.period})`}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEditProject(proj)} className="p-1 text-slate-500 hover:text-navy-900">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteProject(proj.id)} className="p-1 text-slate-500 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {proj.achievements && (
                    <p className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-100">
                      <strong>달성 및 증거:</strong> {proj.achievements}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setEditingExpId(null);
                    setExpForm({ company: '', role: '', period: '', responsibilities: '', results: '', tools: '', evidenceScore: 4 });
                    setShowExpModal(true);
                  }}
                  className="flex-1 py-1.5 bg-navy-900 text-white font-semibold text-xs rounded hover:bg-navy-800"
                >
                  + Add Experience
                </button>
                <button
                  onClick={() => {
                    setEditingProjId(null);
                    setProjForm({ name: '', role: '', period: '', achievements: '', tools: '', evidenceScore: 4 });
                    setShowProjModal(true);
                  }}
                  className="flex-1 py-1.5 bg-white border border-navy-900 text-navy-900 font-semibold text-xs rounded hover:bg-surface-variant"
                >
                  + Add Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
        <p className="text-xs text-slate-500">
          {totalItemsCount > 0
            ? `총 ${totalItemsCount}개의 경력 및 프로젝트 항목이 입력되었습니다.`
            : '경험 또는 이력서를 등록한 후 다음 단계로 이동하세요.'}
        </p>
        <button
          onClick={() => setActiveTab('target-job')}
          className="bg-navy-900 text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-navy-800 transition-colors flex items-center gap-2"
        >
          <span>Target Job 설정하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 flex flex-col gap-4 shadow-xl">
            <h3 className="text-lg font-bold text-primary">이력서 텍스트 직접 입력</h3>
            <p className="text-xs text-slate-500">
              본인의 이력서, 자기소개서 또는 경력 기술서 내용을 자유롭게 붙여넣으세요.
            </p>
            <textarea
              rows={10}
              value={resumeTextTemp}
              onChange={(e) => setResumeTextTemp(e.target.value)}
              placeholder="예: [경력 요약] 3년차 프론트엔드 개발자로서..."
              className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-100"
              >
                취소
              </button>
              <button
                onClick={handleSaveResumeText}
                className="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded hover:bg-navy-800"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-primary">
              {editingExpId ? '경력 수정' : '새 경력 추가'}
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-primary">회사명 *</label>
                <input
                  type="text"
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  placeholder="예: 토스페이먼츠, 네이버"
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary">직무 / 담당 역할 *</label>
                <input
                  type="text"
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  placeholder="예: Senior Product Manager, 백엔드 엔지니어"
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary">재직 기간</label>
                <input
                  type="text"
                  value={expForm.period}
                  onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                  placeholder="예: 2022.03 - 재직 중"
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary">주요 담당 업무</label>
                <textarea
                  rows={3}
                  value={expForm.responsibilities}
                  onChange={(e) => setExpForm({ ...expForm, responsibilities: e.target.value })}
                  placeholder="담당했던 주요 업무를 기재해주세요."
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary">구체적 성과 및 증거 (Metrics)</label>
                <textarea
                  rows={3}
                  value={expForm.results}
                  onChange={(e) => setExpForm({ ...expForm, results: e.target.value })}
                  placeholder="정량적 수치 (예: 전환율 14.2% 향상, CS 문의 45% 절감)"
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setShowExpModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded"
              >
                취소
              </button>
              <button
                onClick={handleSaveExperience}
                className="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded hover:bg-navy-800"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-primary">
              {editingProjId ? '프로젝트 수정' : '새 프로젝트 추가'}
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-primary">프로젝트명 *</label>
                <input
                  type="text"
                  value={projForm.name}
                  onChange={(e) => setProjForm({ ...projForm, name: e.target.value })}
                  placeholder="예: 원클릭 빠른 결제 UX 개편"
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary">역할 *</label>
                <input
                  type="text"
                  value={projForm.role}
                  onChange={(e) => setProjForm({ ...projForm, role: e.target.value })}
                  placeholder="예: Lead PM (100% 기획)"
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary">진행 기간</label>
                <input
                  type="text"
                  value={projForm.period}
                  onChange={(e) => setProjForm({ ...projForm, period: e.target.value })}
                  placeholder="예: 2023.05 - 2023.11"
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary">주요 달성 성과 및 정량 증거</label>
                <textarea
                  rows={3}
                  value={projForm.achievements}
                  onChange={(e) => setProjForm({ ...projForm, achievements: e.target.value })}
                  placeholder="성과 지표 및 구현 내용을 적어주세요."
                  className="w-full border border-slate-300 rounded p-2 text-sm mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setShowProjModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded"
              >
                취소
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded hover:bg-navy-800"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
