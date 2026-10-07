import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import { translations } from './data/translations';
import { sampleDocuments } from './data/sampleDocuments';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { DocumentUploader } from './components/DocumentUploader';
import { ExtractionResult } from './components/ExtractionResult';
import { MalayalamSummary } from './components/MalayalamSummary';
import { DriverMode } from './components/DriverMode';
import { ChatInterface } from './components/ChatInterface';
import { WarningCard } from './components/WarningCard';
import { CargoCard } from './components/CargoCard';
import { DeliveryCard } from './components/DeliveryCard';
import { DocumentHistory } from './components/DocumentHistory';
import { LandingPage } from './components/LandingPage';
import { DemoTourModal } from './components/DemoTourModal';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { 
  getCurrentUser, 
  getUserProfile, 
  signOut, 
  onAuthStateChange 
} from './services/authService';
import { 
  fetchUserDocuments, 
  saveDocument 
} from './services/documentService';
import { 
  FileText, 
  Sparkles, 
  Truck, 
  HelpCircle, 
  ArrowLeft,
  X,
  Languages,
  CheckCircle2
} from 'lucide-react';

export function App() {
  // Default language: Malayalam ('ml') as requested in Section 24
  const [lang, setLang] = useState('ml');
  const t = translations[lang] || translations.ml;

  // Documents state: Initialized with sample documents (Demo Data)
  const [documents, setDocuments] = useState(sampleDocuments);
  const [activeDoc, setActiveDoc] = useState(sampleDocuments[0]);

  // View state: 'dashboard' | 'documents' | 'driver' | 'ask' | 'cargo' | 'deliveries' | 'alerts' | 'history' | 'landing'
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [driverMode, setDriverMode] = useState(false);

  // Modals state
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authenticated User state
  const [user, setUser] = useState({
    id: "guest-driver-001",
    name: "Biju Kumar",
    email: "biju.driver@lorrymitra.ai",
    phone: "+91 94471 23456",
    role: "driver",
    company_name: "Kerala Goods Transport"
  });

  // Supabase Auth Listener & User Data Fetching
  useEffect(() => {
    async function initAuth() {
      const authUser = await getCurrentUser();
      if (authUser) {
        const profile = await getUserProfile(authUser.id);
        const userData = {
          id: authUser.id,
          name: profile?.name || authUser.user_metadata?.name || 'Driver',
          email: authUser.email,
          phone: profile?.phone || authUser.user_metadata?.phone || '',
          role: profile?.role || authUser.user_metadata?.role || 'driver',
          company_name: profile?.company_name || authUser.user_metadata?.company_name || ''
        };
        setUser(userData);
        loadUserDocuments(authUser.id);
      }
    }

    initAuth();

    const subscription = onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await getUserProfile(session.user.id);
        const userData = {
          id: session.user.id,
          name: profile?.name || session.user.user_metadata?.name || 'Driver',
          email: session.user.email,
          phone: profile?.phone || session.user.user_metadata?.phone || '',
          role: profile?.role || session.user.user_metadata?.role || 'driver',
          company_name: profile?.company_name || session.user.user_metadata?.company_name || ''
        };
        setUser(userData);
        loadUserDocuments(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setDocuments(sampleDocuments);
        setActiveDoc(sampleDocuments[0]);
      }
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  // Fetch documents belonging to user from Supabase
  const loadUserDocuments = async (userId) => {
    if (!userId) return;
    try {
      const userDocs = await fetchUserDocuments(userId);
      if (userDocs && userDocs.length > 0) {
        // User has real documents! Merge or display user documents
        setDocuments(userDocs);
        setActiveDoc(userDocs[0]);
      } else {
        // Retain demo documents as fallback
        setDocuments(sampleDocuments);
        setActiveDoc(sampleDocuments[0]);
      }
    } catch (e) {
      console.warn('Load user documents notice:', e);
    }
  };

  // Handle new document processed from upload
  const handleDocumentProcessed = async (newOrLoadedDoc) => {
    setActiveDoc(newOrLoadedDoc);
    
    // Prepend to current list
    setDocuments(prev => {
      const filtered = prev.filter(d => d.id !== newOrLoadedDoc.id);
      return [newOrLoadedDoc, ...filtered];
    });

    // Save to Supabase
    if (user?.id) {
      saveDocument(newOrLoadedDoc, user.id);
    }

    // Switch to documents tab to view extracted results
    setCurrentTab('documents');
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setDocuments(sampleDocuments);
    setActiveDoc(sampleDocuments[0]);
    setCurrentTab('dashboard');
  };

  const handleStartDemo = () => {
    setActiveDoc(sampleDocuments[0]);
    setIsDemoOpen(true);
  };

  // If in Driver Mode, render the dedicated Driver Mode view
  if (driverMode || currentTab === 'driver') {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <DriverMode 
          doc={activeDoc} 
          t={t} 
          lang={lang} 
          user={user}
          onExitDriverMode={() => {
            setDriverMode(false);
            setCurrentTab('dashboard');
          }} 
        />
        <BottomNav 
          currentTab="driver" 
          setCurrentTab={(tab) => {
            if (tab !== 'driver') setDriverMode(false);
            setCurrentTab(tab);
          }} 
          t={t} 
        />
        <DemoTourModal
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
          onSelectDoc={(doc) => setActiveDoc(doc)}
          setCurrentTab={setCurrentTab}
          setDriverMode={setDriverMode}
          sampleDoc={sampleDocuments[0]}
        />
      </div>
    );
  }

  // If in Landing page view
  if (currentTab === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar 
          lang={lang}
          setLang={setLang}
          t={t}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          driverMode={driverMode}
          setDriverMode={setDriverMode}
          onStartDemo={handleStartDemo}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          activeDoc={activeDoc}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          user={user}
          onLogout={handleLogout}
        />
        <LandingPage 
          onEnterApp={() => setCurrentTab('dashboard')} 
          onStartDemo={handleStartDemo}
          t={t}
          lang={lang}
          setLang={setLang}
        />
        <DemoTourModal
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
          onSelectDoc={(doc) => setActiveDoc(doc)}
          setCurrentTab={setCurrentTab}
          setDriverMode={setDriverMode}
          sampleDoc={sampleDocuments[0]}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          t={t}
          lang={lang}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(u) => {
            setUser(u);
            if (u?.id) loadUserDocuments(u.id);
          }}
          t={t}
          lang={lang}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar 
        lang={lang}
        setLang={setLang}
        t={t}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        driverMode={driverMode}
        setDriverMode={setDriverMode}
        onStartDemo={handleStartDemo}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeDoc={activeDoc}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        onLogout={handleLogout}
      />

      {/* Mobile Drawer Navigation if toggled */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-4/5 max-w-xs h-full bg-white p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900 font-display">LorryMitra AI</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1">
                {[
                  { id: 'dashboard', label: t.navDashboard },
                  { id: 'documents', label: t.navDocuments },
                  { id: 'driver', label: t.navDriverMode },
                  { id: 'ask', label: t.navAskAI },
                  { id: 'cargo', label: t.navCargo },
                  { id: 'deliveries', label: t.navDeliveries },
                  { id: 'alerts', label: t.navAlerts },
                  { id: 'history', label: t.navHistory },
                  { id: 'landing', label: t.navHome },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'driver') setDriverMode(true);
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-ml font-medium ${
                      currentTab === item.id ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleStartDemo();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-xs"
              >
                {t.tryDemo} (2-Min Demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace: Desktop Sidebar + Dynamic Tab Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-20 lg:pb-8">
        
        {/* Desktop Sidebar (Section 23) */}
        <div className="hidden lg:block shrink-0">
          <Sidebar 
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            t={t}
            activeDoc={activeDoc}
            onStartDemo={handleStartDemo}
            onOpenSettings={() => setIsSettingsOpen(true)}
            user={user}
            onLogout={handleLogout}
          />
        </div>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* 1. Dashboard View */}
          {currentTab === 'dashboard' && (
            <DashboardView 
              activeDoc={activeDoc}
              allDocs={documents}
              onSelectDoc={(doc) => setActiveDoc(doc)}
              setCurrentTab={setCurrentTab}
              setDriverMode={setDriverMode}
              t={t}
              lang={lang}
              setLang={setLang}
              onStartDemo={handleStartDemo}
            />
          )}

          {/* 2. Documents & Upload View (Section 3 & 4) */}
          {currentTab === 'documents' && (
            <div className="space-y-8">
              <DocumentUploader 
                onDocumentProcessed={handleDocumentProcessed}
                t={t}
                lang={lang}
                user={user}
              />

              {activeDoc && (
                <div className="space-y-8 pt-4">
                  <MalayalamSummary 
                    doc={activeDoc}
                    t={t}
                    lang={lang}
                    setLang={setLang}
                  />

                  <ExtractionResult 
                    doc={activeDoc}
                    t={t}
                    lang={lang}
                  />
                </div>
              )}
            </div>
          )}

          {/* 3. Ask LorryMitra Grounded Chat & Voice View (Section 7 & 8) */}
          {currentTab === 'ask' && (
            <div className="space-y-6">
              <ChatInterface 
                doc={activeDoc}
                t={t}
                lang={lang}
                user={user}
              />
            </div>
          )}

          {/* 4. Cargo Summary View (Section 10) */}
          {currentTab === 'cargo' && (
            <div className="space-y-6">
              <CargoCard 
                doc={activeDoc}
                t={t}
                lang={lang}
              />
            </div>
          )}

          {/* 5. Delivery Information View (Section 11) */}
          {currentTab === 'deliveries' && (
            <div className="space-y-6">
              <DeliveryCard 
                doc={activeDoc}
                t={t}
                lang={lang}
              />
            </div>
          )}

          {/* 6. Smart Warning System View (Section 9) */}
          {currentTab === 'alerts' && (
            <div className="space-y-6">
              <WarningCard 
                doc={activeDoc}
                t={t}
                lang={lang}
              />
            </div>
          )}

          {/* 7. Document History View (Section 12) */}
          {currentTab === 'history' && (
            <div className="space-y-6">
              <DocumentHistory 
                documents={documents}
                activeDoc={activeDoc}
                onSelectDoc={(doc) => {
                  setActiveDoc(doc);
                  setCurrentTab('dashboard');
                }}
                t={t}
                lang={lang}
              />
            </div>
          )}

        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Section 23) */}
      <BottomNav 
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'driver') setDriverMode(true);
          setCurrentTab(tab);
        }}
        t={t}
      />

      {/* 2-Minute Hackathon Demo Guided Tour Modal */}
      <DemoTourModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onSelectDoc={(doc) => setActiveDoc(doc)}
        setCurrentTab={setCurrentTab}
        setDriverMode={setDriverMode}
        sampleDoc={sampleDocuments[0]}
      />

      {/* Settings Modal (Gemini API Key, User Role, Audio Test) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        t={t}
        lang={lang}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => {
          setUser(u);
          if (u?.id) loadUserDocuments(u.id);
        }}
        t={t}
        lang={lang}
      />

    </div>
  );
}

export default App;
