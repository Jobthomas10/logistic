import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  ArrowDown, 
  Package, 
  Clock, 
  Mic, 
  Volume2, 
  VolumeX,
  Sparkles, 
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Navigation
} from 'lucide-react';
import { askDocumentAI, speakText, stopSpeech, startVoiceRecognition, logQueryToSupabase } from '../services/aiService';

export function DriverMode({ doc, t, lang, onExitDriverMode, user }) {
  const [isListening, setIsListening] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  if (!doc) return null;

  // Preset quick driver questions from Section 6
  const presetQuestions = [
    { textMl: "ഈ ലോഡ് എവിടെ കൊണ്ടുപോകണം?", textEn: "Where should this load be delivered?" },
    { textMl: "ചരക്ക് എന്താണ്?", textEn: "What is the cargo?" },
    { textMl: "എത്ര കിലോയാണ്?", textEn: "How many kilograms is this?" },
    { textMl: "ബിൽ എപ്പോൾ expire ആകും?", textEn: "When will the bill expire?" },
    { textMl: "ആർക്കാണ് delivery കൊടുക്കേണ്ടത്?", textEn: "Who is the delivery recipient?" },
  ];

  const handleAskQuestion = async (questionText) => {
    setCurrentQuery(questionText);
    setIsThinking(true);
    setAiResponse('');
    stopSpeech();

    const response = await askDocumentAI(questionText, doc);
    setIsThinking(false);
    setAiResponse(response);

    if (doc?.id) {
      logQueryToSupabase(doc.id, questionText, response, lang, user?.id);
    }

    // Automatically speak the response in Malayalam out loud
    setIsSpeakingAudio(true);
    speakText(
      response,
      'ml-IN',
      () => setIsSpeakingAudio(true),
      () => setIsSpeakingAudio(false)
    );
  };

  const handleToggleVoiceMic = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setAiResponse('');
    setCurrentQuery('');
    stopSpeech();

    // Trigger voice recognition
    startVoiceRecognition({
      lang: lang === 'ml' ? 'ml-IN' : 'en-IN',
      onResult: (transcript) => {
        setIsListening(false);
        handleAskQuestion(transcript);
      },
      onError: (err) => {
        setIsListening(false);
        console.warn("Speech recognition error / fallback:", err);
        // Fallback demo question if microphone access blocked
        handleAskQuestion("ഈ ലോഡ് എവിടെ കൊണ്ടുപോകണം?");
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between max-w-2xl mx-auto px-2 sm:px-4 py-4">
      
      {/* Top Bar for Driver */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <button
          onClick={onExitDriverMode}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-ml">ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക</span>
        </button>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-xs font-ml">
          <Truck className="w-4 h-4" />
          <span>ഡ്രൈവർ മോഡ് സജീവമാണ്</span>
        </div>
      </div>

      {/* High-Contrast Large Load Summary Card (Section 6 layout) */}
      <div className="my-4 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 relative overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 font-mono">
                TODAY'S LOAD
              </span>
              <p className="text-sm font-mono font-bold text-slate-300">
                {doc.vehicleNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {doc.isDemoPrimary && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 font-mono">
                Demo Data
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
              {doc.documentType.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Route Stack */}
        <div className="space-y-4">
          
          {/* Pickup */}
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 mt-1 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                📍 PICKUP (എടുക്കേണ്ട സ്ഥലം)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-ml">
                {doc.pickupLocation.split(',')[0]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-ml line-clamp-1">
                {doc.consignor}
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="pl-5 text-amber-400">
            <ArrowDown className="w-6 h-6 animate-bounce-gentle" />
          </div>

          {/* Drop */}
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mt-1 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                📍 DROP (എത്തിക്കേണ്ട സ്ഥലം)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-ml">
                {doc.deliveryLocation.split(',')[0]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-ml line-clamp-1">
                {doc.consignee}
              </p>
            </div>
          </div>

          {/* Cargo */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block font-mono">📦 CARGO (ചരക്ക്)</span>
                <p className="text-xl sm:text-2xl font-bold text-white font-ml">
                  {doc.cargoDescription.split('(')[0]} — {doc.weight}
                </p>
              </div>
            </div>
          </div>

          {/* Validity */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-sky-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block font-mono">⏰ DOCUMENT VALIDITY (സാധുത)</span>
                <p className="text-base sm:text-lg font-bold text-sky-300 font-ml">
                  {doc.validityPeriod}
                </p>
              </div>
            </div>
            {doc.validityStatus === 'VALID' ? (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500 text-slate-950 font-mono">
                VALID
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 font-mono">
                CHECK EXPIRY
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Massive Microphone Driver Button (Section 6 & 7) */}
      <div className="my-3 text-center">
        <button
          onClick={handleToggleVoiceMic}
          className={`w-full py-5 px-6 rounded-3xl font-extrabold text-xl sm:text-2xl transition-all shadow-xl flex items-center justify-center space-x-4 active:scale-95 border-2 ${
            isListening 
              ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-300 animate-pulse' 
              : 'bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white border-blue-500/50'
          }`}
        >
          <div className={`p-3 rounded-full ${isListening ? 'bg-white text-rose-600' : 'bg-amber-400 text-slate-950'}`}>
            <Mic className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="text-left font-ml">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isListening ? "🎙️ കേൾക്കുന്നു..." : "🎙️ ചോദിക്കൂ"}
            </div>
            <div className="text-xs sm:text-sm font-normal text-blue-200">
              {isListening ? "സംസാരിക്കൂ... AI കേൾക്കുന്നു" : "“ഈ ലോഡിനെക്കുറിച്ച് എന്തും ചോദിക്കാം”"}
            </div>
          </div>
        </button>
      </div>

      {/* Spoken Response Container */}
      {(isThinking || aiResponse || isListening) && (
        <div className="p-5 rounded-2xl bg-white border-2 border-blue-300 shadow-lg mb-4 animate-in fade-in">
          {isThinking && (
            <div className="flex items-center space-x-3 text-blue-700 font-ml text-base">
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span>മറുപടി കണ്ടെത്തുന്നു...</span>
            </div>
          )}

          {currentQuery && !isThinking && (
            <p className="text-xs text-slate-500 font-medium mb-1 font-ml">
              നിങ്ങൾ ചോദിച്ചത്: <span className="text-slate-800 font-bold">"{currentQuery}"</span>
            </p>
          )}

          {aiResponse && (
            <div className="mt-2">
              <div className="flex items-start justify-between">
                <p className="text-lg sm:text-xl font-extrabold text-blue-900 font-ml leading-relaxed">
                  {aiResponse}
                </p>
                <button
                  onClick={() => {
                    if (isSpeakingAudio) {
                      stopSpeech();
                      setIsSpeakingAudio(false);
                    } else {
                      speakText(aiResponse, 'ml-IN', () => setIsSpeakingAudio(true), () => setIsSpeakingAudio(false));
                    }
                  }}
                  className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 ml-3 shrink-0"
                  title="Speak"
                >
                  {isSpeakingAudio ? <VolumeX className="w-5 h-5 text-rose-600" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preset Driver Quick Tap Question Pills */}
      <div className="mt-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-ml">
          {t.quickQuestions}
        </p>
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(q.textMl)}
              className="py-2.5 px-3.5 rounded-xl text-sm font-bold bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-800 border border-slate-200/90 hover:border-blue-300 transition-all active:scale-95 text-left font-ml shadow-2xs"
            >
              💬 {lang === 'ml' ? q.textMl : q.textEn}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
