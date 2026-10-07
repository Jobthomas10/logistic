import React from 'react';
import { LayoutDashboard, FileText, Smartphone, Mic } from 'lucide-react';

export function BottomNav({ currentTab, setCurrentTab, t }) {
  const tabs = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'documents', label: t.navDocuments, icon: FileText },
    { id: 'driver', label: t.navDriverMode, icon: Smartphone, primary: true },
    { id: 'ask', label: t.navAskAI, icon: Mic },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          if (tab.primary) {
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className="relative -top-3 flex flex-col items-center justify-center focus:outline-none"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isActive 
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-200' 
                    : 'bg-blue-600 text-white'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold font-ml mt-1 text-slate-800">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium font-ml">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
