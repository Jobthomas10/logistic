import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  FileText, 
  Languages, 
  Smartphone, 
  Mic, 
  AlertTriangle, 
  Package, 
  Heart,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakText } from '../services/aiService';

export function DemoTourModal({ isOpen, onClose, onSelectDoc, setCurrentTab, setDriverMode, sampleDoc }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. സ്വാഗതം (Welcome Judges!)",
      subtitle: "LorryMitra AI — 2-Minute Hackathon Demonstration",
      desc: "LorryMitra AI is a bilingual Malayalam-English logistics assistant designed specifically for Kerala's lorry drivers and fleet operators. It turns complex English E-Way bills and challans into crystal-clear Malayalam explanations with voice interaction.",
      icon: Sparkles,
      actionText: "ലോഡ് കാണുക (View E-Way Bill)",
      onAction: () => {
        onSelectDoc(sampleDoc);
        setCurrentTab('dashboard');
      }
    },
    {
      title: "2. ഒറിജിനൽ ഇ-വേ ബിൽ (Sample E-Way Bill)",
      subtitle: "KL-05-AB-1234 • Tiles from Kochi to Kozhikode",
      desc: "Here is a standard GST E-Way Bill (EWB-01). Dense English terms, legal codes, and fine print often cause confusion for drivers on the highway.",
      icon: FileText,
      actionText: "AI വിശകലനം കാണുക (See AI Extraction)",
      onAction: () => {
        setCurrentTab('documents');
      }
    },
    {
      title: "3. ലളിതമായ മലയാളം (Simple Malayalam Explanation)",
      subtitle: "Not just translation — simplified for drivers",
      desc: "Notice the 'ഈ രേഖയിൽ പ്രധാനപ്പെട്ട കാര്യങ്ങൾ' section. It extracts exactly what the driver needs: ചരക്ക് (500kg tiles), എടുക്കേണ്ട സ്ഥലം (എറണാകുളം), എത്തിക്കേണ്ട സ്ഥലം (കോഴിക്കോട്), ബിൽ സാധുത (2026 ഒക്ടോബർ 8 വരെ). Drivers can also click 'Listen Audio' to hear it spoken aloud!",
      icon: Languages,
      actionText: "ഡ്രൈവർ മോഡിലേക്ക് പോകുക (Open Driver Mode)",
      onAction: () => {
        setDriverMode(true);
        setCurrentTab('driver');
      }
    },
    {
      title: "4. ഡ്രൈവർ മോഡും ശബ്ദ സഹായിയും (Driver Voice Assistant)",
      subtitle: "Hands-free voice in Malayalam inside lorry cabin",
      desc: "Driver Mode features high contrast and huge buttons. The driver taps '🎙️ ചോദിക്കൂ' and asks: 'ഈ ലോഡ് എവിടെ കൊണ്ടുപോകണം?'. LorryMitra immediately replies in spoken Malayalam: 'ഈ ലോഡ് എറണാകുളത്ത് നിന്ന് കോഴിക്കോട് എത്തിക്കണം.'",
      icon: Mic,
      actionText: "മുന്നറിയിപ്പുകൾ പരിശോധിക്കുക (Check Warnings)",
      onAction: () => {
        setDriverMode(false);
        setCurrentTab('alerts');
        speakText("ഈ ലോഡ് എറണാകുളത്ത് നിന്ന് കോഴിക്കോട് എത്തിക്കണം.", 'ml-IN');
      }
    },
    {
      title: "5. സ്മാർട്ട് മുന്നറിയിപ്പ് (Smart Warning & Compliance)",
      subtitle: "Zero penalties at Kerala RTO checkposts",
      desc: "LorryMitra automatically validates the bill: 🟢 Valid (36 hours left), checks for missing vehicle numbers, and warns about fragile tile cargo before the driver leaves the godown.",
      icon: AlertTriangle,
      actionText: "ചരക്ക് വിവരങ്ങൾ കാണുക (Cargo Summary)",
      onAction: () => {
        setCurrentTab('cargo');
      }
    },
    {
      title: "6. സാമൂഹിക സ്വാധീനം (Social & Industry Impact)",
      subtitle: "Empowering Kerala's independent lorry community",
      desc: "By removing the language barrier, LorryMitra AI empowers lorry owners and drivers, prevents checkpost fines, eliminates broker dependency, and speeds up Kerala's transport supply chain.",
      icon: Heart,
      actionText: "ഡെമോ പൂർത്തിയാക്കുക (Finish Demo)",
      onAction: () => {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        setCurrentTab('dashboard');
        onClose();
      }
    }
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  const handleNext = () => {
    if (current.onAction) {
      current.onAction();
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prev = steps[currentStep - 1];
      if (prev.onAction) prev.onAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 shadow-md">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase font-mono">
                Step {currentStep + 1} of {steps.length} • 2-Min Demo Flow
              </span>
              <h3 className="text-xl font-extrabold font-display">
                {current.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 transition-all ${
                idx <= currentStep ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <h4 className="text-lg font-bold text-slate-900">
            {current.subtitle}
          </h4>
          <p className="text-sm sm:text-base text-slate-600 font-ml leading-relaxed">
            {current.desc}
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center space-x-2 font-ml"
          >
            <span>{current.actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
