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
  Sparkles,
  Building2,
  Briefcase,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { signIn, signUp } from '../services/authService';

export function AuthModal({ isOpen, onClose, onLoginSuccess, t, lang }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('driver@lorrymitra.ai');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Biju Kumar');
  const [phoneNumber, setPhoneNumber] = useState('+91 94471 23456');
  const [companyName, setCompanyName] = useState('Kairali Cargo Logistics');
  const [role, setRole] = useState('driver'); // 'driver' | 'lorry_owner' | 'fleet_operator' | 'contractor'
  
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);

    try {
      if (authMode === 'register') {
        const { data, error } = await signUp({
          email,
          password,
          name: fullName,
          phone: phoneNumber,
          role,
          company_name: companyName
        });

        if (error) {
          setAuthError(error.message || 'രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു (Registration failed)');
          setLoading(false);
          return;
        }

        onLoginSuccess({
          id: data?.user?.id || 'user-' + Date.now(),
          name: fullName || 'Driver',
          email,
          phone: phoneNumber,
          role,
          company_name: companyName
        });
      } else {
        const { data, error } = await signIn({
          email,
          password
        });

        if (error) {
          // If login fails (e.g., account doesn't exist yet on clean Supabase), provide helpful guidance or guest fallback
          setAuthError(error.message || 'ലോഗിൻ വിവരങ്ങൾ ശരിയല്ല (Invalid email or password)');
          setLoading(false);
          return;
        }

        const loggedUser = data?.user;
        onLoginSuccess({
          id: loggedUser?.id || 'user-' + Date.now(),
          name: loggedUser?.user_metadata?.name || fullName || 'Driver',
          email: loggedUser?.email || email,
          phone: loggedUser?.user_metadata?.phone || phoneNumber,
          role: loggedUser?.user_metadata?.role || role,
          company_name: loggedUser?.user_metadata?.company_name || companyName
        });
      }

      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      setAuthError(err.message || 'Authentication error occurred');
    }
  };

  const handleGuestLogin = () => {
    onLoginSuccess({
      id: 'guest-driver-001',
      name: "Biju Kumar (Guest Driver)",
      email: "guest.driver@lorrymitra.ai",
      phone: "+91 94471 23456",
      role: "driver",
      company_name: "Kerala Goods Transport"
    });
    onClose();
  };

  const roleOptions = [
    { id: 'driver', labelMl: 'ഡ്രൈവർ (Driver)', labelEn: 'Driver' },
    { id: 'lorry_owner', labelMl: 'ലോറി ഉടമ (Lorry Owner)', labelEn: 'Lorry Owner' },
    { id: 'fleet_operator', labelMl: 'ഫ്ലീറ്റ് ഓപ്പറേറ്റർ (Fleet Operator)', labelEn: 'Fleet Operator' },
    { id: 'contractor', labelMl: 'ട്രാൻസ്‌പോർട്ട് കോൺട്രാക്ടർ', labelEn: 'Transport Contractor' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md mb-2">
            <Truck className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-extrabold font-display">
            LorryMitra<span className="text-blue-300">.ai</span>
          </h3>
          <p className="text-xs text-blue-200 font-ml mt-0.5">
            നിങ്ങളുടെ ലോജിസ്റ്റിക്സ് സഹായി • Supabase Auth
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 text-xs font-bold text-center shrink-0">
          <button
            onClick={() => { setAuthMode('login'); setAuthError(null); }}
            className={`flex-1 py-3 transition-colors ${
              authMode === 'login' 
                ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold bg-blue-50/40' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ലോഗിൻ (Login)
          </button>
          <button
            onClick={() => { setAuthMode('register'); setAuthError(null); }}
            className={`flex-1 py-3 transition-colors ${
              authMode === 'register' 
                ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold bg-blue-50/40' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            രജിസ്റ്റർ (Sign Up)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5 overflow-y-auto flex-1">
          
          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-ml flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {authMode === 'register' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">പൂർണ്ണമായ പേര് (Full Name)</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Biju Kumar"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">റോളുകൾ (Role)</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {roleOptions.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`p-2 rounded-lg text-[11px] font-bold text-left transition-all ${
                        role === r.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {lang === 'ml' ? r.labelMl : r.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">സ്ഥാപനം (Company / Fleet Name)</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Kairali Cargo Logistics"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">മൊബൈൽ നമ്പർ (Mobile Number)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 94471 23456"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">ഇമെയിൽ വിലാസം (Email)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@lorrymitra.ai"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">പാസ്‌വേഡ് (Password)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
            {authMode === 'register' && (
              <span className="text-[10px] text-slate-400 mt-0.5 block">Minimum 6 characters</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>പരിശോധിക്കുന്നു...</span>
              </>
            ) : (
              <span>{authMode === 'login' ? "തുടങ്ങുക (Login to Dashboard)" : "അക്കൗണ്ട് ഉണ്ടാക്കുക (Create Account)"}</span>
            )}
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
