"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  RiMenu3Line, 
  RiCloseLine, 
  RiFileLine,
  RiBriefcaseLine 
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: "Projects", path: "/#projects" },
    { name: "Experience", path: "/#experience" },
    { name: "Pricing", path: "/#pricing" },
    { name: "Contact", path: "/#contact" },
    { name: "Resume", path: "/resume" }
  ];

  const handleOpenEnquiry = () => {
    window.dispatchEvent(new Event("openEnquiry"));
    setIsOpen(false);
  };

  const handleOpenAIChat = () => {
    window.dispatchEvent(new Event("openAIChat"));
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm border-b border-gray-200/60 dark:border-gray-800/60 transition-all duration-300">
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl py-2.5 sm:py-3 flex justify-between items-center gap-2">
        
        {/* Logo - responsive font size */}
        <Link href="/" className="text-lg xs:text-xl sm:text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 group truncate shrink-0">
          Indramani <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Mishra</span>
          <span className="text-indigo-600 font-extrabold">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 font-semibold">
          {links.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5 ${item.name === 'Resume' ? 'text-blue-600 dark:text-blue-450 font-bold' : ''}`}
            >
              {item.name === 'Resume' && <RiFileLine size={15} className="text-blue-500" />}
              {item.name}
            </Link>
          ))}

          {/* Stylish Ask AI Header Button */}
          <button
            onClick={handleOpenAIChat}
            className="group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-purple-500/10 dark:from-blue-500/20 dark:via-indigo-500/25 dark:to-purple-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 hover:border-indigo-400 dark:hover:border-indigo-500 text-xs font-extrabold transition-all duration-300 hover:scale-105 shadow-xs cursor-pointer"
          >
            <span>Ask AI</span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </button>

          <button 
            onClick={handleOpenEnquiry} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:translate-y-0 border-none outline-none cursor-pointer flex items-center gap-1.5"
          >
            <RiBriefcaseLine size={15} />
            <span>Hire Me</span>
          </button>
        </div>

        {/* Mobile menu toggle & Mobile AI quick button */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <button
            onClick={handleOpenAIChat}
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 to-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] sm:text-xs font-extrabold shadow-xs cursor-pointer"
          >
            <span>Ask AI</span>
            <span className="flex h-1.5 w-1.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </button>

          <button 
            className="text-gray-700 dark:text-gray-300 border-none outline-none p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {/* Mobile AI button */}
              <button
                onClick={handleOpenAIChat}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-md cursor-pointer border-none"
              >
                <span>Chat with AI Assistant</span>
              </button>

              {links.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  className={`text-md font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 py-1 ${item.name === 'Resume' ? 'text-blue-600 dark:text-blue-400 font-bold border-b border-blue-100 dark:border-blue-900/50 pb-2' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name === 'Resume' && <RiFileLine size={18} className="text-blue-500" />}
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleOpenEnquiry} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-center w-full shadow-md shadow-blue-500/15 border-none outline-none cursor-pointer flex items-center justify-center gap-2"
              >
                <RiBriefcaseLine size={17} />
                <span>Hire Me</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

