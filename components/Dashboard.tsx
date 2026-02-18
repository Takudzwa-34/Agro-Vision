
import React from 'react';
import { ScanHistory } from '../types';

interface DashboardProps {
  history: ScanHistory[];
  onScanStart: () => void;
  onViewHistory: () => void;
  onSelectResult: (res: ScanHistory) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ history, onScanStart, onViewHistory, onSelectResult }) => {
  return (
    <div className="p-6">
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-slate-800">AgroVision <span className="text-emerald-600">AI</span></h1>
        <p className="text-slate-500 text-sm mt-1">Intelligent plant health monitoring</p>
      </header>

      {/* Hero Action Card */}
      <div className="bg-emerald-600 rounded-3xl p-6 text-white mb-8 shadow-lg shadow-emerald-200 relative overflow-hidden group">
        <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-emerald-500 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-semibold mb-2">Check Plant Health</h2>
          <p className="text-emerald-50 text-sm mb-6 max-w-[200px]">Scan your plant to detect pests and diseases instantly.</p>
          <button 
            onClick={onScanStart}
            className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.172-1.172A1 1 0 009.828 3H6.172a1 1 0 00-.707.293L4.293 4.707A1 1 0 013.586 5H4zM12 11a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
            Scan Now
          </button>
        </div>
      </div>

      {/* Stats/Metrics Row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-medium uppercase mb-1">Total Scans</p>
          <p className="text-2xl font-bold text-slate-800">{history.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-medium uppercase mb-1">Alerts</p>
          <p className="text-2xl font-bold text-red-500">{history.filter(h => h.diagnosis.status === 'Infected').length}</p>
        </div>
      </div>

      {/* Recent History */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Recent Scans</h3>
        <button onClick={onViewHistory} className="text-emerald-600 text-sm font-semibold">See All</button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-slate-500 text-sm">No scans yet. Start by taking a photo of your plant.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.slice(0, 3).map(item => (
            <div 
              key={item.id} 
              onClick={() => onSelectResult(item)}
              className="bg-white rounded-2xl p-3 flex items-center gap-4 shadow-sm border border-slate-100 active:scale-[0.98] transition-all cursor-pointer"
            >
              <img src={item.image} alt={item.diagnosis.plantName} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 truncate">{item.diagnosis.plantName}</h4>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.diagnosis.status === 'Healthy' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-xs text-slate-500 font-medium truncate">{item.diagnosis.condition}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium">{new Date(item.timestamp).toLocaleDateString()}</p>
                <div className="text-emerald-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
