
import React from 'react';
import { ScanHistory } from '../types';

interface ResultViewProps {
  result: ScanHistory;
  onBack: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onBack }) => {
  const { diagnosis } = result;
  const statusColor = diagnosis.status === 'Healthy' ? 'bg-emerald-500' : diagnosis.status === 'Warning' ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="bg-white min-h-full">
      {/* Hero Header */}
      <div className="relative h-72">
        <img src={result.image} alt="Diagnosis Result" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded-full text-white active:scale-90 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-1">
            <span className={`${statusColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>
              {diagnosis.status}
            </span>
            <span className="text-white/80 text-xs font-medium">Confidence: {Math.round(diagnosis.confidence * 100)}%</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{diagnosis.plantName}</h1>
          <p className="text-white/70 text-sm italic">{diagnosis.scientificName}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 -mt-4 bg-white rounded-t-3xl relative z-10 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2">{diagnosis.condition}</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            {diagnosis.summary}
          </p>
        </div>

        {/* Symptoms Section */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Observed Symptoms
          </h3>
          <div className="flex flex-wrap gap-2">
            {diagnosis.symptoms.map((s, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Treatment Tabs/Sections */}
        <div className="space-y-6">
           <section className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
             <h3 className="text-emerald-800 font-bold mb-3 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
               </svg>
               Organic Treatments
             </h3>
             <ul className="space-y-2">
               {diagnosis.recommendations.organic.map((rec, i) => (
                 <li key={i} className="text-sm text-emerald-900 flex items-start gap-2">
                   <span className="text-emerald-500 mt-1">•</span>
                   {rec}
                 </li>
               ))}
             </ul>
           </section>

           <section className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
             <h3 className="text-slate-800 font-bold mb-3 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-1.33-1.154-2.152a13.313 13.313 0 01-.401-1.345z" clipRule="evenodd" />
               </svg>
               Chemical Options
             </h3>
             <ul className="space-y-2">
               {diagnosis.recommendations.chemical.map((rec, i) => (
                 <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                   <span className="text-slate-400 mt-1">•</span>
                   {rec}
                 </li>
               ))}
             </ul>
           </section>

           <section className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
             <h3 className="text-blue-800 font-bold mb-3 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zM10 5a1 1 0 011 1v3a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
               </svg>
               Prevention
             </h3>
             <ul className="space-y-2">
               {diagnosis.recommendations.prevention.map((rec, i) => (
                 <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                   <span className="text-blue-400 mt-1">•</span>
                   {rec}
                 </li>
               ))}
             </ul>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
