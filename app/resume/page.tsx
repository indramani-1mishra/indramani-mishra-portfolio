"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { 
  Printer, 
  Copy, 
  Check, 
  ArrowLeft, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  Search,
  ExternalLink
} from "lucide-react";
import { contactInfo, socialLinks } from "../../helpercode/data";

export default function ResumePage() {
  const [copied, setCopied] = useState(false);
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"formatted" | "plain">("formatted");
  const printRef = useRef<HTMLDivElement>(null);

  const keywords = [
    "Next.js", "React", "Node.js", "Express", "MongoDB", "Socket.io", 
    "WebRTC", "AWS", "GitHub Actions", "TypeScript", "Redux", "Tailwind", 
    "WebSocket", "Nginx", "Puppeteer", "JWT", "RBAC", "STUN/TURN"
  ];

  const resumeMarkdown = `INDRAMANI MISHRA
Full Stack Developer (MERN & Next.js)
Email: indramanimishra.es12@gmail.com | Phone: +91-7236005136
Location: Chirag Delhi, New Delhi, India
Portfolio: indramani-mishra-portfolio.vercel.app | GitHub: github.com/indramani-1mishra

SUMMARY
Full Stack Developer (MERN & Next.js) with hands-on experience architecting, building, and independently deploying production-grade web platforms. Skilled in real-time systems using WebSocket and Socket.io, and in building WebRTC-based audio/video communication modules. Experienced in end-to-end AWS deployment (self-managed EC2/S3 hosting) and setting up CI/CD pipelines with GitHub Actions for automated, zero-touch server deployment. Currently building Safehand Lifecare, a caregiver management platform.

TECHNICAL SKILLS
- Frontend: Next.js 16, React 19, TypeScript, Redux Toolkit, JavaScript (ES6+), Tailwind CSS v4, HTML5, CSS3
- Backend: Node.js, Express.js 5.x, RESTful APIs, JWT Authentication, Role-Based Access Control (RBAC)
- Real-Time & Audio/Video: WebSocket, Socket.io, WebRTC (RTCPeerConnection, MediaDevices API), STUN/TURN (Google STUN, Twilio TURN)
- Database: MongoDB (Mongoose ODM), MySQL
- Cloud & DevOps: AWS (EC2, S3), GitHub Actions (CI/CD), Hostinger VPS, GoDaddy Server Management, Nginx
- Third-Party Integrations: Firebase Cloud Messaging (FCM), WhatsApp Cloud API, Google Maps API, Leaflet, Puppeteer, CCAvenue

PROFESSIONAL EXPERIENCE
Safehand Lifecare Private Limited | Full Stack Developer | 02/2026 - Present | New Delhi, India
- Architected and independently developed Safehand Lifecare, a full-stack home healthcare and caregiver management platform, using Next.js 16 and the MERN stack for high performance and SEO.
- Independently hosted and managed both frontend and backend on AWS (EC2 and S3), handling the complete deployment lifecycle end-to-end and maintaining 99.9% uptime.
- Set up a CI/CD pipeline using GitHub Actions so that code pushed to the repository is automatically built and deployed to the production server.
- Implemented real-time features using WebSocket and Socket.io, including live worker location broadcasting to the admin dashboard.
- Built a browser-native WebRTC video calling module (RTCPeerConnection, MediaDevices API) with Socket.io signaling for remote video interviews.
- Configured WebRTC ICE candidate resolution using Google STUN and Twilio TURN servers.
- Designed a granular Role-Based Access Control (RBAC) system with custom middleware, and a multi-tier JWT authentication scheme.
- Integrated AWS S3 for storage, Firebase FCM for background geolocation tracking, Google Maps/Leaflet for fleet tracking, and WhatsApp Cloud API.
- Integrated secure payment gateway (CCAvenue) and automated PDF invoice generation using Puppeteer.

Ekana Technologies Pvt Ltd. | Full Stack Developer | 09/2025 - 01/2026 | Lucknow, India
- Developed high-traffic gaming platforms Superwinnings and TheGameIO using the MERN stack.
- Implemented real-time features and complex state management with Redux Toolkit to handle dynamic gaming data.
- Optimized MongoDB database queries, improving application response time by 40%.

EDUCATION
- Master of Computer Applications (MCA) | Maharishi University, Lucknow | Pursuing (Expected 2026)
- Bachelor of Computer Applications (BCA) | U.P. Rajarshi Tandon Open University | Graduated 2025`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleKeyword = (kw: string) => {
    if (activeKeywords.includes(kw)) {
      setActiveKeywords(activeKeywords.filter(k => k !== kw));
    } else {
      setActiveKeywords([...activeKeywords, kw]);
    }
  };

  // Helper to dynamically highlight active keywords in text strings
  const HighlightText = ({ text }: { text: string }) => {
    if (activeKeywords.length === 0) return <span>{text}</span>;

    const escapedKeywords = activeKeywords.map(kw => kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) => {
          const isMatch = activeKeywords.some(
            kw => kw.toLowerCase() === part.toLowerCase()
          );
          return isMatch ? (
            <mark 
              key={index} 
              className="bg-yellow-200 dark:bg-yellow-900/60 dark:text-yellow-100 text-gray-950 font-bold px-0.5 rounded transition-all duration-300 shadow-sm"
            >
              {part}
            </mark>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      {/* Framework-agnostic print styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            font-family: 'Times New Roman', Times, serif !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
          }
          /* Hide interactive/UI elements */
          nav, footer, .no-print, .controls-panel, button, a.back-btn {
            display: none !important;
          }
          /* Print container styling */
          .resume-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: white !important;
            border: none !important;
          }
          .resume-header {
            text-align: center !important;
            margin-bottom: 15px !important;
            border-bottom: 2px solid #111827 !important;
            padding-bottom: 8px !important;
          }
          .resume-header h1 {
            font-size: 24pt !important;
            font-weight: bold !important;
            margin-bottom: 4px !important;
            color: black !important;
            text-transform: uppercase !important;
          }
          .section-title {
            font-size: 14pt !important;
            font-weight: bold !important;
            border-bottom: 1px solid #374151 !important;
            margin-top: 15px !important;
            margin-bottom: 8px !important;
            padding-bottom: 2px !important;
            text-transform: uppercase !important;
            color: black !important;
          }
          .bullet-point {
            margin-left: 15px !important;
            list-style-type: disc !important;
            margin-bottom: 4px !important;
          }
          /* Make details black & remove highlights during print */
          mark {
            background: transparent !important;
            color: black !important;
            font-weight: inherit !important;
            padding: 0 !important;
          }
          .print-bold {
            font-weight: bold !important;
          }
          .print-flex-row {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-bottom: 3px !important;
          }
        }
      `}} />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-750 dark:text-blue-400 dark:hover:text-blue-300 transition-colors back-btn">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setViewMode(viewMode === "formatted" ? "plain" : "formatted")}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer border-none outline-none"
            >
              <FileText size={16} className="text-indigo-500" />
              {viewMode === "formatted" ? "Raw Markdown Text" : "Interactive View"}
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer border-none outline-none"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} className="text-blue-500" />
                  <span>Copy ATS Raw Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-extrabold rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center gap-1.5 cursor-pointer border-none outline-none"
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* ATS Keyword Scan Overlay - Only shown in Formatted Mode */}
        {viewMode === "formatted" && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm no-print space-y-4">
            <div className="flex items-center gap-2">
              <Cpu size={20} className="text-blue-500" />
              <h3 className="text-lg font-bold">Interactive ATS Keyword Highlighter</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click on keywords below to highlight them in the resume text. Helps verify keyword optimization.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {keywords.map(kw => {
                const isActive = activeKeywords.includes(kw);
                return (
                  <button
                    key={kw}
                    onClick={() => toggleKeyword(kw)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all border outline-none cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {kw}
                  </button>
                );
              })}
              {activeKeywords.length > 0 && (
                <button
                  onClick={() => setActiveKeywords([])}
                  className="text-xs text-red-500 hover:text-red-650 dark:hover:text-red-400 font-bold border-none bg-transparent outline-none cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        )}

        {/* Resume Content Container */}
        <div 
          ref={printRef}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 p-4 sm:p-8 md:p-12 rounded-3xl shadow-xl resume-container"
        >
          {viewMode === "plain" ? (
            /* PLAIN TEXT VIEW (ATS Friendly Copy/Paste) */
            <div className="no-print">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
                <h3 className="text-md font-bold text-gray-500">ATS Raw Text Preview</h3>
                <span className="text-xs text-gray-400">Standard formatting, best for copy/pasting.</span>
              </div>
              <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-900">
                {resumeMarkdown}
              </pre>
            </div>
          ) : (
            /* FORMATTED RICH ATS VIEW (Perfect Print Styles) */
            <div className="space-y-8 print-container">
              
              {/* Header */}
              <div className="resume-header text-center pb-6 border-b-2 border-gray-900 dark:border-gray-100">
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                  Indramani Mishra
                </h1>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase print-text-dark">
                  Full Stack Developer (MERN & Next.js)
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 mt-3 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 print-text-muted">
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600 transition flex items-center gap-1">
                    <Mail size={14} className="no-print" /> {contactInfo.email}
                  </a>
                  <span className="hidden sm:inline text-gray-300 select-none">•</span>
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-600 transition flex items-center gap-1">
                    <Phone size={14} className="no-print" /> {contactInfo.phone}
                  </a>
                  <span className="hidden sm:inline text-gray-300 select-none">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="no-print" /> {contactInfo.location}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 print-text-muted">
                  <a href={socialLinks.vercel} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                    Portfolio: indramani-mishra-portfolio.vercel.app
                  </a>
                  <span className="hidden sm:inline text-gray-300 select-none">•</span>
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                    GitHub: github.com/indramani-1mishra
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="section-title text-lg font-extrabold border-b border-gray-800 dark:border-gray-200 pb-1 mb-3 text-gray-900 dark:text-white uppercase tracking-wider">
                  Summary
                </h2>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <HighlightText text="Full Stack Developer (MERN & Next.js) with hands-on experience architecting, building, and independently deploying production-grade web platforms. Skilled in real-time systems using WebSocket and Socket.io, and in building WebRTC-based audio/video communication modules. Experienced in end-to-end AWS deployment (self-managed frontend and backend hosting on EC2/S3) and in setting up CI/CD pipelines with GitHub Actions for automated, zero-touch server deployment on every code push." />
                </p>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="section-title text-lg font-extrabold border-b border-gray-800 dark:border-gray-200 pb-1 mb-3 text-gray-900 dark:text-white uppercase tracking-wider">
                  Technical Skills
                </h2>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-bold print-bold">Frontend: </span>
                    <HighlightText text="Next.js 16, React 19, TypeScript, Redux Toolkit, JavaScript (ES6+), Tailwind CSS v4, HTML5, CSS3" />
                  </div>
                  <div>
                    <span className="font-bold print-bold">Backend: </span>
                    <HighlightText text="Node.js, Express.js 5.x, RESTful APIs, JWT Authentication, Role-Based Access Control (RBAC)" />
                  </div>
                  <div>
                    <span className="font-bold print-bold">Real-Time & Communication: </span>
                    <HighlightText text="WebSocket, Socket.io, WebRTC (RTCPeerConnection, MediaDevices API), STUN/TURN (Google STUN, Twilio TURN)" />
                  </div>
                  <div>
                    <span className="font-bold print-bold">Database: </span>
                    <HighlightText text="MongoDB (Mongoose ODM), MySQL" />
                  </div>
                  <div>
                    <span className="font-bold print-bold">Cloud & DevOps: </span>
                    <HighlightText text="AWS (EC2, S3 - self-managed frontend & backend deployment), GitHub Actions (CI/CD automation), Hostinger VPS, GoDaddy Server Management, Nginx" />
                  </div>
                  <div>
                    <span className="font-bold print-bold">Third-Party Integrations: </span>
                    <HighlightText text="Firebase Cloud Messaging (FCM), WhatsApp Cloud API, Google Maps API, Leaflet, Puppeteer (PDF generation), Payment Gateway Integration (CCAvenue)" />
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="section-title text-lg font-extrabold border-b border-gray-800 dark:border-gray-200 pb-1 mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
                  Experience
                </h2>
                <div className="space-y-6">
                  
                  {/* Experience 1 */}
                  <div>
                    <div className="print-flex-row flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-gray-900 dark:text-white text-md">
                      <span>
                        Safehand Lifecare Private Limited — <span className="font-medium text-gray-700 dark:text-gray-300 text-sm italic">Full Stack Developer</span>
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 print-text-dark shrink-0">
                        02/2026 - Present
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2.5 print-text-muted">
                      <span>New Delhi, India (Company formerly known as Tramt Technology Pvt Ltd.)</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="bullet-point">
                        <HighlightText text="Architected and independently developed Safehand Lifecare, a full-stack home healthcare and caregiver management platform, using Next.js 16 and the MERN stack for high performance and SEO." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Independently hosted and managed both frontend and backend on AWS (EC2 and S3), handling the complete deployment lifecycle end-to-end and maintaining 99.9% uptime." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Set up a CI/CD pipeline using GitHub Actions so that code pushed to the repository is automatically built and deployed to the production server without manual intervention." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Implemented real-time features using WebSocket and Socket.io, including live worker location broadcasting to the admin dashboard and instant admin-side updates." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Built a browser-native WebRTC video calling module (RTCPeerConnection, MediaDevices API) with Socket.io signaling, enabling administrators to conduct remote video interviews and identity verification of caregivers." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Configured WebRTC ICE candidate resolution using Google STUN and Twilio TURN servers to ensure reliable peer-to-peer connections across different network/firewall conditions." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Designed a granular Role-Based Access Control (RBAC) system with a custom Express middleware, and a multi-tier JWT authentication scheme using HTTP-Only cookies for Admins, Workers, and Clients." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Integrated AWS S3 for document storage, Firebase Cloud Messaging for background geo-location tracking, Google Maps/Leaflet for live fleet tracking, and WhatsApp Cloud API for automated notifications." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Integrated a secure payment gateway (CCAvenue) and automated PDF invoice generation using Puppeteer." />
                      </li>
                    </ul>
                  </div>

                  {/* Experience 2 */}
                  <div>
                    <div className="print-flex-row flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-gray-900 dark:text-white text-md">
                      <span>
                        Ekana Technologies Pvt Ltd. — <span className="font-medium text-gray-700 dark:text-gray-300 text-sm italic">Full Stack Developer</span>
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 print-text-dark shrink-0">
                        09/2025 - 01/2026
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2.5 print-text-muted">
                      <span>Lucknow, India</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="bullet-point">
                        <HighlightText text="Developed high-traffic gaming platforms Superwinnings and TheGameIO using the MERN stack." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Implemented real-time features and complex state management with Redux Toolkit to handle dynamic gaming data." />
                      </li>
                      <li className="bullet-point">
                        <HighlightText text="Optimized MongoDB database queries, improving application response time by 40%." />
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="section-title text-lg font-extrabold border-b border-gray-800 dark:border-gray-200 pb-1 mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
                  Key Projects
                </h2>
                <div className="space-y-4">
                  
                  {/* Project 1 */}
                  <div>
                    <div className="print-flex-row flex justify-between items-baseline font-bold text-gray-900 dark:text-white text-sm">
                      <span>Safehand Lifecare — Full Stack Healthcare Portal</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">02/2026 - Present</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 pl-2 border-l border-gray-200 dark:border-gray-800">
                      <HighlightText text="Designed and developed a home healthcare caregiver management portal. Implemented real-time worker tracking using Socket.io and Firebase Cloud Messaging, built an in-browser WebRTC verification portal, and automated invoice PDF compilation." />
                    </p>
                  </div>

                  {/* Project 2 */}
                  <div>
                    <div className="print-flex-row flex justify-between items-baseline font-bold text-gray-900 dark:text-white text-sm">
                      <span>Superwinnings — Real-time Gaming & Rewards Platform</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">09/2025 - 12/2025</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 pl-2 border-l border-gray-200 dark:border-gray-800">
                      <HighlightText text="Built dynamic gaming portal sync with real-time Socket.io data, payment gateway integrations, and complex game state orchestration handled via Redux Toolkit." />
                    </p>
                  </div>

                  {/* Project 3 */}
                  <div>
                    <div className="print-flex-row flex justify-between items-baseline font-bold text-gray-900 dark:text-white text-sm">
                      <span>TheGameIO — Interactive Gaming Web App</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">10/2025 - 12/2025</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 pl-2 border-l border-gray-200 dark:border-gray-800">
                      <HighlightText text="Developed online gaming client with user dashboard capabilities, live leaderboards, transactional balance updates, and optimized VPS deployment." />
                    </p>
                  </div>

                  {/* Project 4 */}
                  <div>
                    <div className="print-flex-row flex justify-between items-baseline font-bold text-gray-900 dark:text-white text-sm">
                      <span>E-commerce Business Website</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">04/2024 - 08/2025</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 pl-2 border-l border-gray-200 dark:border-gray-800">
                      <HighlightText text="Created full e-commerce app with product listings, cart systems, user auth, administrative inventory control panels, and server hosting configurations." />
                    </p>
                  </div>

                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="section-title text-lg font-extrabold border-b border-gray-800 dark:border-gray-200 pb-1 mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
                  Education
                </h2>
                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                  <div className="print-flex-row flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-semibold">
                    <span>
                      Master of Computer Applications (MCA) — <span className="font-medium text-gray-600 dark:text-gray-400 text-xs italic">Maharishi University</span>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                      Pursuing (Expected 2026)
                    </span>
                  </div>
                  <div className="print-flex-row flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-semibold">
                    <span>
                      Bachelor of Computer Applications (BCA) — <span className="font-medium text-gray-600 dark:text-gray-400 text-xs italic">U.P. Rajarshi Tandon Open University</span>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                      Graduated 2025
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
