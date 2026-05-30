import Link from "next/link";
import Image from "next/image";
import { statsData, servicesData, testimonialsData } from "@/lib/data";
import { ArrowRight, BookOpen, Cpu, GraduationCap, Megaphone, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden bg-gray-50 flex items-center justify-center">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23059669\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="flex flex-col items-start text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald/10 text-emerald-dark font-medium text-sm mb-6 border border-emerald/20">
              Transformasi Digital & Literasi AI
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-darker leading-tight mb-6">
              Membangun <span className="text-emerald">Peradaban</span> melalui Pendidikan & Teknologi
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Saya membantu institusi pendidikan, pesantren, dan pendidik profesional beradaptasi di era Society 5.0 melalui optimalisasi Artificial Intelligence dan strategi dakwah digital yang mencerahkan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kontak" className="px-6 py-3.5 bg-emerald text-white font-semibold rounded-full hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/30 flex items-center">
                Jadwalkan Konsultasi <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link href="/program" className="px-6 py-3.5 bg-white text-darker border border-gray-200 font-semibold rounded-full hover:border-emerald hover:text-emerald transition-all duration-300">
                Lihat Program
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-emerald-light to-gold p-1 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white relative">
                {/* Fallback image */}
                <Image 
                  src="https://picsum.photos/seed/akademisi/600/600" 
                  alt="Dr. Syahrizal, MA"
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-emerald-dark py-12 relative z-20 -mt-8 mx-4 sm:mx-6 lg:mx-auto lg:w-full lg:max-w-6xl rounded-2xl shadow-xl overflow-hidden text-center md:text-left">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</span>
              <span className="text-emerald-light text-sm font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ABOUT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative h-96 rounded-2xl overflow-hidden shadow-lg order-2 md:order-1 mt-8 md:mt-0">
             <Image 
                src="https://picsum.photos/seed/seminar/800/1000" 
                alt="Seminar Dr. Syahrizal"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-darker mb-6">Dedikasi untuk <span className="text-emerald">Pendidikan Islam</span> Modern</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Dr. Syahrizal, MA adalah seorang akademisi, peneliti, dan praktisi pendidikan yang berfokus pada integrasi nilai-nilai Islam dengan inovasi teknologi. Dengan pengalaman lebih dari satu dekade, beliau aktif menjembatani kesenjangan digital di pesantren dan institusi pendidikan tinggi.
            </p>
            <ul className="space-y-3 mb-8">
              {["Pendekatan berbasis riset (Research-based)", "Spesialisasi integrasi AI dalam kurikulum", "Penggerak ekosistem pesantren digital", "Trainer bersertifikat internasional"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <CheckCircle2 size={20} className="text-emerald mr-3 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
             <Link href="/tentang" className="inline-flex items-center text-emerald font-semibold hover:text-emerald-dark transition-colors">
                Baca Profil Lengkap <ArrowRight size={18} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8 w-full border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-darker mb-4">Layanan & Keahlian</h2>
            <p className="text-gray-600">Solusi strategis dan praktis untuk kebutuhan transformasi institusi, peningkatan kapasitas SDM, dan personal branding akademik.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service) => {
              const Icon = {
                GraduationCap: GraduationCap,
                Cpu: Cpu,
                Megaphone: Megaphone,
                BookOpen: BookOpen
              }[service.icon as string] || GraduationCap;

              return (
                <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald/20 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald group-hover:text-white transition-colors">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-darker mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>
                  <Link href={`/layanan#${service.id}`} className="text-emerald text-sm font-semibold inline-flex items-center group-hover:underline">
                    Pelajari <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-darker mb-4">Apa Kata Mereka</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonialsData.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm italic relative">
              <span className="text-6xl text-gray-200 font-serif absolute top-4 left-4 leading-none select-none">"</span>
              <p className="text-gray-700 relative z-10 mb-6 leading-relaxed pt-4">{t.text}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4 relative">
                  <Image src={`https://picsum.photos/seed/${t.id}/100/100`} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-darker">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
