"use client";

import { useState, useRef } from "react";
import { articlesData as initialArticles } from "@/lib/data";
import { Pen, Trash2, Plus, Edit, Bold, Italic, Underline, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function BlogAdminPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const emptyArticle = {
    id: "",
    title: "",
    category: "",
    author: "Dr. Syahrizal, MA",
    image: "",
    excerpt: "",
    content: ""
  };
  
  const [currentDraft, setCurrentDraft] = useState(emptyArticle);

  const handleDelete = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  const openAddForm = () => {
    setCurrentDraft(emptyArticle);
    setEditingId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (article: any) => {
    setCurrentDraft({ ...article, content: article.content || "" });
    setEditingId(article.id);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDraft.title) return;
    
    if (editingId) {
      setArticles(articles.map(a => a.id === editingId ? { ...a, ...currentDraft } : a));
    } else {
      const newId = currentDraft.title.toLowerCase().replace(/\s+/g, '-');
      setArticles([{
        ...currentDraft,
        id: newId,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        readTime: "5 Menit"
      }, ...articles]);
    }
    
    setIsFormOpen(false);
    setCurrentDraft(emptyArticle);
    setEditingId(null);
  };

  const insertFormat = (format: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = currentDraft.content || "";
    
    let newText = "";
    let cursorOffsetStart = 0;
    let cursorOffsetEnd = 0;

    switch (format) {
      case 'bold':
        newText = text.substring(0, start) + "**" + text.substring(start, end) + "**" + text.substring(end);
        cursorOffsetStart = start + 2;
        cursorOffsetEnd = end + 2;
        break;
      case 'italic':
        newText = text.substring(0, start) + "_" + text.substring(start, end) + "_" + text.substring(end);
        cursorOffsetStart = start + 1;
        cursorOffsetEnd = end + 1;
        break;
      case 'underline':
        newText = text.substring(0, start) + "<u>" + text.substring(start, end) + "</u>" + text.substring(end);
        cursorOffsetStart = start + 3;
        cursorOffsetEnd = end + 3;
        break;
      case 'link':
        newText = text.substring(0, start) + "[" + text.substring(start, end) + "](url)" + text.substring(end);
        cursorOffsetStart = start + 1;
        cursorOffsetEnd = end + 1;
        break;
      case 'image':
        newText = text.substring(0, start) + "![" + text.substring(start, end) + "](image-url)" + text.substring(end);
        cursorOffsetStart = start + 2;
        cursorOffsetEnd = end + 2;
        break;
    }

    setCurrentDraft({...currentDraft, content: newText});
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorOffsetStart, cursorOffsetEnd);
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-darker">Kelola Artikel</h1>
          <p className="text-gray-500 text-sm mt-1">Tambah, edit, atau hapus publikasi blog.</p>
        </div>
        <button 
          onClick={isFormOpen ? () => setIsFormOpen(false) : openAddForm}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emerald-dark transition-colors"
        >
          {isFormOpen ? "Batal" : <><Plus size={18} className="mr-2" /> Tambah Artikel Baru</>}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald/30 mb-8">
          <h3 className="text-lg font-bold mb-4">{editingId ? "Edit Artikel" : "Tulis Artikel Baru"}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
                 <input type="text" required value={currentDraft.title} onChange={e => setCurrentDraft({...currentDraft, title: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="Contoh: Manfaat AI..." />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                 <input type="text" value={currentDraft.category} onChange={e => setCurrentDraft({...currentDraft, category: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="Contoh: Teknologi Pendidikan" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Kutipan / Deskripsi Singkat</label>
                 <input type="text" value={currentDraft.excerpt || ""} onChange={e => setCurrentDraft({...currentDraft, excerpt: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="Deskripsi..." />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (Featured Image)</label>
                 <input type="text" value={currentDraft.image || ""} onChange={e => setCurrentDraft({...currentDraft, image: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="https://picsum.photos/..." />
               </div>
            </div>
            
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Konten Lengkap</label>
               {/* Toolbar */}
               <div className="flex items-center space-x-1 p-2 bg-gray-50 border border-b-0 border-gray-300 rounded-t-md">
                 <button type="button" onClick={() => insertFormat('bold')} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-darker rounded" title="Bold">
                   <Bold size={16} />
                 </button>
                 <button type="button" onClick={() => insertFormat('italic')} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-darker rounded" title="Italic">
                   <Italic size={16} />
                 </button>
                 <button type="button" onClick={() => insertFormat('underline')} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-darker rounded" title="Underline">
                   <Underline size={16} />
                 </button>
                 <div className="w-px h-4 bg-gray-300 mx-2"></div>
                 <button type="button" onClick={() => insertFormat('link')} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-darker rounded" title="Link">
                   <LinkIcon size={16} />
                 </button>
                 <button type="button" onClick={() => insertFormat('image')} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-darker rounded" title="Image">
                   <ImageIcon size={16} />
                 </button>
                 <span className="text-xs text-gray-400 ml-4 hidden sm:inline-block">Format berbasis Markdown/HTML</span>
               </div>
               <textarea 
                  ref={contentRef}
                  value={currentDraft.content || ""}
                  onChange={e => setCurrentDraft({...currentDraft, content: e.target.value})}
                  rows={8} 
                  className="w-full px-3 py-3 border border-gray-300 rounded-b-md focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 shadow-inner" 
                  placeholder="Tulis konten artikel di sini..."
               ></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-emerald text-white rounded-md font-medium hover:bg-emerald-dark transition-colors">
                {editingId ? "Simpan Perubahan" : "Simpan & Publikasikan"}
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
                    <button onClick={() => openEditForm(article)} className="text-gray-400 hover:text-emerald transition-colors" title="Edit">
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
