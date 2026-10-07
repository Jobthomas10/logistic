import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  Truck
} from 'lucide-react';

export function DocumentHistory({ documents, activeDoc, onSelectDoc, t, lang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'VALID' | 'EXPIRING' | 'EXPIRED'

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = 
      doc.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.pickupLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.deliveryLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' || doc.validityStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200/60">
            <History className="w-3.5 h-3.5" />
            <span>രേഖകളുടെ റെക്കോർഡ്</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            {t.historyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-ml">
            {t.historySub}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          {['ALL', 'VALID', 'EXPIRING', 'EXPIRED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg transition-all font-mono ${
                statusFilter === s ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="വാഹന നമ്പർ, സ്ഥലം, അല്ലെങ്കിൽ ബിൽ നമ്പർ തിരയുക..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-ml text-slate-900 placeholder:text-slate-400"
        />
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => {
          const isSelected = activeDoc?.id === doc.id;
          
          return (
            <div
              key={doc.id}
              onClick={() => onSelectDoc(doc)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer card-hover ${
                isSelected 
                  ? 'bg-blue-50/60 border-blue-500 shadow-sm ring-2 ring-blue-400/20' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Left: Info */}
                <div className="flex items-start space-x-3.5">
                  <div className={`p-3 rounded-xl shrink-0 ${
                    doc.validityStatus === 'VALID' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : doc.validityStatus === 'EXPIRING'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {doc.documentType}
                      </h4>
                      <span className="text-xs font-mono text-slate-400">
                        #{doc.documentNumber}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="font-mono font-bold text-slate-800">
                        🚛 {doc.vehicleNumber}
                      </span>
                      <span>
                        📍 {doc.pickupLocation.split(',')[0]} ➔ {doc.deliveryLocation.split(',')[0]}
                      </span>
                      <span>
                        📦 {doc.cargoDescription.split('(')[0]} ({doc.weight})
                      </span>
                    </div>

                    <div className="mt-1 text-[11px] text-slate-400">
                      തീയതി: {doc.documentDate} • {doc.transporter}
                    </div>
                  </div>
                </div>

                {/* Right: Status badge & select button */}
                <div className="flex items-center justify-between sm:justify-end space-x-3 sm:border-l sm:border-slate-100 sm:pl-4">
                  {doc.validityStatus === 'VALID' ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Valid
                    </span>
                  ) : doc.validityStatus === 'EXPIRING' ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3.5 h-3.5 mr-1" /> Expiring Soon
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" /> Expired
                    </span>
                  )}

                  <button className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 font-ml">
                    <span>{isSelected ? "സജീവമാണ്" : t.viewDocument}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
