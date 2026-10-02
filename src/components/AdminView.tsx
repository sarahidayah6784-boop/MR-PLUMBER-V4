import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { ServiceRequestRecord, RequestStatus } from '../types';
import { getServiceRequests, updateServiceRequestStatus } from '../utils/storage';
import { generateCustomerReplyWhatsAppLink } from '../utils/whatsapp';

export const AdminView: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequestRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedUrgencyFilter, setSelectedUrgencyFilter] = useState<string>('all');

  const refreshList = () => {
    setRequests(getServiceRequests());
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    updateServiceRequestStatus(id, newStatus);
    refreshList();
  };

  // Status mapping
  const STATUS_CONFIG: Record<RequestStatus, { label: string; badgeClass: string; emoji: string }> = {
    baru: {
      label: 'Permintaan Baru',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      emoji: '🟡'
    },
    dihubungi: {
      label: 'Sedang Dihubungi',
      badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
      emoji: '🔵'
    },
    proses: {
      label: 'Dalam Proses',
      badgeClass: 'bg-orange-100 text-orange-900 border-orange-300',
      emoji: '🟠'
    },
    selesai: {
      label: 'Selesai',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      emoji: '🟢'
    },
    batal: {
      label: 'Dibatalkan',
      badgeClass: 'bg-red-100 text-red-900 border-red-300',
      emoji: '🔴'
    }
  };

  // Filtered requests
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.phone.includes(searchQuery) ||
      req.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'all' || req.status === selectedStatusFilter;

    const matchesUrgency =
      selectedUrgencyFilter === 'all' || req.urgency === selectedUrgencyFilter;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'kecemasan':
        return <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">🔴 Kecemasan</span>;
      case 'segera':
        return <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">🟡 Tindakan Segera</span>;
      default:
        return <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">🔵 Biasa</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Modul Pengurusan Juruteknik
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
            PENGURUSAN PERMINTAAN SERVIS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pantau aduan, kemas kini status kerja, dan hubungi pelanggan secara pantas.
          </p>
        </div>

        <button
          onClick={refreshList}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Muat Semula ({requests.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, telefon, servis, ID atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-medium"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-600"
            >
              <option value="all">Semua Status</option>
              <option value="baru">🟡 Permintaan Baru</option>
              <option value="dihubungi">🔵 Sedang Dihubungi</option>
              <option value="proses">🟠 Dalam Proses</option>
              <option value="selesai">🟢 Selesai</option>
              <option value="batal">🔴 Dibatalkan</option>
            </select>

            <select
              value={selectedUrgencyFilter}
              onChange={(e) => setSelectedUrgencyFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-600"
            >
              <option value="all">Semua Tahap</option>
              <option value="kecemasan">Kecemasan</option>
              <option value="segera">Tindakan Segera</option>
              <option value="biasa">Biasa</option>
            </select>
          </div>
        </div>

        {/* Quick count chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-600 font-medium">
          <span>Pintas Status:</span>
          {(['all', 'baru', 'dihubungi', 'proses', 'selesai', 'batal'] as const).map((st) => {
            const count = st === 'all'
              ? requests.length
              : requests.filter((r) => r.status === st).length;
            const isSelected = selectedStatusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1E36] text-white border-[#0B1E36]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {st === 'all' ? 'Semua' : STATUS_CONFIG[st as RequestStatus]?.label}{' '}
                <span className="opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-2">
          <p className="font-bold text-slate-700 text-sm">Tiada permintaan dijumpai</p>
          <p className="text-xs text-slate-500">
            Cuba cari dengan kata kunci lain atau ubah penapis status.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredRequests.map((req) => {
            const statusInfo = STATUS_CONFIG[req.status] || STATUS_CONFIG.baru;
            const formattedDate = new Date(req.createdAt).toLocaleDateString('ms-MY', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            const replyWaUrl = generateCustomerReplyWhatsAppLink(
              req.phone,
              req.customerName,
              req.serviceName
            );

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all space-y-3 text-left"
              >
                {/* Header row of card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                      {req.id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {req.customerName}
                    </h3>
                    {getUrgencyBadge(req.urgency)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">{formattedDate}</span>
                  </div>
                </div>

                {/* Service and Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                      Jenis Servis
                    </span>
                    <span className="font-bold text-blue-900 text-sm">
                      {req.serviceName}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                      Kawasan
                    </span>
                    <span className="font-medium text-slate-800">
                      {req.serviceArea || 'Lembah Klang'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                      Nombor Telefon
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {req.phone}
                    </span>
                  </div>
                </div>

                {/* Description & Address */}
                <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 shrink-0">Masalah:</span>
                    <span className="text-slate-800">
                      {req.issueDescription || 'Tiada huraian tambahan'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{req.address}</span>
                  </div>
                </div>

                {/* Status selector & Actions */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Status:</span>
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value as RequestStatus)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold shadow-2xs ${statusInfo.badgeClass}`}
                    >
                      <option value="baru">🟡 Permintaan Baru</option>
                      <option value="dihubungi">🔵 Sedang Dihubungi</option>
                      <option value="proses">🟠 Dalam Proses</option>
                      <option value="selesai">🟢 Selesai</option>
                      <option value="batal">🔴 Dibatalkan</option>
                    </select>
                  </div>

                  {/* Customer Quick Contact buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={replyWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp Pelanggan</span>
                    </a>

                    <a
                      href={`tel:${req.phone.replace(/[^0-9]/g, '')}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
