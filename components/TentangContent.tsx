"use client";

import { useState, useEffect } from "react";
import { pageContentConfig, imagesConfig } from "@/lib/data";
import DynamicImage from "@/components/DynamicImage";
import { CheckCircle2, Award, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

export default function TentangContent() {
  const [content, setContent] = useState(pageContentConfig.tentang);
  const [profileImage, setProfileImage] = useState(imagesConfig.profile);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "config", "tentang");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.content) setContent(data.content);
          if (data.profileImage) setProfileImage(data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* HEADER PAGE */}
      <section className="bg-blue-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Tentang Saya</h1>
          <p className="text-blue-light text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat perjalanan akademik, profesional, dan dedikasi dalam bidang pendidikan Islam dan teknologi.
          </p>
        </div>
      </section>

      {/* PROFIL LENGKAP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 sticky top-28">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-8 border-gray-50">
              <Image 
                src={profileImage || imagesConfig.profile} 
                alt="Dr. Syahrizal"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white font-bold text-2xl">Dr. Syahrizal, MA</h3>
                  <p className="text-gray-200">Akademisi & Konsultan Pendidikan</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-display font-bold text-darker mb-6">{content.title}</h2>
            <div className="prose prose-lg text-gray-600 mb-12">
              <p className="whitespace-pre-wrap">{content.content}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              {/* Pendidikan */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-darker mb-6 border-b pb-4">
                  <GraduationCap size={24} className="text-blue mr-3" /> Pendidikan
                </h3>
                <ul className="space-y-6">
                  <li className="relative pl-6 border-l-2 border-blue/30">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue"></span>
                    <h4 className="font-bold text-darker">S3 - Kajian Islam</h4>
                    <p className="text-gray-500 text-sm mb-1">Universitas Islam Negeri (2018 - 2021)</p>
                    <p className="text-sm text-gray-600">Disertasi: Transformasi Digital Pendidikan Pesantren</p>
                  </li>
                  <li className="relative pl-6 border-l-2 border-blue/30">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300"></span>
                    <h4 className="font-bold text-darker">S2 - Manajemen Pendidikan</h4>
                    <p className="text-gray-500 text-sm mb-1">Universitas Negeri (2014 - 2016)</p>
                  </li>
                </ul>
              </div>

              {/* Pengalaman */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-darker mb-6 border-b pb-4">
                  <Briefcase size={24} className="text-blue mr-3" /> Pengalaman
                </h3>
                <ul className="space-y-6">
                  <li className="relative pl-6 border-l-2 border-blue/30">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue"></span>
                    <h4 className="font-bold text-darker">Dosen Pascasarjana</h4>
                    <p className="text-gray-500 text-sm">2021 - Sekarang</p>
                  </li>
                  <li className="relative pl-6 border-l-2 border-blue/30">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300"></span>
                    <h4 className="font-bold text-darker">Konsultan Transformasi Akademik</h4>
                    <p className="text-gray-500 text-sm">2019 - 2021</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sertifikasi */}
            <div>
              <h3 className="flex items-center text-xl font-bold text-darker mb-6 border-b pb-4">
                <Award size={24} className="text-blue mr-3" /> Sertifikasi Profesi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Certified AI Educator (Google)",
                  "Sertifikasi Dosen Nasional",
                  "Trainer Metodologi Penelitian",
                  "Certified Digital Marketing Professional"
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <CheckCircle2 size={20} className="text-blue shrink-0 mr-3 mt-0.5" />
                    <span className="font-medium text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 text-center border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-darker mb-6">Tertarik Berkolaborasi?</h2>
          <p className="text-gray-600 mb-8">Saya terbuka untuk undangan sebagai narasumber, dosen tamu, maupun konsultan untuk pengembangan institusi Anda.</p>
          <Link href="/kontak" className="inline-block px-8 py-4 bg-blue text-white font-bold rounded-full hover:bg-blue-dark transition-all shadow-md">
            Hubungi Saya Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
