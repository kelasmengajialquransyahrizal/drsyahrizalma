"use client";

import { siteConfig } from "@/lib/data";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen">
      <section className="bg-emerald-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Hubungi Saya</h1>
          <p className="text-emerald-light text-lg max-w-2xl mx-auto">
            Jadwalkan konsultasi, undang sebagai pembicara, atau diskusikan kolaborasi potensial.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Kontak */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-darker mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald/10 text-emerald p-3 rounded-full mr-4 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-darker text-sm text-gray-400 mb-1">Alamat</h4>
                    <p className="text-gray-700">{siteConfig.contact.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald/10 text-emerald p-3 rounded-full mr-4 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-darker text-sm text-gray-400 mb-1">Telepon / WhatsApp</h4>
                    <p className="text-gray-700">{siteConfig.contact.phone}</p>
                    <a href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald text-sm font-medium hover:underline mt-1 inline-block">
                      Kirim Pesan WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald/10 text-emerald p-3 rounded-full mr-4 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-darker text-sm text-gray-400 mb-1">Email</h4>
                    <p className="text-gray-700">{siteConfig.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-dark text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Konsultasi Privat</h3>
                  <p className="text-emerald-light mb-6 opacity-90">Sesi 1-on-1 via Zoom/GMeet membahas isu strategis institusi atau riset Anda.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm"><MessageSquare size={16} className="mr-2" /> Durasi: 60 Menit</li>
                  </ul>
                </div>
                {/* Decorative */}
                <div className="absolute -bottom-8 -right-8 text-white/5">
                  <MessageSquare size={160} />
                </div>
            </div>
          </div>

          {/* Form Konsultasi */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative">
              <h3 className="text-2xl font-display font-bold text-darker mb-2">Form Jadwal Konsultasi</h3>
              <p className="text-gray-500 mb-8">Silakan isi detail berikut, tim kami akan merespons melalui WhatsApp maksimal 1x24 jam.</p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all outline-none" placeholder="Masukkan nama..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Instansi/Universitas</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all outline-none" placeholder="Masukkan nama instansi..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Aktif</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all outline-none" placeholder="email@contoh.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">No. WhatsApp</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all outline-none" placeholder="08..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Topik Konsultasi</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all outline-none appearance-none bg-white">
                      <option value="">Pilih Topik...</option>
                      <option value="institusi">Transformasi Digital Institusi</option>
                      <option value="riset">Pendampingan Riset/Publikasi</option>
                      <option value="training-ai">In House Training AI untuk Guru/Dosen</option>
                      <option value="dakwah">Strategi Dakwah Digital</option>
                      <option value="lainnya">Lainnya...</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ringkasan Kebutuhan / Pesan</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all outline-none resize-none" placeholder="Jelaskan secara singkat apa yang ingin didiskusikan..."></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-4 bg-emerald text-white font-bold rounded-xl hover:bg-emerald-dark transition-all flex items-center justify-center shadow-lg shadow-emerald/20">
                    <Send size={18} className="mr-2" /> Kirim Permintaan Jadwal
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">Data Anda aman dan tidak akan dibagikan ke pihak ketiga.</p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
