"use client";

import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Background3D from "./Background3D";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Background3D />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl shadow-2xl z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl shadow-2xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 max-w-2xl">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold text-sm animate-pulse-slow">
            Available for New Projects 🚀
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight font-sans tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Indramani Mishra</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
            Full Stack Developer (MERN & Next.js) bridging the gap between exceptional design and solid engineering.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={() => window.dispatchEvent(new Event('openEnquiry'))} className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 border-none outline-none">
              Hire Me <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="/FullStackIndramanideveloper.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 shadow-md">
              <Download size={20} /> Resume
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative group w-full max-w-md mx-auto aspect-square">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl rotate-6 scale-105 opacity-20 dark:opacity-30 group-hover:rotate-12 transition-transform duration-500"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gray-200 dark:bg-gray-800">
            <Image 
              src="/my_image.jpg" 
              alt="Indramani Mishra" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
