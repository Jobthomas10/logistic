import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Phone, 
  Mail, 
  Truck, 
  X, 
  ArrowRight, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export function AuthModal({ isOpen, onClose, onLoginSuccess, t, lang }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [phoneNumber, setPhoneNumber] = useState('9447123456');
  const [password, setPassword] = useState('password');
  const [fullName, setFullName] = useState('Biju Kumar');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: fullName || "Biju Kumar",
      phone: phoneNumber || "9447123456",
      role: "driver"
    });
    onClose();
  };

  const handleGuestLogin = () => {
    onLoginSuccess({
      name: "Biju Kumar (Guest Driver)",
      phone: "+91 94471 23456",
      role: "driver"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md mb-3">
            <Truck className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold font-display">
            LorryMitra<span className="text-blue-300">.ai</span>
          </h3>
          <p className="text-xs text-blue-200 font-ml mt-0.5">
            നിങ്ങളുടെ ലോജിസ്റ്റിക്സ് സഹായി
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 text-xs font-bold text-center">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 transition-colors ${
              authMode === 'login' 
                ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold bg-blue-50/40' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ലോഗിൻ (Login)
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-3 transition-colors ${
              authMode === 'register' 
                ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold bg-blue-50/40' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            രജിസ്റ്റർ (Register)
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {authMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">പൂർണ്ണമായ പേര് (Full Name)</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Biju Kumar"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">മൊബൈൽ നമ്പർ (Mobile Number)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="94471 23456"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">പാസ്‌വേഡ് (Password)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            {authMode === 'login' ? "തുടങ്ങുക (Login to Dashboard)" : "അക്കൗണ്ട് ഉണ്ടാക്കുക (Create Account)"}
          </button>

          {/* Quick Demo Instant Access Button for Hackathon */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>⚡ അതിഥി പ്രവേശനം (Instant Guest Demo Access)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
