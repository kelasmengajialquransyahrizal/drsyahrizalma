"use client";

import { useState } from "react";
import { articlesData as initialArticles } from "@/lib/data";
import { Pen, Trash2, Plus, Edit } from "lucide-react";
import Image from "next/image";

export default function BlogAdminPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newArticle, setNewArticle] = useState({
    id: "",
    title: "",
    category: "",
    author: "Dr. Syahrizal, MA",
    image: "",
    excerpt: ""
  });

  const handleDelete = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.id) return;
    
    setArticles([{
      ...newArticle,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      readTime: "5 Menit"
    }, ...articles]);
    
    setIsAdding(false);
    setNewArticle({ id: "", title: "", category: "", author: "Dr. Syahrizal, MA", image: "", excerpt: "" });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Kelola Artikel</h1>
          <p className="text-gray-500 text-sm mt-1">Tambah, edit, atau hapus publikasi blog.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emerald-dark transition-colors"
        >
          {isAdding ? "Batal" : <><Plus size={18} className="mr-2" /> Tambah Artikel Baru</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald/30 mb-8">
          <h3 className="text-lg font-bold mb-4">Tulis Artikel Baru</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
                 <input type="text" required value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value, id: e.target.value.toLowerCase().replace(/\\s+/g, '-')})} className="w-full px-3 py-2 border rounded-md" placeholder="Contoh: Manfaat AI..." />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                 <input type="text" value={newArticle.category} onChange={e => setNewArticle({...newArticle, category: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="Contoh: Teknologi Pendidikan" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Kutipan / Deskripsi Singkat</label>
                 <input type="text" value={newArticle.excerpt} onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="Deskripsi..." />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (Featured Image)</label>
                 <input type="text" value={newArticle.image} onChange={e => setNewArticle({...newArticle, image: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="https://picsum.photos/..." />
               </div>
            </div>
            {/* Editor placeholder */}
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Konten Lengkap</label>
               <textarea rows={5} className="w-full px-3 py-2 border rounded-md" placeholder="Tulis konten artikel di sini... (Mode text area kasar)"></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-emerald text-white rounded-md font-medium hover:bg-emerald-dark">
                Simpan & Publikasikan
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 font-medium text-gray-500">Judul & Detail</th>
              <th className="px-6 py-4 font-medium text-gray-500 hidden md:table-cell">Kategori</th>
              <th className="px-6 py-4 font-medium text-gray-500 hidden lg:table-cell">Tanggal</th>
              <th className="px-6 py-4 font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0 mr-4 relative hidden sm:block">
                      <Image src={article.image || `https://picsum.photos/seed/${article.id}/100/100`} alt={article.title} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-bold text-darker line-clamp-1">{article.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{article.author}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="bg-emerald/10 text-emerald-dark px-2 py-1 rounded text-xs font-medium">{article.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">{article.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-emerald transition-colors" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Hapus">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada artikel.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
