import React from 'react';
import { FileText, QrCode, ShieldCheck, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export function DocumentCard({ doc, onSelect, isSelected = false, compact = false }) {
  if (!doc) return null;

  return (
    <div 
      onClick={() => onSelect && onSelect(doc)}
      className={`relative rounded-2xl transition-all cursor-pointer border ${
        isSelected 
          ? 'bg-blue-50/60 border-blue-500 shadow-md ring-2 ring-blue-400/30' 
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
      } ${compact ? 'p-3' : 'p-5'}`}
    >
      {/* Official Watermark & Header */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-slate-100 text-blue-700">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{doc.documentType}</h4>
            <p className="text-xs font-mono text-slate-500 font-medium">#{doc.documentNumber}</p>
          </div>
        </div>

        {/* Status Badge */}
        {doc.validityStatus === 'VALID' ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Valid
          </span>
        ) : doc.validityStatus === 'EXPIRING' ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
            <Clock className="w-3.5 h-3.5 mr-1" /> Expiring Soon
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Expired
          </span>
        )}
      </div>

      {/* Core Logistics Summary in Card */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
        <div>
          <span className="text-slate-400 block mb-0.5">വാഹനം (Vehicle)</span>
          <span className={`font-mono font-bold ${doc.vehicleNumber.includes('MISSING') ? 'text-rose-600' : 'text-slate-800'}`}>
            {doc.vehicleNumber}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">ചരക്ക് (Cargo)</span>
          <span className="font-medium text-slate-800 truncate block">
            {doc.cargoDescription.split('(')[0]}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">റൂട്ട് (Route)</span>
          <span className="font-medium text-slate-700 truncate block">
            {doc.pickupLocation.split(',')[0]} ➔ {doc.deliveryLocation.split(',')[0]}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">തൂക്കം / അളവ്</span>
          <span className="font-medium text-slate-800">
            {doc.weight} ({doc.quantity})
          </span>
        </div>
      </div>

      {/* Footer with barcode styling */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center space-x-1">
          <QrCode className="w-3.5 h-3.5 text-slate-400" />
          <span>GST E-Way Portal</span>
        </div>
        <span className="font-medium text-blue-600">വിശദാംശങ്ങൾ കാണുക →</span>
      </div>
    </div>
  );
}
