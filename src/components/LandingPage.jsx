import React from 'react';
import { 
  Truck, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Mic, 
  CheckCircle2, 
  Languages, 
  Clock, 
  ShieldCheck, 
  Volume2, 
  AlertTriangle,
  Play,
  Layers,
  PhoneCall
} from 'lucide-react';

export function LandingPage({ onEnterApp, onStartDemo, t, lang, setLang }) {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>കേരള ലോജിസ്റ്റിക്സിനായി AI സാങ്കേതികവിദ്യ</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 font-display tracking-tight leading-tight sm:leading-none">
            {lang === 'ml' ? (
              <>
                നിങ്ങളുടെ ലോജിസ്റ്റിക്സ് രേഖകൾ.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
                  ഇനി ലളിതമായ മലയാളത്തിൽ.
                </span>
              </>
            ) : (
              <>
                Your Logistics Documents.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
                  Now in Simple Malayalam.
                </span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 font-ml max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>{t.tryLorryMitra}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onStartDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-bold text-base shadow-sm transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{t.seeHowItWorks} (2-Min Demo)</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            100% Free for Independent Lorry Drivers & Small Fleet Owners in Kerala
          </p>
        </div>

        {/* Hero Interactive Document Transformation Visual (Section 13) */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="p-4 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-slate-400 font-mono ml-2">LorryMitra AI Transformation Engine</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                Live Preview
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Left: Complex English E-Way Bill */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
                <div className="text-amber-400 font-bold flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>GOVERNMENT OF INDIA • E-WAY BILL</span>
                  <span className="text-slate-500">FORM GST EWB-01</span>
                </div>
                <div className="space-y-1 text-[11px] pt-1">
                  <p><span className="text-slate-500">EWB No:</span> 2410-9823-4512</p>
                  <p><span className="text-slate-500">Supply Type:</span> Outward Taxable Goods</p>
                  <p><span className="text-slate-500">From:</span> ABC CERAMICS PVT LTD, KL, GSTIN: 32AABC...</p>
                  <p><span className="text-slate-500">To:</span> MALABAR TRADERS, MAVOOR RD, KOZHIKODE</p>
                  <p><span className="text-slate-500">Item:</span> Vitrified Floor Tiles HSN: 69072100</p>
                  <p><span className="text-slate-500">Veh Reg:</span> KL-05-AB-1234 (Entered Part-B)</p>
                  <p><span className="text-slate-500">Valid Till:</span> 08/10/2026 23:59:59 Hrs</p>
                </div>
                <div className="pt-2 text-[10px] text-slate-600 border-t border-slate-800/80 italic">
                  *Complicated jargon, small font, easy to misunderstand on the road.
                </div>
              </div>

              {/* Right: Transformed Simple Malayalam Summary with Audio */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 border border-blue-400/40 shadow-xl space-y-3 font-ml">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>ലളിതമായ മലയാളത്തിൽ:</span>
                  </div>
                  <span className="text-xs bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                    Ready to Drive
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-blue-200">ചരക്ക്:</span> 
                    <span className="font-bold text-white">500 കിലോ സിറാമിക് ടൈൽസ്</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-blue-200">പിക്കപ്പ്:</span> 
                    <span className="font-bold text-white">എറണാകുളം (കളമശ്ശേരി)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-blue-200">ഡെലിവറി:</span> 
                    <span className="font-bold text-emerald-300">കോഴിക്കോട് (മാവൂർ റോഡ്)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-blue-200">വാഹനം:</span> 
                    <span className="font-bold font-mono text-amber-300">KL-05-AB-1234</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-blue-200">സാധുത:</span> 
                    <span className="font-bold text-white">2026 ഒക്ടോബർ 8 വരെ</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <span className="text-blue-100">🎙️ ശബ്ദത്തിലൂടെ സംശയങ്ങൾ ചോദിക്കാം</span>
                  <button 
                    onClick={onEnterApp}
                    className="px-3 py-1 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    തുടങ്ങൂ →
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Problem Section (Section 14) */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
              {lang === 'ml' ? "ഭാഷ ലോജിസ്റ്റിക്സിന് ഒരു തടസ്സമാകരുത്." : "Logistics shouldn't depend on language."}
            </h2>
            <p className="text-slate-600 font-ml text-base sm:text-lg">
              കേരളത്തിലെ ആയിരക്കണക്കിന് ലോറി ഡ്രൈവർമാർ നിത്യേന നേരിടുന്ന യഥാർത്ഥ പ്രതിസന്ധി.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Complex Documents */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-shadow">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">
                {t.problem1Title}
              </h3>
              <p className="text-slate-600 font-ml text-sm leading-relaxed">
                {t.problem1Desc} ഇ-വേ ബിൽ കോഡുകൾ, നികുതി വകുപ്പ് നിബന്ധനകൾ എന്നിവ പലപ്പോഴും ആശയക്കുഴപ്പമുണ്ടാക്കുന്നു.
              </p>
            </div>

            {/* Card 2: Language Barrier */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                <Languages className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">
                {t.problem2Title}
              </h3>
              <p className="text-slate-600 font-ml text-sm leading-relaxed">
                {t.problem2Desc} റോഡിൽ വാഹനമോടിക്കുമ്പോൾ ഇംഗ്ലീഷ് രേഖകൾ വായിക്കുന്നതിനേക്കാൾ സ്വന്തം ഭാഷയിലെ ലളിതമായ വിശദീകരണമാണ് അവർക്ക് പ്രയോജനപ്പെടുന്നത്.
              </p>
            </div>

            {/* Card 3: Operational Delays */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-shadow">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">
                {t.problem3Title}
              </h3>
              <p className="text-slate-600 font-ml text-sm leading-relaxed">
                {t.problem3Desc} ഓഫീസ് ജീവനക്കാരെയും ഏജന്റുമാരെയും ഫോണിൽ വിളിച്ചു കാത്തുനിൽക്കുന്നത് മൂലം വാളയാറും മറ്റ് ചെക്ക്പോസ്റ്റുകളിലും മണിക്കൂറുകൾ പാഴാകുന്നു.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Solution Section (Section 15) */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
              {lang === 'ml' ? "ഒരു രേഖ. ഒരു ലളിതമായ വിവരണം." : "One document. One simple explanation."}
            </h2>
            <p className="text-slate-600 font-ml text-base sm:text-lg">
              ലളിതമായ 5 ഘട്ടങ്ങളിലൂടെ സുരക്ഷിതമായ ചരക്കുനീക്കം സാധ്യമാക്കുന്നു.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h4 className="font-bold text-slate-900 mb-1 font-ml">{t.step1Title}</h4>
              <p className="text-xs text-slate-500 font-ml">{t.step1Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h4 className="font-bold text-slate-900 mb-1 font-ml">{t.step2Title}</h4>
              <p className="text-xs text-slate-500 font-ml">{t.step2Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h4 className="font-bold text-slate-900 mb-1 font-ml">{t.step3Title}</h4>
              <p className="text-xs text-slate-500 font-ml">{t.step3Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base mb-4">
                4
              </div>
              <h4 className="font-bold text-slate-900 mb-1 font-ml">{t.step4Title}</h4>
              <p className="text-xs text-slate-500 font-ml">{t.step4Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base mb-4">
                5
              </div>
              <h4 className="font-bold text-slate-900 mb-1 font-ml">{t.step5Title}</h4>
              <p className="text-xs text-slate-500 font-ml">{t.step5Desc}</p>
            </div>

          </div>

        </div>
      </section>

      {/* Impact Section (Section 16) */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
              {t.impactHeading}
            </h2>
            <p className="text-slate-600 font-ml text-base sm:text-lg">
              സാങ്കേതികവിദ്യ സാധാരണ തൊഴിലാളികളിലേക്ക് എത്തുമ്പോഴാണ് യഥാർത്ഥ മാറ്റം ഉണ്ടാകുന്നത്.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 card-shadow text-left">
              <div className="text-3xl mb-3">🚛</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-ml">{t.impact1Title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-ml leading-relaxed">{t.impact1Desc}</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 card-shadow text-left">
              <div className="text-3xl mb-3">📄</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-ml">{t.impact2Title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-ml leading-relaxed">{t.impact2Desc}</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 card-shadow text-left">
              <div className="text-3xl mb-3">🗣️</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-ml">{t.impact3Title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-ml leading-relaxed">{t.impact3Desc}</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 card-shadow text-left">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-ml">{t.impact4Title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-ml leading-relaxed">{t.impact4Desc}</p>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={onEnterApp}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg transition-all active:scale-95 inline-flex items-center space-x-2"
            >
              <span>{t.tryLorryMitra}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-xs text-center border-t border-slate-800">
        <p>© 2026 LorryMitra AI — Kerala Logistics Assistant • Understand every document. Move every load.</p>
        <p className="mt-1 text-slate-500 font-ml">നിങ്ങളുടെ ലോജിസ്റ്റിക്സ് സഹായി • All sample data shown for hackathon demonstration purposes.</p>
      </footer>

    </div>
  );
}
