"use client";

import { ArrowRight, FileText, Download } from "lucide-react";
import Image from "next/image";
import Background3D from "./Background3D";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-36 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Background3D />
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-400/5 blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-6 text-center lg:text-left max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-bold text-xs border border-blue-100 dark:border-blue-900/50 shadow-sm animate-pulse">
            <span>Available for Remote & Local Opportunities</span> 🚀
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight font-sans tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-650">Indramani Mishra</span>
          </h1>
          
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Full Stack Developer (MERN & Next.js)
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            Specialized in architecting high-performance systems with real-time features (WebSockets/Socket.io), browser-native WebRTC communications, and self-managed cloud architectures on AWS with robust CI/CD automation.
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={() => window.dispatchEvent(new Event('openEnquiry'))} 
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-extrabold text-md transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 border-none outline-none cursor-pointer"
            >
              Hire Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link 
              href="/resume" 
              className="flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-500/50 px-8 py-3.5 rounded-xl font-extrabold text-md transition-all hover:-translate-y-0.5 shadow-sm shadow-black/5 hover:shadow-md"
            >
              <FileText size={18} className="text-blue-500" /> Interactive ATS Resume
            </Link>
          </div>
        </motion.div>
        
        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex-1 relative group w-full max-w-sm aspect-square select-none"
        >
          {/* Glassmorphic border behind */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-650 rounded-3xl rotate-3 scale-102 opacity-20 dark:opacity-30 group-hover:rotate-6 transition-all duration-500"></div>
          
          {/* Main frame */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-xl bg-gray-200 dark:bg-gray-900 flex items-center justify-center">
            <Image 
              src="/my_image.jpg" 
              alt="Indramani Mishra" 
              fill 
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
