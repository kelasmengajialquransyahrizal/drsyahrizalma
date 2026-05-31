import { articlesData, imagesConfig, pageContentConfig } from "@/lib/data";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Blog & Artikel - Dr. Syahrizal, MA',
  description: 'Artikel seputar Artificial Intelligence, Pendidikan Islam, dan Produktivitas.',
};

export default function BlogPage() {
  const content = pageContentConfig.publikasi;

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <section className="bg-blue-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{content.title}</h1>
          <p className="text-blue-light text-lg max-w-2xl mx-auto">
            {content.content}
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Featured Article */}
        {articlesData.length > 0 && (
          <div className="mb-16">
             <div className="text-sm font-bold text-blue uppercase tracking-wider mb-6">Artikel Unggulan</div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
               <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full rounded-3xl overflow-hidden shadow-lg">
                  <Image 
                    src={imagesConfig.blogFeatured} 
                    alt={articlesData[0].title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
               </div>
               <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span className="bg-blue/10 text-blue-dark px-3 py-1 rounded-full font-medium">{articlesData[0].category}</span>
                    <span>•</span>
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {articlesData[0].date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-darker mb-4 leading-tight">
                    <Link href={`/blog/${articlesData[0].id}`} className="hover:text-blue transition-colors">
                      {articlesData[0].title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                    {articlesData[0].excerpt}
                  </p>
                  <Link href={`/blog/${articlesData[0].id}`} className="inline-flex items-center font-bold text-blue hover:text-blue-dark transition-colors">
                    Baca Selengkapnya <ArrowRight size={18} className="ml-2" />
                  </Link>
               </div>
             </div>
          </div>
        )}

        <hr className="border-gray-100 mb-16" />

        {/* Article Grid */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-bold text-darker">Artikel Terbaru</h3>
            <div className="hidden sm:block text-sm text-gray-500">
              Menampilkan {articlesData.length} artikel
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesData.map((article) => (
              <article key={article.id} className="group">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <Image 
                    src={article.image || `https://picsum.photos/seed/${article.id}/600/400`}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                  <span className="text-blue font-semibold uppercase">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h4 className="text-xl font-bold text-darker mb-3 line-clamp-2 leading-snug group-hover:text-blue transition-colors">
                  <Link href={`/blog/${article.id}`}>
                    {article.title}
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock size={14} className="mr-1" /> {article.readTime}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
