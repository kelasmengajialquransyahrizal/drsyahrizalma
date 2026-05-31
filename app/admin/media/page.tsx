"use client";

import { useState } from "react";
import { imagesConfig as initialImages } from "@/lib/data";
import { CheckCircle2, Image as ImageIcon, Save } from "lucide-react";
import Image from "next/image";

export default function MediaAdminPage() {
  const [images, setImages] = useState(initialImages);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real application, this would dispatch to an API route to update a database.
    // For this prototype, we're mimicking success.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Kelola Media & Gambar</h1>
          <p className="text-gray-500 text-sm mt-1">Ubah gambar yang tampil pada seluruh halaman website.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center px-6 py-2.5 bg-emerald text-white font-medium rounded-lg hover:bg-emerald-dark transition-all"
        >
          <Save size={18} className="mr-2" /> Simpan Perubahan
        </button>
      </div>

      {saved && (
        <div className="bg-emerald/10 border border-emerald/20 text-emerald-dark px-4 py-3 rounded-lg mb-6 flex items-center">
          <CheckCircle2 size={18} className="mr-2" />
          Berhasil menyimpan konfigurasi gambar terbaru. (Simulasi)
        </div>
      )}

      <div className="space-y-6">
        
        {/* Gambar Utama (Hero) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-1/3">
            <h3 className="font-bold text-darker mb-1">Gambar Beranda (Hero)</h3>
            <p className="text-xs text-gray-500 mb-4">Ditampilkan pada bagian paling atas halaman depan.</p>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
               <Image src={images.hero} alt="Hero" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pt-10">
            <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar Baru</label>
            <input 
              type="text" 
              value={images.hero} 
              onChange={e => setImages({...images, hero: e.target.value})} 
              className="w-full px-4 py-2 border rounded-md" 
              placeholder="https://..." 
            />
            <p className="text-xs text-gray-400 mt-2">Gunakan link absolute URL. Disarankan format WEBP/JPG dengan dimensi 1:1.</p>
          </div>
        </div>

        {/* Gambar Tentang Area Beranda */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-1/3">
            <h3 className="font-bold text-darker mb-1">Gambar Sekilas Tentang</h3>
            <p className="text-xs text-gray-500 mb-4">Ditampilkan pada halaman beranda bagian Tengah.</p>
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
               <Image src={images.aboutHero} alt="Tentang Beranda" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pt-10">
            <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar Baru</label>
            <input 
              type="text" 
              value={images.aboutHero} 
              onChange={e => setImages({...images, aboutHero: e.target.value})} 
              className="w-full px-4 py-2 border rounded-md" 
              placeholder="https://..." 
            />
          </div>
        </div>

        {/* Gambar Profil Tentang Saya */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-1/3">
            <h3 className="font-bold text-darker mb-1">Foto Profil Utama</h3>
            <p className="text-xs text-gray-500 mb-4">Ditampilkan di halaman khusus /tentang.</p>
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
               <Image src={images.profile} alt="Profil" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pt-10">
            <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar Baru</label>
            <input 
              type="text" 
              value={images.profile} 
              onChange={e => setImages({...images, profile: e.target.value})} 
              className="w-full px-4 py-2 border rounded-md" 
              placeholder="https://..." 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
