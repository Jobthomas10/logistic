import React, { useState } from 'react';
import { 
  MapPin, 
  Package, 
  Scale, 
  Truck, 
  Calendar, 
  FileText, 
  Building2, 
  User, 
  IndianRupee, 
  Copy, 
  Check, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export function ExtractionResult({ doc, t, lang }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!doc) return null;

  const copyToClipboard = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Primary highlight cards (as requested in Section 4)
  const highlightCards = [
    {
      id: 'pickup',
      icon: MapPin,
      iconColor: 'text-blue-600 bg-blue-50',
      label: lang === 'ml' ? '📍 ചരക്ക് എടുക്കേണ്ട സ്ഥലം' : '📍 Pickup',
      value: doc.pickupLocation,
      sub: doc.pickupDetailedAddress,
    },
    {
      id: 'delivery',
      icon: MapPin,
      iconColor: 'text-emerald-600 bg-emerald-50',
      label: lang === 'ml' ? '📍 ചരക്ക് എത്തിക്കേണ്ട സ്ഥലം' : '📍 Delivery',
      value: doc.deliveryLocation,
      sub: doc.deliveryDetailedAddress,
    },
    {
      id: 'cargo',
      icon: Package,
      iconColor: 'text-indigo-600 bg-indigo-50',
      label: lang === 'ml' ? '📦 ചരക്ക്' : '📦 Cargo',
      value: doc.cargoDescription,
      sub: doc.quantity,
    },
    {
      id: 'weight',
      icon: Scale,
      iconColor: 'text-violet-600 bg-violet-50',
      label: lang === 'ml' ? '⚖️ ഭാരം (Weight)' : '⚖️ Weight',
      value: doc.weight,
      sub: doc.quantity,
    },
    {
      id: 'vehicle',
      icon: Truck,
      iconColor: 'text-amber-600 bg-amber-50',
      label: lang === 'ml' ? '🚛 വാഹനം' : '🚛 Vehicle',
      value: doc.vehicleNumber,
      sub: doc.vehicleModel,
      isDanger: doc.vehicleNumber.includes('MISSING'),
    },
    {
      id: 'validity',
      icon: Calendar,
      iconColor: 'text-rose-600 bg-rose-50',
      label: lang === 'ml' ? '📅 സാധുത (Validity)' : '📅 Validity',
      value: doc.validityPeriod,
      sub: doc.validityStatus === 'VALID' ? 'Valid' : doc.validityStatus === 'EXPIRING' ? 'Expiring Soon' : 'Expired',
      status: doc.validityStatus,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Title & Document Badge Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            {t.extractedDetails}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-ml">
            {doc.title}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-700 border border-slate-200">
            {doc.documentNumber}
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200">
            {doc.documentType}
          </span>
        </div>
      </div>

      {/* Primary Highlight Cards Grid (Section 4 Example) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlightCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all relative group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${card.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 font-ml uppercase tracking-wider block">
                      {card.label}
                    </span>
                    <h4 className={`text-base font-extrabold ${card.isDanger ? 'text-rose-600 font-mono' : 'text-slate-900'}`}>
                      {card.value}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(card.id, `${card.value} ${card.sub || ''}`)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  title="Copy"
                >
                  {copiedKey === card.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {card.sub && (
                <p className="mt-2 text-xs text-slate-500 line-clamp-2 pl-12 font-ml">
                  {card.sub}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Comprehensive Secondary Extraction Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 font-ml">
          കൂടുതൽ വിവരങ്ങൾ (Complete Metadata)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          
          {/* Consignor */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start space-x-3">
            <Building2 className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">{t.consignor}</span>
              <p className="font-semibold text-slate-900">{doc.consignor}</p>
              <p className="text-xs text-slate-500 font-mono">{doc.consignorGstin}</p>
            </div>
          </div>

          {/* Consignee */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start space-x-3">
            <Building2 className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">{t.consignee}</span>
              <p className="font-semibold text-slate-900">{doc.consignee}</p>
              <p className="text-xs text-slate-500 font-mono">{doc.consigneeGstin} • {doc.consigneePhone}</p>
            </div>
          </div>

          {/* Invoice Value & Tax */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start space-x-3">
            <IndianRupee className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">{t.invoiceValue}</span>
              <p className="font-bold text-slate-900">{doc.invoiceValue}</p>
              <p className="text-xs text-slate-500">{doc.taxAmount}</p>
            </div>
          </div>

          {/* Transporter & Driver */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start space-x-3">
            <Truck className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">{t.transporter}</span>
              <p className="font-semibold text-slate-900">{doc.transporter}</p>
              <p className="text-xs text-slate-500">
                Driver: {doc.driverName} ({doc.driverPhone || 'N/A'})
              </p>
            </div>
          </div>

        </div>

        {/* Delivery Instructions */}
        {doc.deliveryInstructions && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs">
            <span className="font-bold text-amber-900 block mb-1">
              📌 {t.instructions}:
            </span>
            <p className="text-amber-800 leading-relaxed font-ml">
              {doc.deliveryInstructions}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
