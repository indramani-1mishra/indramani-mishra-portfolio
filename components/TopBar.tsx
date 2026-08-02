"use client";

import { useTheme } from "next-themes";
import { Mail, MapPin, Phone, Sun, Moon, MessageCircle } from "lucide-react";
import { contactInfo } from "../helpercode/data";
import { useEffect, useState } from "react";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hidden md:block bg-gray-900 text-white text-sm py-2 px-4 shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-gray-300">
        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 hover:text-white transition">
            <Mail size={14} /> <span className="hidden sm:inline">{contactInfo.email}</span>
          </a>
          <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1 hover:text-white transition">
            <Phone size={14} /> <span className="hidden sm:inline">{contactInfo.phone}</span>
          </a>
          <a href={`https://wa.me/${contactInfo.whatsapp.replace("+", "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition text-green-400">
            <MessageCircle size={14} /> <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <div className="flex items-center gap-1">
            <MapPin size={14} /> <span className="hidden lg:inline">{contactInfo.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition flex items-center justify-center text-yellow-400"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} className="text-gray-300" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
