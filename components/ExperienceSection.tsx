"use client";

import { Briefcase, GraduationCap } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Journey & Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6 relative">
            <div className="absolute w-4 h-4 bg-gray-50 dark:bg-gray-900 border-4 border-blue-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A proven track record of architecting solutions from concept to scalable reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400">
                <Briefcase size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Experience</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:w-0.5 before:bg-gray-300 dark:before:bg-gray-700 before:h-full before:-z-10">
              <div className="relative pl-12 group">
                <div className="absolute left-0 top-1 w-12 flex justify-center translate-y-2">
                  <div className="h-4 w-4 bg-white dark:bg-gray-900 border-4 border-blue-600 rounded-full group-hover:bg-blue-600 transition-colors shadow-lg"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Full Stack Developer</h4>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">02/2026 - Present</span>
                  </div>
                  <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                    Tramt Technology Pvt Ltd. <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">New Delhi</span>
                  </h5>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <li>Architecting PRX India and Safehand Lifecare using Next.js.</li>
                    <li>Managing server deployment on VPS/AWS ensuring 99.9% uptime.</li>
                    <li>Collaborating with cross-functional teams to integrate secure APIs.</li>
                  </ul>
                </div>
              </div>

              <div className="relative pl-12 group">
                <div className="absolute left-0 top-1 w-12 flex justify-center translate-y-2">
                  <div className="h-4 w-4 bg-white dark:bg-gray-900 border-4 border-gray-400 rounded-full group-hover:border-blue-500 transition-colors shadow-md"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Full Stack Developer</h4>
                    <span className="text-sm font-semibold text-gray-500">09/2023 - 01/2026</span>
                  </div>
                  <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                    Ekana Technologies Pvt Ltd. <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">Lucknow</span>
                  </h5>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <li>Developed high-traffic apps Superwinnings and TheGameIO via MERN.</li>
                    <li>Implemented real-time features and complex state management.</li>
                    <li>Optimized database queries lowering response time by 40%.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl text-purple-600 dark:text-purple-400">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Education</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:w-0.5 before:bg-gray-300 dark:before:bg-gray-700 before:h-full before:-z-10">
              <div className="relative pl-12 group">
                <div className="absolute left-0 top-1 w-12 flex justify-center translate-y-2">
                  <div className="h-4 w-4 bg-white dark:bg-gray-900 border-4 border-purple-600 rounded-full group-hover:bg-purple-600 transition-colors shadow-lg"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">MCA</h4>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">2026 (Expected)</span>
                  </div>
                  <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maharishi University, Lucknow
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Master of Computer Applications - Specializing in software engineering and deep system architecture.</p>
                </div>
              </div>

              <div className="relative pl-12 group">
                <div className="absolute left-0 top-1 w-12 flex justify-center translate-y-2">
                  <div className="h-4 w-4 bg-white dark:bg-gray-900 border-4 border-gray-400 rounded-full group-hover:border-purple-500 transition-colors shadow-md"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">BCA</h4>
                    <span className="text-sm font-semibold text-gray-500">Graduated 2025</span>
                  </div>
                  <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                    U.P. Rajarshi Tandon Open University
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bachelor of Computer Applications - Covered broad computer science fundamentals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
