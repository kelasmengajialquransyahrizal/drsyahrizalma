"use client";

import { useState, useEffect } from "react";
import { Trash2, MessageSquare, Mail, Phone, Calendar } from "lucide-react";

export default function AdminKonsultasiPage() {
  const [konsultasi, setKonsultasi] = useState<any[]>([]);

  useEffect(() => {
    // Load from localStorage
    const saved = JSON.parse(localStorage.getItem("konsultasiData") || "[]");
    setKonsultasi(saved);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Hapus jadwal konsultasi ini?")) {
      const updated = konsultasi.filter(item => item.id !== id);
      setKonsultasi(updated);
      localStorage.setItem("konsultasiData", JSON.stringify(updated));
    }
  };

  const updateStatus = (id: string, newStatus: string) => {
    const updated = konsultasi.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    setKonsultasi(updated);
    localStorage.setItem("konsultasiData", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Jadwal Konsultasi</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar permintaan konsultasi dari pengguna website.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">Semua Permintaan</h2>
          <span className="bg-blue/10 text-blue-dark px-3 py-1 rounded-full text-sm font-semibold">
            {konsultasi.length} Total
          </span>
        </div>

        {konsultasi.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <MessageSquare size={48} className="text-gray-300 mb-4" />
            <p className="text-lg">Belum ada permintaan konsultasi.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {konsultasi.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between w-full">
                  <div className="flex-grow pr-0 md:pr-6">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg font-bold text-darker">{item.name}</h3>
                       <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                         item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                         item.status === 'Ditolak' ? 'bg-red-100 text-red-800' :
                         'bg-amber-100 text-amber-800'
                       }`}>
                         {item.status || "Pending"}
                       </span>
                    </div>
                    {item.institution && <p className="text-sm text-gray-500 mb-4">{item.institution}</p>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        <a href={`mailto:${item.email}`} className="hover:text-blue">{item.email}</a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        <a href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-blue">{item.phone}</a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span>Dikirim {item.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-semibold mr-1">Topik:</span> {item.topic}
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                      {item.message}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-row md:flex-col items-center justify-end md:items-end space-x-2 md:space-x-0 md:space-y-2 shrink-0">
                    <select 
                      value={item.status || "Pending"}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue text-gray-700 bg-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                    
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Hapus Permintaan"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
