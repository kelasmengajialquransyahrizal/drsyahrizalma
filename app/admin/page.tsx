import { LogOut } from "lucide-react";

export const metadata = {
  title: 'Admin Dashboard - Dr. Syahrizal, MA',
};

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-darker">Dashboard Summary</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Welcome, Dr. Syahrizal</span>
          <div className="w-10 h-10 bg-blue text-white rounded-full flex items-center justify-center font-bold">DR</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {["Total Artikel", "Konsultasi Pending", "Total Publikasi", "Peserta Pelatihan"].map((label, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-darker">{[45, 12, 18, 540][i]}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded ${i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-blue/10 text-blue-dark'}`}>
                {i === 1 ? 'Action Needed' : '+12%'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-center max-w-lg">
          <LogOut size={48} className="mx-auto text-blue-dark mb-4" />
          <h3 className="text-xl font-bold text-darker mb-2">Sistem CPanel (Admin Panel) Tersedia</h3>
          <p className="text-gray-500 mb-6">
            Gunakan menu di sebelah kiri untuk mengelola konten website Anda. Anda sekarang dapat menambah/mengedit artikel pada menu <strong>Kelola Artikel</strong> dan menukar gambar pada menu <strong>Kelola Media</strong>. 
          </p>
          <p className="text-xs text-gray-400">
            Catatan: Karena belum terhubung dengan backend Database permanen (seperti PostgreSQL/Supabase), perubahan bersifat simulasi frontend atau lokal. Untuk produksi penuh, integrasi API akan mem-bypass konfigurasi ini ke database permanen.
          </p>
        </div>
      </div>
    </div>
  );
}
