import React from 'react';
import { 
  Truck, 
  Languages, 
  Sparkles, 
  Smartphone, 
  Settings, 
  User, 
  ShieldCheck, 
  Menu, 
  X,
  Volume2
} from 'lucide-react';

export function Navbar({
  lang,
  setLang,
  t,
  currentTab,
  setCurrentTab,
  driverMode,
  setDriverMode,
  onStartDemo,
  onOpenSettings,
  onOpenAuth,
  activeDoc,
  mobileMenuOpen,
  setMobileMenuOpen
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 flex items-center justify-center shadow-md text-white">
              <Truck className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  LorryMitra<span className="text-blue-600">.ai</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Kerala Logistics
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-ml line-clamp-1">
                {t.appSub}
              </p>
            </div>
          </div>

          {/* Active Load Status Pill (Desktop only) */}
          {activeDoc && (
            <div className="hidden lg:flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 transition-colors px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono font-semibold text-slate-900">{activeDoc.vehicleNumber}</span>
              <span className="text-slate-400">•</span>
              <span className="truncate max-w-[150px]">{activeDoc.pickupLocation.split(',')[0]} ➔ {activeDoc.deliveryLocation.split(',')[0]}</span>
            </div>
          )}

          {/* Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Hackathon Try Demo Button */}
            <button
              id="try-demo-btn"
              onClick={onStartDemo}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-sm hover:shadow transition-all transform active:scale-95"
              title="2-minute interactive demo for hackathon judges"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>{t.tryDemo}</span>
            </button>

            {/* Driver Mode Quick Toggle */}
            <button
              onClick={() => {
                const nextMode = !driverMode;
                setDriverMode(nextMode);
                if (nextMode) setCurrentTab('driver');
                else if (currentTab === 'driver') setCurrentTab('dashboard');
              }}
              className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all active:scale-95 ${
                driverMode 
                  ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 font-bold' 
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="font-ml">{driverMode ? '✓ ' + t.driverMode : t.driverMode}</span>
            </button>

            {/* Bilingual Switcher (Malayalam | English) */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setLang('ml')}
                className={`px-2.5 py-1 rounded-lg transition-all font-ml ${
                  lang === 'ml' 
                    ? 'bg-blue-700 text-white shadow-xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                മലയാളം
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'en' 
                    ? 'bg-blue-700 text-white shadow-xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
            </div>

            {/* Settings Trigger */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={t.navSettings}
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
