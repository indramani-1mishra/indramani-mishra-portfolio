import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo, socialLinks } from "../helpercode/data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Indramani Mishra</h3>
          <p className="text-sm text-gray-400 mb-4">
            Full Stack Developer (MERN & Next.js) delivering scalable, high-performance web applications and SEO-optimized digital solutions.
          </p>
          <div className="flex space-x-4">
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white transition">
              <Github size={20} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="#services" className="hover:text-blue-400 transition">Services</Link></li>
            <li><Link href="#projects" className="hover:text-blue-400 transition">Projects</Link></li>
            <li><Link href="#pricing" className="hover:text-blue-400 transition">Pricing</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Me</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" />
              <span>{contactInfo.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-blue-500" />
              <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition">{contactInfo.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-blue-500" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition break-all">{contactInfo.email}</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Indramani Mishra. All rights reserved.</p>
      </div>
    </footer>
  );
}
