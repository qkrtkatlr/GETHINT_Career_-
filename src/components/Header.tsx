import React from 'react';
import { MainTab } from '../types';
import { User, LogOut, Menu, X, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  onLoadSample: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onLoadSample }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-4 md:px-12 h-16 bg-surface border-b border-outline-variant">
      <div className="flex items-center gap-6 md:gap-8">
        <button
          onClick={() => setActiveTab('landing')}
          className="font-bold text-xl md:text-2xl text-primary tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span>Career Map</span>
        </button>

        <nav className="hidden md:flex gap-6 h-full items-center">
          <button
            onClick={() => setActiveTab('my-career')}
            className={`font-medium text-base pb-1 transition-all ${
              activeTab === 'my-career'
                ? 'text-secondary border-b-2 border-secondary font-semibold'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            My Career
          </button>
          <button
            onClick={() => setActiveTab('target-job')}
            className={`font-medium text-base pb-1 transition-all ${
              activeTab === 'target-job'
                ? 'text-secondary border-b-2 border-secondary font-semibold'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            Job Analysis
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`font-medium text-base pb-1 transition-all ${
              activeTab === 'dashboard'
                ? 'text-secondary border-b-2 border-secondary font-semibold'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            Dashboard
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onLoadSample}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-secondary border border-secondary/30 rounded-full hover:bg-secondary/10 transition-colors"
          title="샘플 데이터 로드"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>샘플 리포트</span>
        </button>

        <button
          className="p-2 text-primary hover:text-secondary transition-colors rounded-full hover:bg-surface-variant"
          title="내 계정"
        >
          <User className="w-5 h-5" />
        </button>
        <button
          className="p-2 text-primary hover:text-secondary transition-colors rounded-full hover:bg-surface-variant"
          title="로그아웃"
        >
          <LogOut className="w-5 h-5" />
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-primary hover:text-secondary rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-surface-container-lowest border-b border-outline-variant p-4 flex flex-col gap-3 md:hidden shadow-lg z-50">
          <button
            onClick={() => { setActiveTab('landing'); setMobileMenuOpen(false); }}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'landing' ? 'bg-surface-variant text-secondary font-semibold' : 'text-on-surface'
            }`}
          >
            홈 (소개)
          </button>
          <button
            onClick={() => { setActiveTab('my-career'); setMobileMenuOpen(false); }}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'my-career' ? 'bg-surface-variant text-secondary font-semibold' : 'text-on-surface'
            }`}
          >
            My Career (1단계)
          </button>
          <button
            onClick={() => { setActiveTab('target-job'); setMobileMenuOpen(false); }}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'target-job' ? 'bg-surface-variant text-secondary font-semibold' : 'text-on-surface'
            }`}
          >
            Job Analysis (2단계)
          </button>
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'dashboard' ? 'bg-surface-variant text-secondary font-semibold' : 'text-on-surface'
            }`}
          >
            Dashboard (3단계)
          </button>
          <button
            onClick={() => { onLoadSample(); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-secondary bg-secondary/10 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>샘플 리포트 즉시 보기</span>
          </button>
        </div>
      )}
    </header>
  );
};
