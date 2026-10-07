import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Camera, 
  FileCheck, 
  Sparkles, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { sampleDocuments } from '../data/sampleDocuments';

export function DocumentUploader({ onDocumentProcessed, t, lang }) {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2, 3, 4
  const [selectedFileName, setSelectedFileName] = useState(null);
  
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const processingSteps = [
    { labelMl: t.processingStep1, labelEn: "Reading document..." },
    { labelMl: t.processingStep2, labelEn: "Extracting information..." },
    { labelMl: t.processingStep3, labelEn: "Understanding logistics details..." },
    { labelMl: t.processingStep4, labelEn: "Preparing Malayalam explanation..." },
  ];

  const handleSimulateProcessing = (docToLoad, fileName = "eway_bill_kl05.pdf") => {
    setSelectedFileName(fileName);
    setProcessing(true);
    setCurrentStep(1);

    // Step 1: Reading document
    setTimeout(() => {
      setCurrentStep(2);
      // Step 2: Extracting info
      setTimeout(() => {
        setCurrentStep(3);
        // Step 3: Understanding logistics details
        setTimeout(() => {
          setCurrentStep(4);
          // Step 4: Preparing Malayalam explanation
          setTimeout(() => {
            setProcessing(false);
            setCurrentStep(0);
            onDocumentProcessed(docToLoad);
          }, 600);
        }, 650);
      }, 650);
    }, 650);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSimulateProcessing(sampleDocuments[0], file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleSimulateProcessing(sampleDocuments[0], file.name);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Document Intelligence</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-2">
          {t.uploadTitle}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-ml">
          {t.uploadSub}
        </p>
      </div>

      {/* Main Upload Dropzone */}
      {!processing ? (
        <>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/50 scale-[1.01]' 
                : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-slate-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".pdf,.png,.jpg,.jpeg" 
              className="hidden" 
            />
            <input 
              type="file" 
              ref={cameraInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
            />

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce-gentle" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-1 font-ml">
              {t.dragDropText}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
              PDF, JPG, PNG (Max 15MB) • {t.supportedDocsNote}
            </p>

            {/* Mobile / Direct Camera Button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cameraInputRef.current?.click();
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="font-ml">{t.cameraButton}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm shadow-xs transition-all active:scale-95"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Browse Files</span>
              </button>
            </div>
          </div>

          {/* Quick-test Realistic Sample Kerala Documents Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-ml">
                {t.trySampleDocs}
              </p>
              <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                ⚡ Instant Judge Test
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sampleDocuments.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => handleSimulateProcessing(doc, `${doc.id}.pdf`)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/40 text-left transition-all card-hover group"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      doc.validityStatus === 'VALID' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : doc.validityStatus === 'EXPIRING'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {idx === 0 ? t.sample1Name : idx === 1 ? t.sample2Name : t.sample3Name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {doc.vehicleNumber}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Animated AI Processing State */
        <div className="py-12 px-4 max-w-lg mx-auto text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping opacity-75"></div>
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-xl">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">
            AI രേഖ വിശകലനം ചെയ്യുന്നു...
          </h3>
          <p className="text-xs font-mono text-slate-500 mb-8">
            Analyzing {selectedFileName || "document"}
          </p>

          {/* Stepper Progress */}
          <div className="space-y-3.5 text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {processingSteps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;

              return (
                <div key={idx} className="flex items-center space-x-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepNumber}
                  </div>
                  <span className={`text-sm font-ml ${
                    isCurrent 
                      ? 'font-bold text-blue-900' 
                      : isCompleted 
                      ? 'text-slate-800 font-medium' 
                      : 'text-slate-400'
                  }`}>
                    {lang === 'ml' ? step.labelMl : step.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
