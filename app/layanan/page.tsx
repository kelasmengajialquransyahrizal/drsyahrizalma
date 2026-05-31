import { servicesData, pageContentConfig } from "@/lib/data";
import { ArrowRight, BookOpen, Cpu, GraduationCap, Megaphone, Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Layanan - Dr. Syahrizal, MA',
  description: 'Layanan konsultasi pendidikan, pelatihan AI, dan pendampingan riset.',
};

export default function LayananPage() {
  const content = pageContentConfig.layanan;

  return (
    <div className="flex flex-col w-full">
      {/* HEADER PAGE */}
      <section className="bg-blue-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{content.title}</h1>
          <p className="text-blue-light text-lg max-w-2xl mx-auto">
            {content.content}
          </p>
        </div>
      </section>

      {/* DAFTAR LAYANAN */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-24">
          {servicesData.map((service, index) => {
            const Icon = {
              GraduationCap: GraduationCap,
              Cpu: Cpu,
              Megaphone: Megaphone,
              BookOpen: BookOpen
            }[service.icon as string] || GraduationCap;

            const isEven = index % 2 !== 0;

            return (
              <div key={service.id} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''} scroll-mt-24`}>
                <div className={`${isEven ? 'lg:order-2' : ''}`}>
                  <div className="w-16 h-16 bg-blue/10 text-blue rounded-2xl flex items-center justify-center mb-6">
                    <Icon size={32} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-darker mb-4">{service.title}</h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">{service.description}</p>
                  
                  <h4 className="font-bold text-darker mb-4 text-lg border-b pb-2">Manfaat yang Anda Dapatkan:</h4>
                  <ul className="space-y-3 mb-8">
                    {[1, 2, 3].map((_, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <Check size={20} className="text-blue shrink-0 mr-3 mt-0.5" />
                        <span>Analisis kebutuhan mendalam dan strategis.</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/kontak" className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-darker font-semibold rounded-full hover:border-blue hover:text-blue transition-all">
                    Konsultasikan Kebutuhan Anda <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>

                <div className={`relative h-96 rounded-3xl overflow-hidden shadow-xl bg-gray-100 ${isEven ? 'lg:order-1' : ''}`}>
                   {/* Placeholder for service image */}
                   <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <Icon size={120} strokeWidth={1} />
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-dark to-blue py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-6">Mulai Transformasi Institusi Anda</h2>
          <p className="text-blue-light mb-8 text-lg">Jadwalkan sesi konsultasi awal gratis selama 30 menit untuk mendiskusikan tantangan yang Anda hadapi.</p>
          <Link href="/kontak" className="inline-block px-8 py-4 bg-white text-blue-dark font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
            Booking Jadwal Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
