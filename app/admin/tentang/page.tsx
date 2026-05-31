"use client";

import { useState, useEffect } from "react";
import { pageContentConfig, imagesConfig } from "@/lib/data";
import { Save, UploadCloud, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AdminTentangPage() {
  const [content, setContent] = useState(pageContentConfig.tentang);
  const [profileImage, setProfileImage] = useState(imagesConfig.profile);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "config", "tentang");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.content) setContent(data.content);
          if (data.profileImage) setProfileImage(data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "config", "tentang"), {
        content,
        profileImage
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const compressImage = (dataUrl: string, callback: (compressed: string) => void) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      const MAX_SIZE = 800;

      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = dataUrl;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        compressImage(reader.result as string, (compressed) => {
          setProfileImage(compressed);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Kelola Tentang Saya</h1>
          <p className="text-gray-500 text-sm mt-1">Ubah informasi teks dan gambar pada profil Anda.</p>
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
          Berhasil menyimpan informasi 'Tentang Saya'.
        </div>
      )}

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-8">
        
        {/* Gambar Profil */}
        <div>
          <h3 className="text-lg font-bold text-darker mb-4 border-b pb-2">Foto Profil</h3>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <Image src={profileImage || 'https://via.placeholder.com/400'} alt="Profile" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-sm text-gray-500 mb-4">Gunakan foto potret (rasio 4:5) dengan resolusi tinggi untuk tampilan terbaik.</p>
              
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue/20 border-dashed rounded-lg cursor-pointer bg-blue/5 hover:bg-blue/10 mb-4 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-2 text-blue" />
                  <p className="font-semibold text-blue text-sm">Klik untuk Cari File</p>
                  <p className="text-xs text-gray-500 mt-1">Mendukung JPG, PNG, WEBP (Potret)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>

              <div className="flex items-center gap-4 mb-4">
                 <hr className="flex-1 border-gray-200" />
                 <span className="text-xs text-gray-400 font-medium">ATAU</span>
                 <hr className="flex-1 border-gray-200" />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Gunakan URL Web</label>
                 <input 
                   type="text" 
                   value={profileImage} 
                   onChange={e => setProfileImage(e.target.value)} 
                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none text-sm" 
                   placeholder="https://..." 
                 />
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Teks */}
        <div>
          <h3 className="text-lg font-bold text-darker mb-4 border-b pb-2">Informasi Profil</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Paragraf</label>
              <input 
                type="text" 
                value={content.title} 
                onChange={e => setContent({...content, title: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none text-sm" 
                placeholder="Ex: Profil & Perjalanan Karir" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konten Paragraf</label>
              <textarea 
                rows={6}
                value={content.content} 
                onChange={e => setContent({...content, content: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none text-sm resize-none whitespace-pre-wrap" 
                placeholder="Tuliskan latar belakang dan narasi profil Anda di sini..." 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
