"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, Image as ImageIcon, CheckCircle2, UploadCloud, X } from "lucide-react";
import { programsData as initialPrograms } from "@/lib/data";
import Image from "next/image";

export default function AdminProgramPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPrograms = localStorage.getItem("sitePrograms");
    if (savedPrograms) {
      try {
        setPrograms(JSON.parse(savedPrograms));
      } catch (e) {}
    } else {
      setPrograms(initialPrograms);
    }
  }, []);

  const saveToStorage = (newPrograms: any[]) => {
    setPrograms(newPrograms);
    localStorage.setItem("sitePrograms", JSON.stringify(newPrograms));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus program ini?")) {
      const updated = programs.filter(p => p.id !== id);
      saveToStorage(updated);
    }
  };

  const handleEdit = (program: any) => {
    setEditingProgram({ ...program });
    setIsNew(false);
  };

  const handleAdd = () => {
    setEditingProgram({
      id: "program-" + Date.now(),
      title: "",
      category: "",
      description: "",
      duration: "",
      format: "",
      target: "",
      image: ""
    });
    setIsNew(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram.title) return;

    let updated;
    if (isNew) {
      updated = [...programs, editingProgram];
    } else {
      updated = programs.map(p => p.id === editingProgram.id ? editingProgram : p);
    }
    
    saveToStorage(updated);
    setEditingProgram(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProgram({ ...editingProgram, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Kelola Program</h1>
          <p className="text-gray-500 text-sm mt-1">Tambah, ubah, dan hapus program pelatihan / inisiatif.</p>
        </div>
        {!editingProgram && (
          <button 
            onClick={handleAdd}
            className="mt-4 md:mt-0 flex items-center px-5 py-2.5 bg-blue text-white font-medium rounded-lg hover:bg-blue-dark transition-all"
          >
            <Plus size={18} className="mr-2" /> Tambah Program Baru
          </button>
        )}
      </div>

      {saved && !editingProgram && (
        <div className="bg-blue/10 border border-blue/20 text-blue-dark px-4 py-3 rounded-lg mb-6 flex items-center">
          <CheckCircle2 size={18} className="mr-2" />
          Berhasil menyimpan perubahan data program.
        </div>
      )}

      {editingProgram ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-darker">{isNew ? "Tambah Program" : "Edit Program"}</h2>
             <button onClick={() => setEditingProgram(null)} className="text-gray-400 hover:text-gray-700">
               <X size={24} />
             </button>
           </div>
           
           <form onSubmit={handleSaveForm} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Program</label>
                  <input required type="text" value={editingProgram.title} onChange={e => setEditingProgram({...editingProgram, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <input required type="text" value={editingProgram.category} onChange={e => setEditingProgram({...editingProgram, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none" placeholder="Misal: Teknologi Pendidikan" />
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
                  <input required type="text" value={editingProgram.duration} onChange={e => setEditingProgram({...editingProgram, duration: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none" placeholder="Misal: 2 Hari" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <input required type="text" value={editingProgram.format} onChange={e => setEditingProgram({...editingProgram, format: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none" placeholder="Misal: Online / Offline" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Peserta</label>
                  <input required type="text" value={editingProgram.target} onChange={e => setEditingProgram({...editingProgram, target: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none" placeholder="Misal: Mahasiswa" />
               </div>
             </div>
             
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Program</label>
                <textarea required rows={4} value={editingProgram.description} onChange={e => setEditingProgram({...editingProgram, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none resize-none"></textarea>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Program Utama</label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-1/3">
                    <div className="relative aspect-[4/3] w-full rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                       {editingProgram.image ? (
                          <Image src={editingProgram.image} alt="Preview" fill className="object-cover" referrerPolicy="no-referrer" />
                       ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                             <ImageIcon size={32} />
                          </div>
                       )}
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                     <p className="text-xs text-gray-500 mb-4">Gunakan rasio 4:3. Anda bisa mengunggah file dari perangkat atau menyisipkan URL langsung.</p>
                     
                     <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-blue/20 border-dashed rounded-lg cursor-pointer bg-blue/5 hover:bg-blue/10 mb-4">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-6 h-6 mb-2 text-blue" />
                          <p className="text-sm font-semibold text-blue">Klik untuk Upload Gambar</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                     </label>

                     <input 
                        type="text" 
                        value={editingProgram.image} 
                        onChange={e => setEditingProgram({...editingProgram, image: e.target.value})} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue outline-none text-sm" 
                        placeholder="Atau masukkan URL gambar https://..." 
                     />
                  </div>
                </div>
             </div>

             <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
               <button type="button" onClick={() => setEditingProgram(null)} className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">
                 Batal
               </button>
               <button type="submit" className="px-5 py-2.5 bg-blue text-white hover:bg-blue-dark rounded-lg font-medium flex items-center">
                 <Save size={18} className="mr-2" /> Simpan Program
               </button>
             </div>
           </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           {programs.length === 0 ? (
             <div className="p-10 text-center text-gray-500">Belum ada program ditambahkan.</div>
           ) : (
             <div className="divide-y divide-gray-100">
                {programs.map((p) => (
                  <div key={p.id} className="p-6 flex flex-col md:flex-row hover:bg-gray-50 items-center justify-between gap-6 transition-colors">
                     <div className="flex items-center gap-6 w-full">
                       <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {p.image ? (
                             <Image src={p.image} alt={p.title} fill className="object-cover" referrerPolicy="no-referrer" />
                          ) : (
                             <div className="flex justify-center items-center h-full text-gray-300 bg-gray-50"><ImageIcon size={24} /></div>
                          )}
                       </div>
                       <div className="flex-1">
                          <h3 className="font-bold text-lg text-darker">{p.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                             <span className="bg-blue/10 text-blue font-semibold px-2 py-0.5 rounded text-xs">{p.category}</span>
                             <span>• {p.duration}</span>
                             <span>• {p.format}</span>
                          </div>
                       </div>
                     </div>
                     <div className="flex space-x-2 w-full md:w-auto justify-end shrink-0">
                        <button onClick={() => handleEdit(p)} className="p-2 text-gray-500 hover:text-blue hover:bg-blue/10 rounded-lg transition-colors">
                           <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                           <Trash2 size={18} />
                        </button>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      )}
    </div>
  );
}
