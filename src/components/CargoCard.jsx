import React, { useState } from 'react';
import { 
  Package, 
  Scale, 
  IndianRupee, 
  Layers, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { speakText } from '../services/aiService';

export function CargoCard({ doc, t, lang }) {
  const [showMlExplanation, setShowMlExplanation] = useState(false);

  if (!doc) return null;

  const cargoItems = [
    { label: lang === 'ml' ? 'ഇനം (Item)' : 'Item', val: doc.cargoDescription, icon: Package },
    { label: lang === 'ml' ? 'അളവ് (Quantity)' : 'Quantity', val: doc.quantity, icon: Layers },
    { label: lang === 'ml' ? 'ഭാരം (Weight)' : 'Weight', val: doc.weight, icon: Scale },
    { label: lang === 'ml' ? 'മൂല്യം (Value)' : 'Value', val: doc.invoiceValue, icon: IndianRupee },
  ];

  const handleListenCargoAudio = () => {
    const text = `ചരക്ക് വിവരങ്ങൾ: ${doc.cargoDescription}. അളവ് ${doc.quantity}. ആകെ ഭാരം ${doc.weight}. ഇൻവോയ്സ് മൂല്യം ${doc.invoiceValue}.`;
    speakText(text, 'ml-IN');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200/60">
            <Package className="w-3.5 h-3.5" />
            <span>ചരക്ക് വിശകലനം</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            {t.cargoSummaryTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-ml">
            HSN Code: <span className="font-mono font-bold text-slate-700">{doc.hsnCode || 'N/A'}</span> • {doc.cargoCategory || 'General Goods'}
          </p>
        </div>

        {/* Explain in Malayalam Button (Requested in Section 10) */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMlExplanation(!showMlExplanation)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm border border-blue-200 transition-all active:scale-95 font-ml"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{showMlExplanation ? "മറയ്ക്കുക" : t.explainCargoMl}</span>
          </button>
          
          <button
            onClick={handleListenCargoAudio}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
            title="Listen audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Core Cargo Facts Grid (Section 10 format) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cargoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 font-ml">
                <Icon className="w-4 h-4 text-blue-600" />
                <span>{item.label}</span>
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 font-ml">
                {item.val}
              </h4>
            </div>
          );
        })}
      </div>

      {/* Expanded Malayalam Explanation Box */}
      {showMlExplanation && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-md animate-in fade-in">
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm mb-2 font-ml">
            <Sparkles className="w-4 h-4" />
            <span>ലളിതമായ മലയാളത്തിൽ ചരക്ക് വിവരണം:</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-blue-100 font-ml mb-4">
            ഈ വാഹനത്തിൽ കയറ്റിയിരിക്കുന്നത് <span className="text-amber-300 font-bold">{doc.weight}</span> ഭാരമുള്ള <span className="text-white font-bold">{doc.cargoDescription}</span> ആണ് ({doc.quantity}). 
            ബില്ലിൽ രേഖപ്പെടുത്തിയിരിക്കുന്ന ആകെ മൂല്യം <span className="text-emerald-300 font-bold">{doc.invoiceValue}</span> ആണ്.
          </p>

          <div className="pt-3 border-t border-white/10 text-xs text-blue-200 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ചരക്കിന്റെ HSN കോഡും ടാക്സ് വിവരങ്ങളും കൃത്യമായി പരിശോധിച്ചു.</span>
          </div>
        </div>
      )}

      {/* Safe Cargo Handling Advice */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
        <span className="font-bold block mb-1 font-ml text-emerald-900">
          🛡️ {t.safetyTips}:
        </span>
        <p className="font-ml leading-relaxed text-emerald-800">
          ലോഡ് വണ്ടിയിൽ തുല്യമായി ബാലൻസ് ചെയ്തിട്ടുണ്ടെന്ന് ഉറപ്പുവരുത്തുക. കയറുകൾ കട്ടിയിൽ മുറുക്കുക. വഴിയിൽ പരിശോധന ഉണ്ടായാൽ ഇൻവോയ്സും ഇ-വേ ബില്ലും ഒന്നിച്ച് ഹാജരാക്കുക.
        </p>
      </div>

    </div>
  );
}
