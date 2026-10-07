import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Key, 
  Volume2, 
  User, 
  ShieldCheck, 
  X, 
  Check, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { speakText } from '../services/aiService';

export function SettingsModal({ isOpen, onClose, t, lang }) {
  const [geminiKey, setGeminiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [userRole, setUserRole] = useState('driver'); // 'driver' | 'fleet_owner' | 'contractor'

  useEffect(() => {
    const saved = localStorage.getItem('lorry_gemini_key') || '';
    setGeminiKey(saved);
    const role = localStorage.getItem('lorry_user_role') || 'driver';
    setUserRole(role);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('lorry_gemini_key', geminiKey.trim());
    localStorage.setItem('lorry_user_role', userRole);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestVoice = () => {
    speakText("നമസ്കാരം, ലോറിമിത്ര AI നിങ്ങളുടെ ശബ്ദ സഹായിയാണ്. നിങ്ങൾ തയ്യാറാണോ?", 'ml-IN');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">
                {t.navSettings} (Settings)
              </h3>
              <p className="text-xs text-slate-400">
                AI API & User Profile Configuration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          
          {/* Gemini API Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Key className="w-4 h-4 text-blue-600" />
                <span>Google Gemini API Key (Optional)</span>
              </label>
              <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Built-in engine works offline
              </span>
            </div>
            
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy... (Saved only in your browser local storage)"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-mono text-slate-900"
            />
            <p className="text-[11px] text-slate-500 font-ml">
              നിങ്ങൾക്ക് സ്വന്തമായി Gemini API കീ ഉണ്ടെങ്കിൽ ഇവിടെ നൽകാം. അല്ലെങ്കിൽ ആപ്പിലെ ഇന്റലിജന്റ് ഓഫ്‌ലൈൻ എഞ്ചിൻ തനിയെ പ്രവർത്തിക്കും.
            </p>
          </div>

          {/* User Role Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
              <User className="w-4 h-4 text-blue-600" />
              <span>ഉപയോക്താവിന്റെ തരം (User Role)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'driver', label: 'ഡ്രൈവർ (Driver)' },
                { id: 'fleet_owner', label: 'ഉടമ (Owner)' },
                { id: 'contractor', label: 'ഏജന്റ് (Agent)' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setUserRole(r.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all font-ml ${
                    userRole === r.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Output Test */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-blue-900 font-ml">ശബ്ദ സഹായി പരിശോധന (Audio Test)</h4>
              <p className="text-[11px] text-blue-700 font-ml">മലയാളത്തിലുള്ള ഉച്ചാരണം ശരിയാണോ എന്ന് പരിശോധിക്കുക</p>
            </div>
            <button
              onClick={handleTestVoice}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1 shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Test Audio</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : null}
            <span>{savedSuccess ? "Saved!" : "Save Settings"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
