import { LayoutDashboard, FileText, Settings, LogOut, Image as ImageIcon, MessageSquare, Calendar, User } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-darker text-gray-300 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white font-display">CPanel Admin</h2>
          <p className="text-xs text-blue-light mt-1">Status: Lokal Mode</p>
        </div>
        <nav className="flex-grow py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard size={20} className="mr-3" /> Dashboard
          </Link>
          <Link href="/admin/blog" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <FileText size={20} className="mr-3" /> Kelola Artikel
          </Link>
          <Link href="/admin/media" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <ImageIcon size={20} className="mr-3" /> Kelola Media
          </Link>
          <Link href="/admin/program" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Calendar size={20} className="mr-3" /> Kelola Program
          </Link>
          <Link href="/admin/tentang" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <User size={20} className="mr-3" /> Kelola Tentang Saya
          </Link>
          <Link href="/admin/halaman" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Settings size={20} className="mr-3" /> Kelola Teks Halaman
          </Link>
          <Link href="/admin/konsultasi" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <MessageSquare size={20} className="mr-3" /> Jadwal Konsultasi
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center px-4 py-2 hover:bg-gray-800 text-sm hover:text-white rounded-lg transition-colors">
            <LogOut size={16} className="mr-3" /> Kembali ke Web
          </Link>
        </div>
      </aside>

      {/* Mobile Header for Admin could go here */}

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
