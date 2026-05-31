import { BookOpen, FileText, Download, ExternalLink } from "lucide-react";

export const metadata = {
  title: 'Publikasi & Karya Ilmiah - Dr. Syahrizal, MA',
  description: 'Daftar jurnal, buku, dan karya ilmiah Dr. Syahrizal, MA.',
};

const publications = [
  {
    id: 1,
    title: "Implementasi Artificial Intelligence dalam Kurikulum Pendidikan Pesantren di Era Society 5.0",
    journal: "Jurnal Pendidikan Islam Internasional",
    year: "2025",
    type: "Jurnal Internasional",
    doi: "10.1234/jpii.2025.01",
    link: "#"
  },
  {
    id: 2,
    title: "Strategi Dakwah Digital Melalui Media Sosial: Pendekatan Kultural pada Generasi Z",
    journal: "Jurnal Komunikasi Penyiaran Islam",
    year: "2024",
    type: "Jurnal Nasional Sinta 2",
    doi: "10.5678/jkpi.2024.12",
    link: "#"
  },
  {
    id: 3,
    title: "Model Pendampingan Guru Madrasah Menggunakan ChatGPT untuk Penyusunan RPP Cepat",
    journal: "Prosiding Konferensi Nasional Teknologi Pendidikan",
    year: "2024",
    type: "Prosiding",
    doi: "",
    link: "#"
  }
];

export default function PublikasiPage() {
  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen">
      <section className="bg-blue-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Publikasi Akademik</h1>
          <p className="text-blue-light text-lg max-w-2xl mx-auto">
            Arsip karya ilmiah, jurnal bereputasi, dan buku referensi pendidikan.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-darker w-full md:w-auto">Daftar Publikasi (2024-2026)</h2>
            <div className="w-full md:w-auto mt-4 md:mt-0 flex space-x-2">
              <button className="px-3 py-1.5 bg-blue/10 text-blue-dark text-sm rounded-md font-medium">Semua</button>
              <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 text-sm rounded-md transition-colors">Jurnal</button>
              <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 text-sm rounded-md transition-colors">Buku</button>
            </div>
          </div>

          <div className="space-y-8">
            {publications.map((pub) => (
              <div key={pub.id} className="group pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-start">
                  <div className="mt-1 bg-gray-100 text-blue-dark p-2 rounded-lg mr-4 group-hover:bg-blue group-hover:text-white transition-colors shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue/5 text-blue text-xs font-bold rounded mb-2">
                      {pub.type} • {pub.year}
                    </span>
                    <h3 className="text-lg font-bold text-darker mb-2 leading-tight">
                      {pub.title}
                    </h3>
                    <p className="text-gray-500 text-sm italic mb-4">{pub.journal}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {pub.doi && (
                        <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          DOI: {pub.doi}
                        </div>
                      )}
                      <a href={pub.link} className="flex items-center text-xs font-semibold text-blue hover:text-blue-dark transition-colors">
                        Lihat Sumber <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
