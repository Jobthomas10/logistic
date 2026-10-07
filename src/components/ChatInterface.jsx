import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Sparkles, 
  ShieldAlert, 
  CornerDownLeft,
  Trash2
} from 'lucide-react';
import { askDocumentAI, speakText, stopSpeech, startVoiceRecognition, logQueryToSupabase } from '../services/aiService';

export function ChatInterface({ doc, t, lang, user }) {
  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'ai',
      text: lang === 'ml' 
        ? `നമസ്കാരം! ഞാൻ ലോറിമിത്ര AI. ഈ ${doc?.documentType || 'രേഖയെ'}ക്കുറിച്ച് എന്തും ചോദിക്കാം. ഡെലിവറി സ്ഥലം, ചരക്ക്, ബിൽ സാധുത എന്നിവ ലളിതമായി പറഞ്ഞുതരാം.`
        : `Hello! I am LorryMitra AI. You can ask me anything about this ${doc?.documentType || 'document'}. I answer strictly using factual document data.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState(null);

  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: 'm-init-' + (doc?.id || 'default'),
        sender: 'ai',
        text: lang === 'ml' 
          ? `നമസ്കാരം! ഞാൻ ലോറിമിത്ര AI. ${doc?.vehicleNumber ? `വാഹനം ${doc.vehicleNumber}` : 'ഈ രേഖയെ'}ക്കുറിച്ച് എന്തും ചോദിക്കാം (${doc?.cargoDescription || ''}).`
          : `Hello! I am LorryMitra AI. You can ask me anything about this ${doc?.documentType || 'document'} (${doc?.vehicleNumber || ''}). I answer strictly using factual document data.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [doc?.id, lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend = inputQuery) => {
    const query = (textToSend || '').trim();
    if (!query) return;

    const userMsgId = 'm-' + Date.now();
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setInputQuery('');
    setIsTyping(true);
    stopSpeech();

    // Call grounded AI
    const aiAnswer = await askDocumentAI(query, doc);
    setIsTyping(false);

    // Asynchronously log to Supabase
    if (doc?.id) {
      logQueryToSupabase(doc.id, query, aiAnswer, lang, user?.id);
    }

    const aiMsgId = 'm-ai-' + Date.now();
    setMessages([
      ...newMessages,
      {
        id: aiMsgId,
        sender: 'ai',
        text: aiAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Automatically speak out the response
    setCurrentlySpeakingId(aiMsgId);
    speakText(
      aiAnswer,
      'ml-IN',
      () => setCurrentlySpeakingId(aiMsgId),
      () => setCurrentlySpeakingId(null)
    );
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    stopSpeech();

    startVoiceRecognition({
      lang: lang === 'ml' ? 'ml-IN' : 'en-IN',
      onResult: (transcript) => {
        setIsListening(false);
        handleSendMessage(transcript);
      },
      onError: (err) => {
        setIsListening(false);
        console.warn("Recognition error:", err);
        // Fallback demo question
        handleSendMessage("Delivery എവിടെയാണ്?");
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const suggestedQuestions = [
    { text: "Delivery എവിടെയാണ്?", label: "Delivery എവിടെയാണ്?" },
    { text: "Cargo എന്താണ്?", label: "Cargo എന്താണ്?" },
    { text: "Bill എപ്പോൾ expire ആകും?", label: "Bill എപ്പോൾ expire ആകും?" },
    { text: "തൂക്കം എത്ര കിലോയാണ്?", label: "തൂക്കം എത്രയാണ്?" },
    { text: "ആർക്കാണ് ഡെലിവറി കൊടുക്കേണ്ടത്?", label: "സ്വീകർത്താവ് ആര്?" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 card-shadow flex flex-col h-[700px] max-w-4xl mx-auto overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/60 border border-blue-400/40 flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-base sm:text-lg font-display">
                {t.chatTitle}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-blue-200 font-ml">
              {t.chatSub}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            stopSpeech();
            setMessages([messages[0]]);
          }}
          className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          title="Clear Chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Questions Pills Bar */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 font-ml">
          {t.suggestedQueries}
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q.text)}
            className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 transition-all font-ml shadow-2xs"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
        {messages.map((m) => {
          const isAI = m.sender === 'ai';
          return (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl p-4 transition-all shadow-xs ${
                isAI 
                  ? 'bg-white text-slate-900 border border-slate-200' 
                  : 'bg-blue-600 text-white'
              }`}>
                <p className={`text-sm sm:text-base font-ml leading-relaxed ${isAI ? 'text-slate-800' : 'text-white'}`}>
                  {m.text}
                </p>

                <div className={`mt-2 flex items-center justify-between text-[11px] ${
                  isAI ? 'text-slate-400' : 'text-blue-200'
                }`}>
                  <span>{m.timestamp}</span>

                  {isAI && (
                    <button
                      onClick={() => {
                        if (currentlySpeakingId === m.id) {
                          stopSpeech();
                          setCurrentlySpeakingId(null);
                        } else {
                          setCurrentlySpeakingId(m.id);
                          speakText(m.text, 'ml-IN', () => setCurrentlySpeakingId(m.id), () => setCurrentlySpeakingId(null));
                        }
                      }}
                      className="ml-2 hover:text-blue-600 transition-colors"
                      title="Audio playback"
                    >
                      {currentlySpeakingId === m.id ? (
                        <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-3 text-slate-500 text-xs font-ml">
            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center space-x-1.5 shadow-xs">
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="ml-2 text-xs font-semibold text-slate-600">വിശകലനം ചെയ്യുന്നു...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Listening State Bar */}
      {isListening && (
        <div className="px-4 py-2 bg-rose-50 border-t border-rose-200 flex items-center justify-between text-xs text-rose-700">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
            <span className="font-bold font-ml">🎙️ {t.listeningState}</span>
          </div>
          <button 
            onClick={() => setIsListening(false)}
            className="text-rose-600 font-bold hover:underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center space-x-2"
      >
        {/* Large Voice Microphone Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-3 rounded-2xl transition-all shadow-xs active:scale-95 ${
            isListening 
              ? 'bg-rose-600 text-white animate-pulse' 
              : 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold'
          }`}
          title="Voice input in Malayalam"
        >
          <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <input
          ref={chatInputRef}
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={t.chatPlaceholder}
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base font-ml text-slate-900 placeholder:text-slate-400"
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold transition-all shadow-xs active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
}
