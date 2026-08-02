"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";

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

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg shadow-sm border-b border-gray-200/60 dark:border-gray-800/60 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 group">
          Indramani <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Mishra</span>
          <span className="text-indigo-600 font-extrabold">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          {links.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1 ${item.name === 'Resume' ? 'text-blue-600 dark:text-blue-450 font-bold' : ''}`}
            >
              {item.name === 'Resume' && <FileText size={14} className="text-blue-500" />}
              {item.name}
            </Link>
          ))}
          <button 
            onClick={handleOpenEnquiry} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:translate-y-0 border-none outline-none cursor-pointer"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-300 border-none outline-none p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800 animate-in slide-in-from-top duration-250">
          <div className="flex flex-col px-6 py-6 space-y-4">
            {links.map((item) => (
              <Link 
                key={item.name} 
                href={item.path} 
                className={`text-md font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 py-1 ${item.name === 'Resume' ? 'text-blue-600 dark:text-blue-400 font-bold border-b border-blue-100 dark:border-blue-900/50 pb-2' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name === 'Resume' && <FileText size={16} className="text-blue-500" />}
                {item.name}
              </Link>
            ))}
            <button 
              onClick={handleOpenEnquiry} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-center w-full shadow-md shadow-blue-500/15 border-none outline-none cursor-pointer"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
