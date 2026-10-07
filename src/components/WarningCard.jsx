import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  FileWarning, 
  Truck,
  HelpCircle
} from 'lucide-react';

export function WarningCard({ doc, t, lang }) {
  if (!doc) return null;

  // Compute smart warnings based on document attributes
  const warningsList = [];

  // 1. Validity Check
  if (doc.validityStatus === 'VALID') {
    warningsList.push({
      id: 'valid-check',
      level: 'VALID',
      icon: CheckCircle2,
      titleMl: "E-Way Bill valid ആണ് (സാധുതയുള്ളത്)",
      titleEn: "E-Way Bill is Valid",
      descMl: `${doc.validityPeriod} വരെ സാധുതയുണ്ട്. ചെക്ക്പോസ്റ്റുകളിൽ പരിശോധനയ്ക്ക് ഈ രേഖ കാണിക്കാം.`,
      descEn: `Valid until ${doc.validityPeriod}. Safe for transit without checkpost penalties.`,
    });
  } else if (doc.validityStatus === 'EXPIRING') {
    warningsList.push({
      id: 'expiring-check',
      level: 'EXPIRING',
      icon: Clock,
      titleMl: "E-Way Bill ഉടൻ expire ചെയ്യും (Expiring Soon)!",
      titleEn: "E-Way Bill Expiring Soon!",
      descMl: `ബില്ലിന്റെ സാധുത അവസാനിക്കാൻ ഇനി ${doc.validityRemainingHours || 4} മണിക്കൂർ മാത്രം. സാധുത കഴിയുന്നതിന് മുമ്പ് ലക്ഷ്യസ്ഥാനത്ത് എത്തുകയോ എക്സ്റ്റൻഷൻ എടുക്കുകയോ ചെയ്യുക.`,
      descEn: `Validity expires in ${doc.validityRemainingHours || 4} hours. Deliver goods or request extension immediately.`,
    });
  } else {
    warningsList.push({
      id: 'expired-check',
      level: 'DANGER',
      icon: AlertOctagon,
      titleMl: "ഈ E-Way Bill കാലഹരണപ്പെട്ടു (Expired)!",
      titleEn: "This E-Way Bill has EXPIRED!",
      descMl: "ഈ രേഖയുടെ കാലാവധി കഴിഞ്ഞു. പുതിയ ഇ-വേ ബിൽ ഇല്ലാതെ കേരള RTO അല്ലെങ്കിൽ GST ഉദ്യോഗസ്ഥർ പരിശോധിച്ചാൽ വൻതുക പിഴ വരാൻ സാധ്യതയുണ്ട്.",
      descEn: "Document validity has expired. High risk of 100%+ GST penalty and vehicle detention at checkposts.",
    });
  }

  // 2. Vehicle Number Missing Check
  if (!doc.vehicleNumber || doc.vehicleNumber.includes('MISSING') || doc.vehicleNumber.includes('രേഖപ്പെടുത്തിയിട്ടില്ല')) {
    warningsList.push({
      id: 'missing-vehicle',
      level: 'DANGER',
      icon: Truck,
      titleMl: "വാഹന നമ്പർ രേഖപ്പെടുത്തിയിട്ടില്ല (Missing Vehicle Number)!",
      titleEn: "Missing Vehicle Registration Number!",
      descMl: "ഇ-വേ ബില്ലിൽ വാഹനം മാറിയതോ നമ്പർ ചേർക്കാത്തതോ പാർട്ട്-ബി (Part-B) വീഴ്ചയാണ്. വണ്ടിയെടുക്കുന്നതിന് മുമ്പ് ട്രാൻസ്‌പോർട്ടറോട് നമ്പർ ചേർക്കാൻ പറയുക.",
      descEn: "Part-B of E-Way Bill is missing the registration number. Update vehicle number on portal before dispatch.",
    });
  }

  // 3. Fragile or Special Handling Goods
  if (doc.cargoDescription?.toLowerCase().includes('tile') || doc.cargoDescription?.toLowerCase().includes('glass')) {
    warningsList.push({
      id: 'fragile-goods',
      level: 'INFO',
      icon: AlertTriangle,
      titleMl: "പൊട്ടാൻ സാധ്യതയുള്ള ചരക്ക് (Fragile Cargo)",
      titleEn: "Fragile Material Alert",
      descMl: "സിറാമിക് ടൈലുകൾ ആയതിനാൽ ചാട്ടവും കുലുക്കവും ഒഴിവാക്കാൻ വേഗത നിയന്ത്രിക്കുക. അൺലോഡിംഗിന് മുൻപ് ഉടമയെ വിളിച്ച് അറിയിക്കുക.",
      descEn: "Fragile vitrified flooring materials. Handle with care and secure packing ropes.",
    });
  }

  // 4. Monsoon / Rain alert for open cargo
  if (doc.cargoDescription?.toLowerCase().includes('rubber') || doc.cargoDescription?.toLowerCase().includes('pepper')) {
    warningsList.push({
      id: 'rain-tarpaulin',
      level: 'WARNING',
      icon: FileWarning,
      titleMl: "മഴ മുന്നറിയിപ്പ് — ടാർപോളിൻ പരിശോധിക്കുക",
      titleEn: "Monsoon Moisture Warning",
      descMl: "റബ്ബർ ഷീറ്റും കുരുമുളകും ഈർപ്പം തട്ടിയാൽ കേടാകാൻ സാധ്യതയുണ്ട്. കട്ടിയുള്ള ടാർപോളിൻ ഇട്ട് മൂടുക.",
      descEn: "Agricultural produce is moisture-sensitive. Ensure double waterproof tarp protection.",
    });
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>സ്മാർട്ട് മുന്നറിയിപ്പുകൾ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            {t.warningsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-ml">
            {t.warningsSub}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold font-mono">
            {warningsList.length} Checks Active
          </span>
        </div>
      </div>

      {/* Warning Cards List */}
      <div className="space-y-4">
        {warningsList.map((w) => {
          const Icon = w.icon;
          
          let cardStyle = "bg-slate-50 border-slate-200 text-slate-800";
          let badgeStyle = "bg-slate-200 text-slate-800";
          let iconColor = "text-slate-600 bg-white";

          if (w.level === 'VALID') {
            cardStyle = "bg-emerald-50/70 border-emerald-200 text-emerald-950";
            badgeStyle = "bg-emerald-600 text-white";
            iconColor = "text-emerald-700 bg-emerald-100";
          } else if (w.level === 'EXPIRING' || w.level === 'WARNING') {
            cardStyle = "bg-amber-50/80 border-amber-200 text-amber-950";
            badgeStyle = "bg-amber-500 text-slate-950";
            iconColor = "text-amber-700 bg-amber-100";
          } else if (w.level === 'DANGER') {
            cardStyle = "bg-rose-50 border-rose-300 text-rose-950";
            badgeStyle = "bg-rose-600 text-white";
            iconColor = "text-rose-700 bg-rose-100";
          } else if (w.level === 'INFO') {
            cardStyle = "bg-blue-50/70 border-blue-200 text-blue-950";
            badgeStyle = "bg-blue-600 text-white";
            iconColor = "text-blue-700 bg-blue-100";
          }

          return (
            <div 
              key={w.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardStyle} shadow-2xs`}
            >
              <div className="flex items-start space-x-3.5">
                <div className={`p-2.5 rounded-xl shrink-0 shadow-xs ${iconColor}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-base sm:text-lg font-bold font-ml">
                      {lang === 'ml' ? w.titleMl : w.titleEn}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider font-mono ${badgeStyle}`}>
                      {w.level}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed font-ml opacity-90">
                    {lang === 'ml' ? w.descMl : w.descEn}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
