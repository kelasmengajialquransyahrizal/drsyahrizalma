"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/tentang" },
  { name: "Layanan", href: "/layanan" },
  { name: "Program", href: "/program" },
  { name: "Blog", href: "/blog" },
  { name: "Publikasi", href: "/publikasi" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${hasScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-xl md:text-2xl text-emerald-dark tracking-tight">
          Dr. Syahrizal<span className="text-gold">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald ${pathname === link.href ? "text-emerald font-semibold" : "text-gray-600"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/kontak" 
            className="px-5 py-2.5 bg-emerald text-white text-sm font-semibold rounded-full hover:bg-emerald-dark transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Konsultasi
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${pathname === link.href ? "text-emerald bg-emerald/5" : "text-gray-700 hover:text-emerald hover:bg-gray-50"}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Link
                  href="/kontak"
                  className="block w-full text-center px-5 py-3 bg-emerald text-white font-medium rounded-md hover:bg-emerald-dark transition-colors"
                >
                  Jadwalkan Konsultasi
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
