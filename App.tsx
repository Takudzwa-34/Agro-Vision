
import React, { useState, useEffect } from 'react';
import { AppView, ScanHistory, PlantDiagnosis } from './types';
import Dashboard from './components/Dashboard';
import CameraCapture from './components/CameraCapture';
import ResultView from './components/ResultView';
import HistoryView from './components/HistoryView';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [currentResult, setCurrentResult] = useState<ScanHistory | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('agro_vision_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('agro_vision_history', JSON.stringify(history));
  }, [history]);

  const handleScanComplete = (image: string, diagnosis: PlantDiagnosis) => {
    const newScan: ScanHistory = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      image,
      diagnosis
    };
    setHistory(prev => [newScan, ...prev]);
    setCurrentResult(newScan);
    setCurrentView(AppView.RESULT);
    
    // Haptic feedback if supported
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200">
      <main className="flex-1 overflow-y-auto pb-24">
        {currentView === AppView.DASHBOARD && (
          <Dashboard 
            history={history} 
            onScanStart={() => setCurrentView(AppView.SCAN)}
            onViewHistory={() => setCurrentView(AppView.HISTORY)}
            onSelectResult={(res) => {
              setCurrentResult(res);
              setCurrentView(AppView.RESULT);
            }}
          />
        )}
        
        {currentView === AppView.SCAN && (
          <CameraCapture 
            onBack={() => setCurrentView(AppView.DASHBOARD)}
            onComplete={handleScanComplete}
          />
        )}

        {currentView === AppView.RESULT && currentResult && (
          <ResultView 
            result={currentResult}
            onBack={() => setCurrentView(AppView.DASHBOARD)}
          />
        )}

        {currentView === AppView.HISTORY && (
          <HistoryView 
            history={history}
            onBack={() => setCurrentView(AppView.DASHBOARD)}
            onSelectResult={(res) => {
              setCurrentResult(res);
              setCurrentView(AppView.RESULT);
            }}
            onDelete={deleteHistoryItem}
          />
        )}
      </main>

      <Navigation 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />
    </div>
  );
};

export default App;
