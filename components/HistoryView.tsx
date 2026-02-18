
import React from 'react';
import { ScanHistory } from '../types';

interface HistoryViewProps {
  history: ScanHistory[];
  onBack: () => void;
  onSelectResult: (res: ScanHistory) => void;
  onDelete: (id: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onBack, onSelectResult, onDelete }) => {
  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8 sticky top-0 bg-slate-50 py-2 z-10">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm border border-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-slate-800">Scan History</h1>
      </header>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">Your scan history is empty</p>
          <p className="text-slate-400 text-sm mt-1">Diagnostics you perform will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl p-3 flex items-center gap-4 shadow-sm border border-slate-100 relative group overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.diagnosis.plantName} 
                className="w-20 h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0 cursor-pointer"
                onClick={() => onSelectResult(item)}
              />
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelectResult(item)}>
                <h4 className="font-bold text-slate-800 truncate">{item.diagnosis.plantName}</h4>
                <p className="text-xs text-slate-400 mb-2">{new Date(item.timestamp).toLocaleDateString()} · {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${item.diagnosis.status === 'Healthy' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {item.diagnosis.status}
                  </span>
                  <span className="text-xs text-slate-500 truncate">{item.diagnosis.condition}</span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
