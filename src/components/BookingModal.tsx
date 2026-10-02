import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Camera,
  Upload,
  Video,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Trash2,
  Navigation,
  FileCheck,
  ChevronLeft
} from 'lucide-react';
import { BookingFormData, MediaFile, ServiceItem, UrgencyLevel, TimeframeOption, ServiceArea } from '../types';
import { SERVICES, SERVICE_AREAS, COMPANY_PHONE } from '../data/services';
import officialLogoImg from '../assets/images/mr_plumber_logo_official_1790907937387.jpg';
import {
  INITIAL_FORM_DATA,
  getStoredDraft,
  saveFormDraft,
  clearFormDraft,
  saveNewServiceRequest
} from '../utils/storage';
import { generateWhatsAppLink } from '../utils/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: ServiceItem | null;
  initialNote?: string;
  onSubmittedSuccess?: (requestId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedService,
  initialNote,
  onSubmittedSuccess
}) => {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState<'form' | 'summary' | 'success'>('form');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationSuccessNote, setLocationSuccessNote] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [createdRequestId, setCreatedRequestId] = useState<string>('');

  const photoInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Initialize or restore draft when opened
  useEffect(() => {
    if (isOpen) {
      const savedDraft = getStoredDraft();
      if (savedDraft && !formData.customerName) {
        setFormData({
          ...savedDraft,
          serviceId: selectedService ? selectedService.id : savedDraft.serviceId || 'jamban-tersumbat',
          serviceName: selectedService ? selectedService.title : savedDraft.serviceName || 'JAMBAN TERSUMBAT',
          issueDescription: initialNote || savedDraft.issueDescription || ''
        });
      } else if (selectedService) {
        setFormData((prev) => ({
          ...prev,
          serviceId: selectedService.id,
          serviceName: selectedService.title,
          issueDescription: initialNote ? `${initialNote}. ` : prev.issueDescription
        }));
      }
    }
  }, [isOpen, selectedService, initialNote]);

  // Auto-save draft on data changes
  useEffect(() => {
    if (isOpen && currentStep === 'form') {
      const timer = setTimeout(() => {
        saveFormDraft(formData);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [formData, isOpen, currentStep]);

  if (!isOpen) return null;

  // Handle service change from select
  const handleServiceChange = (serviceId: string) => {
    const matched = SERVICES.find((s) => s.id === serviceId);
    if (matched) {
      setFormData((prev) => ({
        ...prev,
        serviceId: matched.id,
        serviceName: matched.title
      }));
    }
  };

  // Geolocation handler
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Pelayar anda tidak menyokong fungsi pengesanan GPS. Sila taip alamat manual.');
      return;
    }

    setIsGettingLocation(true);
    setLocationSuccessNote(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coordsText = `Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}`;
        
        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
          address: prev.address ? `${prev.address} (GPS: ${coordsText})` : `Lokasi Semasa (GPS: ${coordsText})`
        }));
        setIsGettingLocation(false);
        setLocationSuccessNote('Lokasi GPS berjaya dikesan!');
      },
      (err) => {
        setIsGettingLocation(false);
        console.warn('Geolocation error:', err);
        setLocationSuccessNote('Tidak dapat akses GPS. Sila taipkan alamat secara manual.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Image Upload handler (up to 5 images)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentImages = formData.mediaFiles.filter((m) => m.type === 'image');
    const availableSlots = 5 - currentImages.length;

    if (availableSlots <= 0) {
      alert('Maksimum 5 gambar sahaja dibenarkan.');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);
    const newMediaList: MediaFile[] = [];

    filesToProcess.forEach((file) => {
      const url = URL.createObjectURL(file);
      newMediaList.push({
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        url,
        name: file.name,
        type: 'image',
        sizeFormatted: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      });
    });

    setFormData((prev) => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...newMediaList]
    }));

    // Reset input
    e.target.value = '';
  };

  // Video Upload handler (max 1 video)
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentVideos = formData.mediaFiles.filter((m) => m.type === 'video');
    if (currentVideos.length >= 1) {
      alert('Maksimum 1 video sahaja dibenarkan.');
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);
    const videoMedia: MediaFile = {
      id: `vid-${Date.now()}`,
      url,
      name: file.name,
      type: 'video',
      sizeFormatted: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    };

    setFormData((prev) => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, videoMedia]
    }));

    e.target.value = '';
  };

  const removeMedia = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((m) => m.id !== id)
    }));
  };

  // Validation
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.customerName.trim()) {
      errors.customerName = 'Sila masukkan nama anda.';
    }

    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!phoneClean || phoneClean.length < 9) {
      errors.phone = 'Sila masukkan nombor telefon yang sah (cth: 012-3456789).';
    }

    if (!formData.address.trim()) {
      errors.address = 'Sila nyatakan alamat atau kawasan perkhidmatan anda.';
    }

    if (!formData.serviceId) {
      errors.serviceId = 'Sila pilih jenis masalah/servis.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToSummary = () => {
    if (validateForm()) {
      setCurrentStep('summary');
    }
  };

  const handleSubmitBooking = () => {
    // Save to local storage service requests
    const record = saveNewServiceRequest(formData);
    setCreatedRequestId(record.id);
    clearFormDraft();

    if (onSubmittedSuccess) {
      onSubmittedSuccess(record.id);
    }

    setCurrentStep('success');
  };

  const countImages = formData.mediaFiles.filter((m) => m.type === 'image').length;
  const countVideos = formData.mediaFiles.filter((m) => m.type === 'video').length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        {/* Grab bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentStep === 'summary' && (
              <button
                onClick={() => setCurrentStep('form')}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                title="Kembali ke borang"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400 bg-white shrink-0 shadow-xs">
              <img src={officialLogoImg} alt="Mr Plumber" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 id="booking-title" className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentStep === 'form' && 'Beritahu Masalah Anda'}
                {currentStep === 'summary' && 'Ringkasan Permintaan Servis'}
                {currentStep === 'success' && 'Permintaan Berjaya Disimpan!'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentStep === 'form' && 'Isi maklumat di bawah supaya Mr Plumber boleh bertindak segera.'}
                {currentStep === 'summary' && 'Sila semak maklumat sebelum dihantar ke WhatsApp.'}
                {currentStep === 'success' && 'Langkah terakhir: Buka WhatsApp untuk berhubung terus.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: FORM */}
          {currentStep === 'form' && (
            <div className="space-y-4.5">
              {/* Jenis Masalah Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Jenis Masalah / Servis <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-semibold text-slate-900 bg-white"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.emoji} {s.title} ({s.priceTag})
                    </option>
                  ))}
                </select>
                {formErrors.serviceId && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.serviceId}</p>
                )}
              </div>

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nama Pelanggan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Encik Hafiz"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-100 ${
                      formErrors.customerName ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  {formErrors.customerName && (
                    <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nombor Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 012-345 6789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-100 ${
                      formErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Alamat & Lokasi */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Alamat / Lokasi Servis <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${isGettingLocation ? 'animate-spin' : ''}`} />
                    <span>{isGettingLocation ? 'Mencari GPS...' : '📍 Gunakan Lokasi Semasa'}</span>
                  </button>
                </div>

                {locationSuccessNote && (
                  <p className="text-xs text-emerald-600 font-semibold">{locationSuccessNote}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <select
                    value={formData.serviceArea}
                    onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value as ServiceArea })}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                  >
                    {SERVICE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                    <option value="Kawasan Lain">Kawasan Lain</option>
                  </select>

                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="No. Rumah, Jalan, Taman, Poskod & Bandar"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-100 ${
                        formErrors.address ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-blue-600'
                      }`}
                    />
                  </div>
                </div>
                {formErrors.address && (
                  <p className="text-xs text-red-500 font-medium">{formErrors.address}</p>
                )}
              </div>

              {/* Keterangan Masalah */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Keterangan Masalah
                </label>
                <textarea
                  rows={2}
                  placeholder="Terangkan secara ringkas apa yang tersumbat, bocor, atau berbunyi..."
                  value={formData.issueDescription}
                  onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900"
                />
              </div>

              {/* Bila masalah berlaku? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Bila Masalah Berlaku?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'baru', label: 'Baru berlaku' },
                    { id: 'beberapa_jam', label: 'Sejak beberapa jam' },
                    { id: 'semalam', label: 'Sejak semalam' },
                    { id: 'beberapa_hari', label: 'Sudah beberapa hari' },
                    { id: 'tidak_pasti', label: 'Tidak pasti' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeframe: item.id as TimeframeOption })}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        formData.timeframe === item.id
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tahap Masalah (Urgency) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tahap Masalah
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: 'biasa' })}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      formData.urgency === 'biasa'
                        ? 'border-blue-500 bg-blue-50 text-blue-950 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="block text-base mb-0.5">🔵</span>
                    <span>Biasa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: 'segera' })}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      formData.urgency === 'segera'
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="block text-base mb-0.5">🟡</span>
                    <span>Tindakan Segera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: 'kecemasan' })}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      formData.urgency === 'kecemasan'
                        ? 'border-red-500 bg-red-50 text-red-950 font-bold ring-1 ring-red-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="block text-base mb-0.5">🔴</span>
                    <span>Kecemasan</span>
                  </button>
                </div>
              </div>

              {/* 3 Quick Triage Questions */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Soalan Tambahan Keadaan Paip:
                </span>

                {/* 1. Adakah air masih boleh mengalir? */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    Adakah air masih boleh mengalir?
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, canWaterFlow: 'ya' })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        formData.canWaterFlow === 'ya'
                          ? 'bg-blue-900 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      Ya
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, canWaterFlow: 'tidak' })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        formData.canWaterFlow === 'tidak'
                          ? 'bg-blue-900 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                </div>

                {/* 2. Adakah berlaku kebocoran air? */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    Adakah berlaku kebocoran air?
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isLeaking: 'ya' })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        formData.isLeaking === 'ya'
                          ? 'bg-red-700 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      Ya
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isLeaking: 'tidak' })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        formData.isLeaking === 'tidak'
                          ? 'bg-slate-700 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                </div>

                {/* 3. Adakah kawasan sedang dinaiki air? */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    Adakah kawasan sedang dinaiki air?
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isFlooding: 'ya' })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        formData.isFlooding === 'ya'
                          ? 'bg-red-700 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      Ya
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isFlooding: 'tidak' })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        formData.isFlooding === 'tidak'
                          ? 'bg-slate-700 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Gambar / Video */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Upload Gambar / Video
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {countImages}/5 Foto · {countVideos}/1 Video
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  “Gambar atau video membantu Mr Plumber memahami masalah sebelum datang.”
                </p>

                {/* Hidden File Inputs */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={photoInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={cameraInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  type="file"
                  accept="video/*"
                  ref={videoInputRef}
                  onChange={handleVideoUpload}
                  className="hidden"
                />

                {/* Upload Buttons Trigger */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    disabled={countImages >= 5}
                    className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 flex flex-col items-center justify-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-blue-800" />
                    <span className="text-[11px] font-semibold">Ambil Foto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={countImages >= 5}
                    className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 flex flex-col items-center justify-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-emerald-800" />
                    <span className="text-[11px] font-semibold">Upload Foto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={countVideos >= 1}
                    className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 flex flex-col items-center justify-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Video className="w-5 h-5 text-purple-800" />
                    <span className="text-[11px] font-semibold">Upload Video</span>
                  </button>
                </div>

                {/* Media Preview list */}
                {formData.mediaFiles.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                    {formData.mediaFiles.map((media) => (
                      <div
                        key={media.id}
                        className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-square flex items-center justify-center"
                      >
                        {media.type === 'image' ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-white p-2 text-center">
                            <Video className="w-6 h-6 text-purple-400 mb-1" />
                            <span className="text-[10px] truncate max-w-full font-mono">{media.name}</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(media.id)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:bg-red-700 shadow-xs cursor-pointer"
                          title="Padam"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SUMMARY */}
          {currentStep === 'summary' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-slate-200 font-bold text-sm text-slate-900">
                  <span>RINGKASAN PERMINTAAN SERVIS</span>
                  <span className="text-blue-900">MR PLUMBER</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Nama:</span>
                  <span className="col-span-2 font-bold text-slate-900">{formData.customerName}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Telefon:</span>
                  <span className="col-span-2 font-bold text-slate-900 font-mono">{formData.phone}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Servis:</span>
                  <span className="col-span-2 font-bold text-blue-900">{formData.serviceName}</span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Masalah:</span>
                  <span className="col-span-2 font-medium text-slate-800">
                    {formData.issueDescription || 'Pemeriksaan di lokasi'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Alamat:</span>
                  <span className="col-span-2 font-medium text-slate-800">
                    {formData.address} ({formData.serviceArea})
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Tahap kecemasan:</span>
                  <span className="col-span-2 font-bold">
                    {formData.urgency === 'biasa' && '🔵 Biasa'}
                    {formData.urgency === 'segera' && '🟡 Perlu Tindakan Segera'}
                    {formData.urgency === 'kecemasan' && '🔴 Kecemasan (Keutamaan Tinggi)'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Gambar:</span>
                  <span className="col-span-2 font-medium text-slate-800">
                    {countImages > 0 ? `${countImages} keping gambar dilampirkan` : 'Tiada'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500 font-medium">Video:</span>
                  <span className="col-span-2 font-medium text-slate-800">
                    {countVideos > 0 ? '1 video dilampirkan' : 'Tiada'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-950">
                <FileCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Sedia Untuk Dihantar</span>
                  <span>
                    Sebaik sahaja anda menekan butang di bawah, maklumat akan dihantar ke sistem kami dan membuka WhatsApp untuk semakan pantas Mr Plumber.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {currentStep === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 mx-auto shadow-lg bg-white">
                <img
                  src={officialLogoImg}
                  alt="Mr Plumber"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-500">
                  ID Tempahan: {createdRequestId}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Permintaan Anda Telah Direkodkan!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
                  Sila tekan butang hijau di bawah untuk terus menghantar mesej maklumat ini kepada WhatsApp Mr Plumber ({COMPANY_PHONE}).
                </p>
              </div>

              <div className="pt-3 max-w-sm mx-auto space-y-2.5">
                <a
                  href={generateWhatsAppLink(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>📱 HANTAR MELALUI WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Tutup Borang
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        {currentStep !== 'success' && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
            {currentStep === 'form' ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleProceedToSummary}
                  className="flex-1 px-5 py-3 bg-[#0B1E36] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Semak Ringkasan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentStep('form')}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Ubah Maklumat
                </button>
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  className="flex-1 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>✅ HANTAR PERMINTAAN</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
