
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-slate-200 h-24 flex items-start justify-around px-4 pt-3 z-50 pb-[env(safe-area-inset-bottom,20px)]">
      <button 
        onClick={() => onNavigate(AppView.DASHBOARD)}
        className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 ${currentView === AppView.DASHBOARD ? 'text-emerald-600' : 'text-slate-400'}`}
      >
        <div className={`p-1 rounded-xl ${currentView === AppView.DASHBOARD ? 'bg-emerald-50' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        <span className="text-[10px] font-bold tracking-wide uppercase">Home</span>
      </button>

      <button 
        onClick={() => onNavigate(App