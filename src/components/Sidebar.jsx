import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Smartphone, 
  Mic, 
  Package, 
  MapPin, 
  AlertTriangle, 
  History, 
  Settings,
  Sparkles,
  Info,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User
} from 'lucide-react';

export function Sidebar({ currentTab, setCurrentTab, t, activeDoc, onStartDemo, onOpenSettings, user, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'documents', label: t.navDocuments, icon: FileText },
    { id: 'driver', label: t.navDriverMode, icon: Smartphone, highlight: true },
    { id: 'ask', label: t.navAskAI, icon: Mic },
    { id: 'cargo', label: t.navCargo, icon: Package },
    { id: 'deliveries', label: t.navDeliveries, icon: MapPin },
    { id: 'alerts', label: t.navAlerts, icon: AlertTriangle, count: activeDoc?.warnings?.length },
    { id: 'history', label: t.navHistory, icon: History },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 min-h-[calc(100vh-5rem)]">
      <div>
        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            മെനു / Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : item.highlight
                    ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 font-semibold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                  <span className="truncate font-ml">{item.label}</span>
                </div>
                {item.count ? (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Hackathon Demo Banner */}
        <div className="mt-6 p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
          <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Judge Demo Walkthrough</span>
          </div>
          <p className="text-xs text-amber-900 mb-2.5 font-ml">
            2 മിനിറ്റ് കൊണ്ട് LorryMitra-യുടെ എല്ലാ സൗകര്യങ്ങളും അനുഭവിക്കാം.
          </p>
          <button
            onClick={onStartDemo}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-xs"
          >
            {t.tryDemo}
          </button>
        </div>
      </div>

      {/* Active Document Status Indicator */}
      {activeDoc && (
        <div className="pt-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-500">സജീവ ബിൽ (Active Bill)</span>
              {activeDoc.validityStatus === 'VALID' ? (
                <span className="inline-flex items-center text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Valid
                </span>
              ) : activeDoc.validityStatus === 'EXPIRING' ? (
                <span className="inline-flex items-center text-xs font-semibold text-amber-700">
                  <Clock className="w-3.5 h-3.5 mr-1 animate-pulse" /> Expiring
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-semibold text-rose-700">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" /> Expired
                </span>
              )}
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 truncate">{activeDoc.vehicleNumber}</p>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{activeDoc.documentType}</p>
          </div>

          {user && (
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate">
                <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 font-ml truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 capitalize truncate">{user.role || 'Driver'}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title={t.logout || "Logout"}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={onOpenSettings}
            className="w-full mt-2 flex items-center justify-center space-x-2 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t.navSettings}</span>
          </button>
        </div>
      )}
    </aside>
  );
}
