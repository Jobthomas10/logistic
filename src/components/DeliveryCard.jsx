import React, { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Phone, 
  User, 
  ArrowRight, 
  Building2, 
  Navigation,
  Clock,
  Compass
} from 'lucide-react';

export function DeliveryCard({ doc, t, lang }) {
  const [copiedSection, setCopiedSection] = useState(null);

  if (!doc) return null;

  const handleCopy = (sectionKey, text) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const openGoogleMaps = (locationQuery) => {
    const encoded = encodeURIComponent(locationQuery);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200/60">
            <Compass className="w-3.5 h-3.5" />
            <span>റൂട്ടും ഡെലിവറിയും</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            {t.deliveryInfoTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-ml">
            അകലം: ~{doc.distanceKm || 185} km • ഡ്രൈവിംഗ് സമയം: ~{doc.approxDrivingTime || '4 hrs'}
          </p>
        </div>

        {/* Global Route Navigate */}
        <button
          onClick={() => openGoogleMaps(doc.deliveryDetailedAddress || doc.deliveryLocation)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
        >
          <Navigation className="w-4 h-4 text-amber-300" />
          <span className="font-ml">{t.navigateGoogleMaps}</span>
        </button>
      </div>

      {/* Side-by-Side Pickup & Delivery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PICKUP (ചരക്ക് എടുക്കേണ്ട സ്ഥലം) */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              <span>PICKUP (എടുക്കേണ്ട സ്ഥലം)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">ORIGIN</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-0.5">സ്ഥലം / Location</span>
            <h4 className="text-xl font-extrabold text-slate-900 font-ml">
              {doc.pickupLocation}
            </h4>
            <p className="text-xs text-slate-600 mt-1 font-ml leading-relaxed">
              {doc.pickupDetailedAddress || doc.pickupLocation}
            </p>
          </div>

          {/* Consignor Details */}
          <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold">{doc.consignor}</span>
            </div>
            
            {doc.consignorContactPerson && (
              <div className="flex items-center space-x-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{doc.consignorContactPerson}</span>
              </div>
            )}

            {doc.consignorPhone && (
              <div className="flex items-center space-x-2 text-slate-600">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={`tel:${doc.consignorPhone}`} className="hover:underline font-mono">
                  {doc.consignorPhone}
                </a>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center space-x-2">
            <button
              onClick={() => handleCopy('pickup', doc.pickupDetailedAddress || doc.pickupLocation)}
              className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1.5 transition-all"
            >
              {copiedSection === 'pickup' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedSection === 'pickup' ? t.addressCopied : t.copyAddress}</span>
            </button>

            <button
              onClick={() => openGoogleMaps(doc.pickupDetailedAddress || doc.pickupLocation)}
              className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-blue-600 flex items-center justify-center space-x-1.5 transition-all"
              title="Open in Maps"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DELIVERY (ചരക്ക് എത്തിക്കേണ്ട സ്ഥലം) */}
        <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
              <span>DELIVERY (എത്തിക്കേണ്ട സ്ഥലം)</span>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold">DESTINATION</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-0.5">സ്ഥലം / Location</span>
            <h4 className="text-xl font-extrabold text-slate-900 font-ml">
              {doc.deliveryLocation}
            </h4>
            <p className="text-xs text-slate-600 mt-1 font-ml leading-relaxed">
              {doc.deliveryDetailedAddress || doc.deliveryLocation}
            </p>
          </div>

          {/* Consignee / Customer Details */}
          <div className="pt-3 border-t border-emerald-200 space-y-1.5 text-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-900">{doc.consignee}</span>
            </div>

            {doc.consigneeContactPerson && (
              <div className="flex items-center space-x-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{doc.consigneeContactPerson}</span>
              </div>
            )}

            {doc.consigneePhone && (
              <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={`tel:${doc.consigneePhone}`} className="hover:underline font-mono font-bold">
                  {doc.consigneePhone}
                </a>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center space-x-2">
            <button
              onClick={() => handleCopy('delivery', doc.deliveryDetailedAddress || doc.deliveryLocation)}
              className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-emerald-300 text-xs font-semibold text-slate-800 flex items-center justify-center space-x-1.5 transition-all"
            >
              {copiedSection === 'delivery' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedSection === 'delivery' ? t.addressCopied : t.copyAddress}</span>
            </button>

            <button
              onClick={() => openGoogleMaps(doc.deliveryDetailedAddress || doc.deliveryLocation)}
              className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
              title="Open in Maps"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Map</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
