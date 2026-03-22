"use client";

import { skillsData } from "../helpercode/data";
import { Code2, Database, Layout, Server, Settings } from "lucide-react";

export default function SkillsSection() {
  const categories = [
    {
      title: "Frontend Development",
      icon: <Layout className="text-blue-500" size={24} />,
      skills: ["Next.js", "React.js", "Redux Toolkit", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
      title: "Backend Development",
      icon: <Server className="text-green-500" size={24} />,
      skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication"]
    },
    {
      title: "Database Management",
      icon: <Database className="text-purple-500" size={24} />,
      skills: ["MongoDB", "MySQL"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Settings className="text-orange-500" size={24} />,
      skills: ["AWS (S3, EC2)", "Hostinger VPS", "Static Hosting", "GoDaddy"]
    },
    {
      title: "Tools & Version Control",
      icon: <Code2 className="text-gray-500 dark:text-gray-400" size={24} />,
      skills: ["Git", "GitHub", "Postman", "Vercel", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Technical Stack</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6 relative">
            <div className="absolute w-4 h-4 bg-white dark:bg-gray-950 border-4 border-blue-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A comprehensive overview of the technologies I use to build robust digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cat.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-700 dark:hover:text-blue-400 transition-colors shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
