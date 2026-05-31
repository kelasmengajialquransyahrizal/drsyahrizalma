import { Calendar, Users, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { pageContentConfig } from "@/lib/data";

export const metadata = {
  title: 'Program Pelatihan - Dr. Syahrizal, MA',
  description: 'Daftar program pelatihan Artificial Intelligence, metodologi penelitian, dan dakwah digital.',
};

const programs = [
  {
    id: "ai-guru",
    title: "Pelatihan AI untuk Guru & Dosen",
    category: "Teknologi Pendidikan",
    duration: "2 Hari Penuh",
    format: "Hybrid (Online/Offline)",
    target: "Pendidik, Dosen, Guru Sekolah",
    description: "Membekali pendidik dengan keterampilan praktis menggunakan ChatGPT, Claude, dan tools AI lainnya untuk mempercepat penyusunan RPP, silabus, dan media evaluasi."
  },
  {
    id: "ai-pesantren",
    title: "Kickstart AI untuk Pesantren",
    category: "Transformasi Digital",
    duration: "1 Hari Intensif",
    format: "Offline",
    target: "Pengurus Pesantren, Asatidz",
    description: "Workshop khusus untuk mengintegrasikan teknologi modern dalam manajemen administrasi pesantren tanpa menghilangkan tradisi keilmuan klasik."
  },
  {
    id: "prompt-engineering",
    title: "Mastering Prompt Engineering for Research",
    category: "Akademik & Riset",
    duration: "4 Sesi (Zoom)",
    format: "Online",
    target: "Mahasiswa S2/S3, Peneliti",
    description: "Teknik tingkat lanjut merumuskan prompt untuk mempercepat literature review, analisis data kualitatif, dan drafting jurnal internasional berbahasa Inggris."
  }
];

export default function ProgramPage() {
  const content = pageContentConfig.program;

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen">
      {/* HEADER PAGE */}
      <section className="bg-blue-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{content.title}</h1>
          <p className="text-blue-light text-lg max-w-2xl mx-auto">
            {content.content}
          </p>
        </div>
      </section>

      {/* FILTER & LIST */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-darker mb-4 md:mb-0 ml-2">Semua Program ({programs.length})</h3>
           <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
             <button className="px-4 py-2 bg-blue text-white text-sm font-medium rounded-full whitespace-nowrap">Semua Kategori</button>
             <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium rounded-full whitespace-nowrap">Teknologi Pendidikan</button>
             <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium rounded-full whitespace-nowrap">Riset Akademik</button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 bg-blue/10 flex items-center justify-center p-6">
                 {/* Visual Placeholder */}
                 <div className="text-4xl font-display font-black text-blue/20 absolute -right-4 -bottom-4">AI</div>
                 <span className="bg-white text-blue text-xs font-bold px-3 py-1 rounded-full absolute top-4 left-4 shadow-sm">
                   {program.category}
                 </span>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-darker mb-3 leading-tight">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{program.description}</p>
                
                <div className="space-y-3 mb-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2 text-blue shrink-0" /> {program.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2 text-blue shrink-0" /> {program.format}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={16} className="mr-2 text-blue shrink-0" /> {program.target}
                  </div>
                </div>

                <Link href={`/kontak?program=${program.id}`} className="w-full text-center px-4 py-2.5 bg-blue-dark/5 text-blue-dark font-semibold rounded-lg hover:bg-blue hover:text-white transition-colors flex items-center justify-center">
                  Daftar Sekarang <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
