import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { Copyleft, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-darker text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="font-display font-bold text-2xl text-white tracking-tight mb-4 block">
              Dr. Syahrizal<span className="text-gold">.</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li><Link href="/tentang" className="text-sm hover:text-blue transition-colors">Tentang Saya</Link></li>
              <li><Link href="/layanan" className="text-sm hover:text-blue transition-colors">Layanan Konsultasi</Link></li>
              <li><Link href="/program" className="text-sm hover:text-blue transition-colors">Program Pelatihan</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-blue transition-colors">Blog & Artikel</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Layanan Utama</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">Pelatihan AI Pendidikan</li>
              <li className="text-sm text-gray-400">Konsultasi Pesantren</li>
              <li className="text-sm text-gray-400">Dakwah Digital</li>
              <li className="text-sm text-gray-400">Publikasi Akademik</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-400">
                <MapPin size={18} className="mr-2 text-blue shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Phone size={18} className="mr-2 text-blue shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Mail size={18} className="mr-2 text-blue shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0 flex items-center">
            &copy; {new Date().getFullYear()} Dr. Syahrizal, MA. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4">
             <Link href="/admin" className="text-xs text-gray-600 hover:text-gray-300 transition-colors">
               Admin Login
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
