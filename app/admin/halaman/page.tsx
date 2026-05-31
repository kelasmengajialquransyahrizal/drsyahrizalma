"use client";

import { useState } from "react";
import { pageContentConfig as initialContent } from "@/lib/data";
import { CheckCircle2, Save, FileText } from "lucide-react";

export default function HalamanAdminPage() {
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('beranda');

  const handleSave = () => {
    // In a real application, this would dispatch to an API route to update a database.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentData = content[activeTab as keyof typeof content];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Kelola Teks Halaman</h1>
          <p className="text-gray-500 text-sm mt-1">Ubah judul dan deskripsi utama pada setiap halaman.</p>
        </div>
        <button 
          onClick={handleSave}
          className="mt-4 md:mt-0 flex items-center px-6 py-2.5 bg-blue text-white font-medium rounded-lg hover:bg-blue-dark transition-all"
        >
          <Save size={18} className="mr-2" /> Simpan Perubahan
        </button>
      </div>

      {saved && (
        <div className="bg-blue/10 border border-blue/20 text-blue-dark px-4 py-3 rounded-lg mb-6 flex items-center">
          <CheckCircle2 size={18} className="mr-2" />
          Berhasil menyimpan konfigurasi konten teks terbaru. (Simulasi)
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {Object.keys(content).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize flex-shrink-0 ${activeTab === tab ? 'text-blue border-b-2 border-blue' : 'text-gray-500 hover:text-darker'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6 text-gray-700">
          <FileText className="mr-3 text-blue" size={24} />
          <h2 className="text-xl font-bold capitalize">Konten Halaman: {activeTab}</h2>
        </div>

        <div className="space-y-6">
          {Object.keys(currentData).map((fieldKey) => (
            <div key={fieldKey}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {fieldKey.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {fieldKey.toLowerCase().includes('text') || fieldKey.toLowerCase().includes('content') || fieldKey.toLowerCase().includes('subtitle') ? (
                <textarea 
                  rows={4}
                  value={(currentData as any)[fieldKey]} 
                  onChange={(e) => setContent({
                    ...content, 
                    [activeTab]: {
                      ...currentData,
                      [fieldKey]: e.target.value
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue/50 focus:ring-1 focus:ring-blue/50"
                />
              ) : (
                <input 
                  type="text" 
                  value={(currentData as any)[fieldKey]} 
                  onChange={(e) => setContent({
                    ...content, 
                    [activeTab]: {
                      ...currentData,
                      [fieldKey]: e.target.value
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue/50 focus:ring-1 focus:ring-blue/50"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
