"use client";

import { useEffect, useState } from "react";
import { Clock, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { programsData } from "@/lib/data";

export default function DynamicProgramList() {
  const [programs, setPrograms] = useState(programsData);
  const [filter, setFilter] = useState("Semua Kategori");

  useEffect(() => {
    const saved = localStorage.getItem("sitePrograms");
    if (saved) {
      try {
        setPrograms(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Extract unique categories for filter tabs
  const categories = ["Semua Kategori", ...Array.from(new Set(programs.map((p) => p.category)))];

  const filteredPrograms = filter === "Semua Kategori" ? programs : programs.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
         <h3 className="font-bold text-darker mb-4 md:mb-0 ml-2">Semua Program ({programs.length})</h3>
         <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
           {categories.map((cat, idx) => (
             <button 
               key={idx}
               onClick={() => setFilter(cat)}
               className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                 filter === cat 
                   ? "bg-blue text-white" 
                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
               }`}
             >
               {cat}
             </button>
           ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-48 bg-blue/10 flex flex-col justify-between">
               {program.image ? (
                 <Image src={program.image} alt={program.title} fill className="object-cover" referrerPolicy="no-referrer" />
               ) : (
                 <div className="flex-1 flex items-center justify-center p-6 bg-blue-dark/5">
                    <div className="text-4xl font-display font-black text-blue/20 absolute -right-4 -bottom-4">AI</div>
                 </div>
               )}
               <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
               <span className="bg-white text-blue text-xs font-bold px-3 py-1 rounded-full absolute top-4 left-4 shadow-sm z-10">
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
    </>
  );
}
