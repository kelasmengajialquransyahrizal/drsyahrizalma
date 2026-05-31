"use client";

import { useState, useEffect } from "react";
import { imagesConfig as initialImages } from "@/lib/data";
import { CheckCircle2, Image as ImageIcon, Save, UploadCloud } from "lucide-react";
import Image from "next/image";

const ImageUploadField = ({ 
  title, 
  description, 
  value, 
  onChange, 
  aspectRatioLabel,
  aspectClass 
}: any) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start gap-6">
      <div className="w-full md:w-1/3">
        <h3 className="font-bold text-darker mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-4">{description}</p>
        <div className={`relative w-full ${aspectClass} rounded-lg overflow-hidden bg-gray-100 border border-gray-200`}>
           <Image src={value || 'https://via.placeholder.com/400'} alt={title} fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
      <div className="w-full md:w-2/3 md:pt-4">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Unggah dari Perangkat (Upload)</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue/20 border-dashed rounded-lg cursor-pointer bg-blue/5 hover:bg-blue/10 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-2 text-blue" />
                <p className="mb-1 text-sm text-gray-600"><span className="font-semibold text-blue flex items-center justify-center">Klik untuk Cari File</span></p>
                <p className="text-xs text-gray-500">Mendukung JPG, PNG, WEBP ({aspectRatioLabel})</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
           <hr className="flex-1 border-gray-200" />
           <span className="text-xs text-gray-400 font-medium">ATAU</span>
           <hr className="flex-1 border-gray-200" />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Gunakan URL Web Terpublikasi</label>
           <input 
             type="text" 
             value={value} 
             onChange={e => onChange(e.target.value)} 
             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-all text-sm" 
             placeholder="https://..." 
           />
        </div>
      </div>
    </div>
  );
};

export default function MediaAdminPage() {
  const [images, setImages] = useState(initialImages);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedImages = localStorage.getItem("siteImages");
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("siteImages", JSON.stringify(images));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Kelola Media & Gambar</h1>
          <p className="text-gray-500 text-sm mt-1">Ganti gambar utama yang ditampilkan pada website melalui upload foto atau input URL.</p>
        </div>
        <button 
          onClick={handleSave}
          className="mt-4 md:mt-0 flex items-center px-6 py-2.5 bg-blue text-white font-medium rounded-lg hover:bg-blue-dark transition-all shadow-sm"
        >
          <Save size={18} className="mr-2" /> Simpan Perubahan
        </button>
      </div>

      {saved && (
        <div className="bg-blue/10 border border-blue/20 text-blue-dark px-4 py-3 rounded-lg mb-6 flex items-center">
          <CheckCircle2 size={18} className="mr-2" />
          Berhasil memperbarui gambar. Perubahan telah diterapkan di halaman utama.
        </div>
      )}

      <div className="space-y-6">
        <ImageUploadField
          title="Gambar Beranda (Hero Banner)"
          description="Gambar potret beresolusi tinggi ini mendominasi bagian paling atas pada Halaman Beranda. Berfungsi untuk menyambut audiens yang pertama kali mengunjungi website. Disarankan foto yang memperlihatkan wajah profesional."
          value={images.hero}
          onChange={(val: string) => setImages({...images, hero: val})}
          aspectRatioLabel="Rasio 1:1, Kotak"
          aspectClass="aspect-square"
        />

        <ImageUploadField
          title="Gambar Sekilas Profil (Beranda)"
          description="Gambar ini ditampilkan di bagian tengah Beranda, tepat pada blok teks ringkasan (Sekilas Tentang Saya). Cocok untuk foto saat presentasi, mengajar, atau berada di depan publik."
          value={images.aboutHero}
          onChange={(val: string) => setImages({...images, aboutHero: val})}
          aspectRatioLabel="Rasio 4:5, Potret"
          aspectClass="aspect-[4/5]"
        />

        <ImageUploadField
          title="Foto Utama Halaman Tentang"
          description="Foto profil formal yang akan dipasang di Halaman /tentang secara utuh. Gambar ini berada di samping teks narasi panjang profil diri, ideal untuk menanamkan kredibilitas dan kepercayaan pengunjung."
          value={images.profile}
          onChange={(val: string) => setImages({...images, profile: val})}
          aspectRatioLabel="Rasio 4:5, Potret"
          aspectClass="aspect-[4/5]"
        />

        <ImageUploadField
          title="Gambar Utama Blog (Featured)"
          description="Gambar ini ditampilkan pertama kali dengan ukuran besar di halaman Blog."
          value={images.blogFeatured}
          onChange={(val: string) => setImages({...images, blogFeatured: val})}
          aspectRatioLabel="Rasio 4:3, Landscape"
          aspectClass="aspect-[4/3]"
        />
      </div>
    </div>
  );
}
