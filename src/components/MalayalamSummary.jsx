import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Languages, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  MapPin, 
  Package, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { speakText, stopSpeech } from '../services/aiService';

export function MalayalamSummary({ doc, t, lang, setLang }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!doc) return null;

  const summary = doc.malayalamSummary;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const speechContent = summary?.audioSpeechText || 
        `ചരക്ക്: ${summary?.cargoMl}. എടുക്കേണ്ട സ്ഥലം: ${summary?.pickupMl}. എത്തിക്കേണ്ട സ്ഥലം: ${summary?.dropMl}. വാഹനം: ${summary?.vehicleMl}. ബിൽ സാധുത: ${summary?.validityMl}. ${summary?.attentionMl}`;
      
      setIsPlayingAudio(true);
      speakText(
        speechContent,
        'ml-IN',
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Bilingual Toggle & Audio Speaker Button */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI ലളിത സംഗ്രഹം • Simple Explanation</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-ml tracking-tight text-white">
            {lang === 'ml' ? summary.headline : "Key Information in this Document"}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200/80 font-ml mt-1">
            {t.simpleMalayalamDesc}
          </p>
        </div>

        {/* Audio & Language Switcher Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Read Aloud Malayalam Button */}
          <button
            onClick={handleToggleAudio}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-md ${
              isPlayingAudio 
                ? 'bg-rose-600 text-white animate-pulse' 
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-5 h-5" />
                <span className="font-ml">{t.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                <span className="font-ml">{t.listenAudio}</span>
              </>
            )}
          </button>

          {/* Quick Language Toggle */}
          <div className="inline-flex rounded-xl bg-white/10 p-1 border border-white/15 text-xs font-semibold">
            <button
              onClick={() => setLang('ml')}
              className={`px-3 py-1.5 rounded-lg transition-all font-ml ${
                lang === 'ml' ? 'bg-white text-slate-900 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              മലയാളം
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                lang === 'en' ? 'bg-white text-slate-900 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

        </div>
      </div>

      {/* Visual Audio Wave indicator if playing */}
      {isPlayingAudio && (
        <div className="relative z-10 mt-4 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center space-x-2">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="font-ml ml-2 font-medium">മലയാളത്തിൽ വായിക്കുന്നു... (Speaking in Malayalam)</span>
          </div>
          <button 
            onClick={handleToggleAudio} 
            className="text-white hover:underline text-xs"
          >
            Stop
          </button>
        </div>
      )}

      {/* Simplified Driver Points (Exact structure requested in Section 5) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        
        {/* Cargo */}
        <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10">
          <div className="flex items-center space-x-2 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1 font-ml">
            <Package className="w-4 h-4 text-blue-400" />
            <span>{t.itemLabel}</span>
          </div>
          <p className="text-lg font-bold text-white font-ml">
            {lang === 'ml' ? summary.cargoMl : `${doc.cargoDescription} (${doc.weight})`}
          </p>
        </div>

        {/* Pickup */}
        <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10">
          <div className="flex items-center space-x-2 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1 font-ml">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>{t.pickupLabel}</span>
          </div>
          <p className="text-lg font-bold text-white font-ml">
            {lang === 'ml' ? summary.pickupMl : doc.pickupDetailedAddress || doc.pickupLocation}
          </p>
        </div>

        {/* Delivery / Drop */}
        <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10">
          <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1 font-ml">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{t.dropLabel}</span>
          </div>
          <p className="text-lg font-bold text-white font-ml">
            {lang === 'ml' ? summary.dropMl : doc.deliveryDetailedAddress || doc.deliveryLocation}
          </p>
        </div>

        {/* Vehicle */}
        <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1 font-ml">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>{t.vehicleLabel}</span>
          </div>
          <p className="text-lg font-mono font-bold text-white">
            {lang === 'ml' ? summary.vehicleMl : doc.vehicleNumber}
          </p>
        </div>

        {/* Bill Validity */}
        <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 md:col-span-2">
          <div className="flex items-center space-x-2 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-1 font-ml">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>{t.validityLabel}</span>
          </div>
          <p className="text-lg font-bold text-white font-ml">
            {lang === 'ml' ? summary.validityMl : doc.validityPeriod}
          </p>
        </div>

        {/* Attention / Instructions */}
        <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 md:col-span-2">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1 font-ml">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{t.attentionLabel}</span>
          </div>
          <p className="text-base font-semibold text-amber-100 font-ml leading-relaxed">
            {lang === 'ml' ? summary.attentionMl : doc.deliveryInstructions || "Deliver goods safely before the validity period ends."}
          </p>
        </div>

      </div>

    </div>
  );
}
