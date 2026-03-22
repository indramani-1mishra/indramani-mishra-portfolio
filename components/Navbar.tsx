"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "#services" },
    { name: "Projects", path: "#projects" },
    { name: "Experience", path: "#experience" },
    { name: "Pricing", path: "#pricing" },
    { name: "Contact", path: "#contact" }
  ];

  const handleOpenEnquiry = () => {
    window.dispatchEvent(new Event("openEnquiry"));
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          Indramani <span className="text-gray-900 dark:text-white">Mishra</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          {links.map((item) => (
            <Link key={item.name} href={item.path} className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              {item.name}
            </Link>
          ))}
          <button onClick={handleOpenEnquiry} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 shadow-md border-none outline-none">
            Hire Me / Enquiry
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-gray-700 dark:text-gray-300 border-none outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col px-4 py-6 space-y-4">
            {links.map((item) => (
              <Link 
                key={item.name} 
                href={item.path} 
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button onClick={handleOpenEnquiry} className="bg-blue-600 text-white px-5 py-2 rounded font-semibold text-center mt-2 shadow-md border-none outline-none">
              Hire Me / Enquiry
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
