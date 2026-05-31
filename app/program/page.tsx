import DynamicProgramList from "@/components/DynamicProgramList";
import { pageContentConfig } from "@/lib/data";

export const metadata = {
  title: 'Program Pelatihan - Dr. Syahrizal, MA',
  description: 'Daftar program pelatihan Artificial Intelligence, metodologi penelitian, dan dakwah digital.',
};

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
        <DynamicProgramList />
      </section>
    </div>
  );
}
