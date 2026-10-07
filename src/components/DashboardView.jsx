import React from 'react';
import { 
  Truck, 
  MapPin, 
  ArrowDown, 
  Package, 
  Clock, 
  Mic, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  Navigation, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { MalayalamSummary } from './MalayalamSummary';
import { ExtractionResult } from './ExtractionResult';
import { WarningCard } from './WarningCard';
import { RouteMap } from './RouteMap';

export function DashboardView({
  activeDoc,
  allDocs,
  onSelectDoc,
  setCurrentTab,
  setDriverMode,
  t,
  lang,
  setLang,
  onStartDemo
}) {
  if (!activeDoc) return null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              LorryMitra AI
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 font-mono">
              v2.4
            </span>
          </div>
          <p className="text-base text-slate-600 font-ml mt-0.5">
            {t.appSub} — {t.taglineMl}
          </p>
        </div>

        {/* Quick Vehicle Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 font-ml">വാഹനം മാറ്റുക:</span>
          <select 
            value={activeDoc.id}
            onChange={(e) => {
              const selected = allDocs.find(d => d.id === e.target.value);
              if (selected) onSelectDoc(selected);
            }}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {allDocs.map((d) => (
              <option key={d.id} value={d.id}>
                {d.vehicleNumber} ({d.documentType.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Critical Expiry / Missing Warning Banner if applicable */}
      {activeDoc.validityStatus !== 'VALID' && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950 font-ml">
                {activeDoc.validityStatus === 'EXPIRING' 
                  ? "ശ്രദ്ധിക്കുക: ഈ E-Way Bill ഏതാനും മണിക്കൂറുകൾക്കുള്ളിൽ expire ചെയ്യും!" 
                  : "മുന്നറിയിപ്പ്: ഈ രേഖ കാലഹരണപ്പെട്ടു!"}
              </h4>
              <p className="text-xs text-amber-900 font-ml">
                ചെക്ക്പോസ്റ്റ് പരിശോധനയിൽ പിഴ ഒഴിവാക്കാൻ സാധുത പരിശോധിക്കുക.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentTab('alerts')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs font-ml transition-all shrink-0 ml-3"
          >
            പരിശോധിക്കുക
          </button>
        </div>
      )}

      {/* 2. TODAY'S LOAD (Large Summary Card requested in Section 2) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow relative overflow-hidden">
        
        {/* Header inside card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 font-mono">
                {t.todaysLoad} (ഇന്നത്തെ ലോഡ്)
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                {activeDoc.vehicleNumber}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setDriverMode(true);
                setCurrentTab('driver');
              }}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm border border-amber-300 transition-all active:scale-95 font-ml"
            >
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>{t.driverMode}</span>
            </button>
          </div>
        </div>

        {/* Core Route & Load Stack (Exact fields from Section 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          
          {/* 📍 Pickup */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1 font-ml">
              <MapPin className="w-4 h-4" />
              <span>{t.pickup}</span>
            </div>
            <h4 className="text-lg font-extrabold text-slate-900 font-ml">
              {activeDoc.pickupLocation}
            </h4>
            <p className="text-xs text-slate-500 font-ml truncate mt-0.5">
              {activeDoc.consignor}
            </p>
          </div>

          {/* 📍 Delivery */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1 font-ml">
              <MapPin className="w-4 h-4" />
              <span>{t.delivery}</span>
            </div>
            <h4 className="text-lg font-extrabold text-slate-900 font-ml">
              {activeDoc.deliveryLocation}
            </h4>
            <p className="text-xs text-slate-500 font-ml truncate mt-0.5">
              {activeDoc.consignee}
            </p>
          </div>

          {/* 📦 Cargo */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1 font-ml">
              <Package className="w-4 h-4" />
              <span>{t.cargo}</span>
            </div>
            <h4 className="text-lg font-extrabold text-slate-900 font-ml">
              {activeDoc.cargoDescription.split('(')[0]}
            </h4>
            <p className="text-xs font-bold text-indigo-600 font-ml mt-0.5">
              {activeDoc.weight} ({activeDoc.quantity})
            </p>
          </div>

          {/* ⏰ E-Way Bill Validity */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1 font-ml">
              <Clock className="w-4 h-4" />
              <span>{t.ewayBillValidity}</span>
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 font-ml">
              {activeDoc.validityPeriod}
            </h4>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
              activeDoc.validityStatus === 'VALID' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {activeDoc.validityStatus === 'VALID' ? 'VALID' : 'CHECK EXPIRY'}
            </span>
          </div>

        </div>

        {/* Prominent Button: 🎙️ Ask LorryMitra (Section 2 Requirement) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setCurrentTab('ask')}
            className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white font-extrabold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-3 font-ml"
          >
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950">
              <Mic className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold">{t.askLorryMitra}</div>
              <div className="text-xs text-blue-200 font-normal">ഈ ലോഡിനെക്കുറിച്ചുള്ള ഏത് സംശയവും മലയാളത്തിൽ ചോദിക്കാം</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('documents')}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center space-x-2 font-ml"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <span>രേഖയുടെ വിശദാംശങ്ങൾ (View Bill)</span>
          </button>
        </div>

      </div>

      {/* 4. INTERACTIVE OPENSTREETMAP ROUTE MAP (Source to Destination) */}
      <RouteMap 
        doc={activeDoc} 
        t={t} 
        lang={lang} 
        height="h-[380px]" 
      />

      {/* 5. SIMPLE MALAYALAM EXPLANATION EMBEDDED IN DASHBOARD */}
      <MalayalamSummary 
        doc={activeDoc} 
        t={t} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400 font-ml block mb-1">{t.statsTotalDocs}</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold font-mono text-slate-900">12</span>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">✓ All verified</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400 font-ml block mb-1">{t.statsActiveLoads}</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold font-mono text-slate-900">3</span>
            <Truck className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">In transit</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400 font-ml block mb-1">{t.statsAlerts}</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold font-mono text-amber-600">{activeDoc.warnings?.length || 1}</span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">Check validity</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400 font-ml block mb-1">{t.statsCleared}</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold font-mono text-emerald-600">100%</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Walayar & Feroke</span>
        </div>
      </div>

    </div>
  );
}
