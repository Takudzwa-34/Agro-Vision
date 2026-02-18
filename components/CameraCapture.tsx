
import React, { useRef, useState, useEffect } from 'react';
import { analyzePlant } from '../services/geminiService';
import { PlantDiagnosis } from '../types';

interface CameraCaptureProps {
  onBack: () => void;
  onComplete: (image: string, diagnosis: PlantDiagnosis) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onBack, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [permissionError, setPermissionError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setPermissionError(false);
    setErrorMessage(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1080 },
          height: { ideal: 1920 }
        },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCapturing(true);
    } catch (err: any) {
      console.error("Camera error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionError(true);
        setErrorMessage("Camera access was denied. Please check your browser settings and grant permission.");
      } else {
        setErrorMessage("Unable to access camera. Your device may not support this feature or it's being used by another app.");
      }
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCapturing(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    // Haptic feedback
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(30);
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Match dimensions to video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      stopCamera();
      handleAnalyze(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        stopCamera();
        handleAnalyze(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (imageData: string) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const diagnosis = await analyzePlant(imageData);
      onComplete(imageData, diagnosis);
    } catch (err) {
      console.error("Analysis failed:", err);
      setErrorMessage("AI analysis failed. Please ensure the plant is well-lit and clearly visible.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-white relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-30 bg-gradient-to-b from-black/70 to-transparent">
        <button onClick={onBack} className="p-3 bg-white/10 backdrop-blur-md rounded-full active:bg-white/20 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-white drop-shadow-md">Scan Plant</span>
        <div className="w-12"></div>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-900">
        {isCapturing ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover"
            />
            {/* Professional Viewfinder Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
               <div className="w-[75%] aspect-[3/4] border-2 border-emerald-400/30 rounded-3xl relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-emerald-400/40 text-[10px] uppercase font-bold tracking-[0.2em]">Focus Area</div>
                  </div>
               </div>
               <p className="text-white/60 text-xs mt-6 px-10 text-center font-medium">Place the leaf or affected area within the frame</p>
            </div>
          </>
        ) : isAnalyzing ? (
          <div className="text-center p-8 max-w-xs">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-emerald-500/10 rounded-full flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                 </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">Analyzing Plant...</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Checking for pests, leaf spots, and nutrient deficiencies using AgroVision AI.</p>
          </div>
        ) : (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Camera Access Required</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              {errorMessage || "We need your camera to diagnose plant health. You can also upload a photo from your gallery."}
            </p>
            
            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              {permissionError && (
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-emerald-600 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-emerald-900/20"
                >
                  Refresh Page
                </button>
              )}
              {!permissionError && (
                <button 
                  onClick={startCamera}
                  className="bg-emerald-600 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-emerald-900/20"
                >
                  Grant Access
                </button>
              )}
              
              <label className="bg-white/10 text-white py-4 rounded-2xl font-bold text-center cursor-pointer active:bg-white/20 transition-all border border-white/10">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                Upload Photo
              </label>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      <div className="p-8 pb-10 bg-black/90 backdrop-blur-xl border-t border-white/5">
        {!isAnalyzing && (
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {/* Gallery Picker */}
            <label className="cursor-pointer group">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <div className="p-4 bg-white/5 rounded-2xl group-active:scale-90 transition-all border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </label>

            {/* Shutter Button */}
            <button 
              disabled={!isCapturing}
              onClick={capturePhoto}
              className={`w-24 h-24 rounded-full border-4 ${isCapturing ? 'border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)]' : 'border-slate-800'} flex items-center justify-center p-1 active:scale-90 transition-all disabled:opacity-50`}
            >
              <div className={`w-full h-full rounded-full ${isCapturing ? 'bg-white' : 'bg-slate-800'} transition-colors`}></div>
            </button>

            {/* Placeholder for balance */}
            <div className="w-14"></div>
          </div>
        )}
        
        {isAnalyzing && (
          <div className="flex flex-col items-center gap-4 py-4">
             <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 animate-loading-bar"></div>
             </div>
             <style>{`
               @keyframes loading-bar {
                 0% { width: 0%; transform: translateX(-100%); }
                 50% { width: 50%; }
                 100% { width: 0%; transform: translateX(200%); }
               }
               .animate-loading-bar {
                 animation: loading-bar 2s ease-in-out infinite;
               }
             `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
