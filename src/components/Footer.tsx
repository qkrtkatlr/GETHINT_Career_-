import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface-container-lowest border-t border-outline-variant mt-auto">
      <div className="flex flex-col gap-1 text-center md:text-left">
        <span className="text-lg font-black text-primary">Career Map</span>
        <p className="text-sm text-on-surface-variant">
          © 2024 Career Map Analysis. Professional Grade Utility.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-on-surface-variant">
        <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-secondary underline transition-colors">
          Privacy Policy
        </a>
        <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-secondary underline transition-colors">
          Terms of Service
        </a>
        <a href="#methodology" onClick={(e) => e.preventDefault()} className="hover:text-secondary underline transition-colors">
          Methodology
        </a>
      </div>
    </footer>
  );
};
