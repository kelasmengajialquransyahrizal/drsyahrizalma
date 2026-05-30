import { LayoutDashboard, FileText, Users, Calendar, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Admin Dashboard - Dr. Syahrizal, MA',
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-darker text-gray-300 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white font-display">Admin Panel</h2>
        </div>
        <nav className="flex-grow py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 bg-emerald/20 text-emerald-light rounded-lg font-medium">
            <LayoutDashboard size={20} className="mr-3" /> Dashboard
          </Link>
          <Link href="/admin" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <FileText size={20} className="mr-3" /> Blog & Artikel
          </Link>
          <Link href="/admin" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Calendar size={20} className="mr-3" /> Jadwal Konsultasi
          </Link>
          <Link href="/admin" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Users size={20} className="mr-3" /> Data Peserta
          </Link>
          <Link href="/admin" className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Settings size={20} className="mr-3" /> Pengaturan SEO
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center px-4 py-2 hover:bg-gray-800 text-sm hover:text-white rounded-lg transition-colors">
            <LogOut size={16} className="mr-3" /> Kembali ke Web
          </Link>
        </div>
      </aside>

      {/* Main Content Placeholder */}
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-darker">Dashboard Summary</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Dr. Syahrizal</span>
              <div className="w-10 h-10 bg-emerald text-white rounded-full flex items-center justify-center font-bold">DR</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {["Total Artikel", "Konsultasi Pending", "Total Publikasi", "Peserta Pelatihan"].map((label, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-darker">{[45, 12, 18, 540][i]}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald/10 text-emerald-dark'}`}>
                    {i === 1 ? 'Action Needed' : '+12%'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LogOut size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-darker mb-2">Sistem Database (Supabase / Postgres) Belum Dikonfigurasi</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Tampilan ini adalah wireframe UI untuk Admin Panel. Untuk mengelola data secara dinamis, integrasi database perlu disiapkan.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
