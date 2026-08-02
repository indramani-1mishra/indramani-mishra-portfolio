"use client";

import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const experiences = [
    {
      role: "Full Stack Developer",
      company: "Safehand Lifecare Private Limited",
      location: "New Delhi, India",
      subText: "Company formerly known as Tramt Technology Pvt Ltd.",
      period: "02/2026 - Present",
      live: "https://safehandlifecare.com",
      techs: ["Next.js 16", "React 19", "Node.js", "Express.js 5.x", "MongoDB", "Socket.io", "WebRTC", "AWS (EC2/S3)", "GitHub Actions", "Tailwind CSS v4"],
      bullets: [
        "Architected and independently developed Safehand Lifecare, a full-stack home healthcare and caregiver management platform, using Next.js 16 and the MERN stack for high performance and SEO.",
        "Independently hosted and managed both frontend and backend on AWS (EC2 and S3), handling the complete deployment lifecycle end-to-end and maintaining 99.9% uptime.",
        "Set up a CI/CD pipeline using GitHub Actions so that code pushed to the repository is automatically built and deployed to the production server without manual intervention.",
        "Implemented real-time features using WebSocket and Socket.io, including live worker location broadcasting to the admin dashboard and instant admin-side updates.",
        "Built a browser-native WebRTC video calling module (RTCPeerConnection, MediaDevices API) with Socket.io signaling, enabling administrators to conduct remote video interviews and identity verification of caregivers.",
        "Configured WebRTC ICE candidate resolution using Google STUN and Twilio TURN servers to ensure reliable peer-to-peer connections across different network/firewall conditions.",
        "Designed a granular Role-Based Access Control (RBAC) system with a custom Express middleware, and a multi-tier JWT authentication scheme using HTTP-Only cookies for Admins, Workers, and Clients.",
        "Integrated AWS S3 for document storage, Firebase Cloud Messaging for background geo-location tracking, Google Maps/Leaflet for live fleet tracking, and WhatsApp Cloud API for automated notifications.",
        "Integrated a secure payment gateway (CCAvenue) and automated PDF invoice generation using Puppeteer."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Ekana Technologies Pvt Ltd.",
      location: "Lucknow, India",
      period: "09/2025 - 01/2026",
      live: "https://www.superwinnings.com/",
      techs: ["MERN Stack", "Redux Toolkit", "Socket.io", "MongoDB", "REST APIs", "Node.js", "Express.js"],
      bullets: [
        "Developed high-traffic gaming platforms Superwinnings and TheGameIO using the MERN stack.",
        "Implemented real-time features and complex state management with Redux Toolkit to handle dynamic gaming data.",
        "Optimized MongoDB database queries, improving application response time by 40%."
      ]
    }
  ];

  const educations = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Maharishi University, Lucknow",
      period: "Pursuing (Expected 2026)",
      details: "Specializing in advanced software engineering, distributed systems, and modern web application architectures."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "U.P. Rajarshi Tandon Open University",
      period: "Graduated 2025",
      details: "Gained a strong foundation in computer science principles, database management systems, data structures, and object-oriented programming."
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Journey & Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6 relative">
            <div className="absolute w-4 h-4 bg-white dark:bg-gray-900 border-4 border-blue-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A proven track record of architecting real-time systems, automating deployments, and developing production-grade web solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Work Experience - takes 2 cols on lg screens */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400 shadow-sm">
                <Briefcase size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Experience</h3>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8 relative before:absolute before:inset-y-0 before:left-[1.4rem] before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800 before:h-full before:-z-10"
            >
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  variants={cardVariants}
                  className="relative pl-12 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 w-12 flex justify-center translate-y-2">
                    <div className="h-5 w-5 bg-white dark:bg-gray-950 border-4 border-blue-600 rounded-full group-hover:bg-blue-600 group-hover:scale-125 transition-all shadow-md"></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white dark:bg-gray-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {exp.role}
                        </h4>
                        <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">
                          {exp.company}
                        </h5>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
                          <Calendar size={14} /> {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <MapPin size={12} /> {exp.location}
                        </span>
                      </div>
                    </div>

                    {exp.subText && (
                      <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-4">{exp.subText}</p>
                    )}

                    {/* Bullet Points */}
                    <ul className="space-y-3 mb-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed list-none pl-0">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2.5 items-start">
                          <span className="text-blue-500 font-bold shrink-0 text-md select-none mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Tag Array */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {exp.techs.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-200/50 dark:border-gray-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Live Link Button */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <a 
                        href={exp.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        Visit Project <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education - takes 1 col on lg screens */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Education</h3>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8 relative before:absolute before:inset-y-0 before:left-[1.4rem] before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800 before:h-full before:-z-10"
            >
              {educations.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  variants={cardVariants}
                  className="relative pl-12 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 w-12 flex justify-center translate-y-2">
                    <div className="h-5 w-5 bg-white dark:bg-gray-950 border-4 border-purple-600 rounded-full group-hover:bg-purple-600 group-hover:scale-125 transition-all shadow-md"></div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-white dark:bg-gray-900/60 backdrop-blur-sm p-6 rounded-3xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex flex-col gap-1.5 mb-3">
                      <span className="inline-flex self-start items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2.5 py-0.5 rounded-full border border-purple-100 dark:border-purple-900/50">
                        <Calendar size={12} /> {edu.period}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {edu.degree}
                      </h4>
                      <h5 className="text-md font-medium text-gray-600 dark:text-gray-400">
                        {edu.institution}
                      </h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
