"use client";

import ProjectCard3D from "./ProjectCard3D";
import { Github } from "lucide-react";
import { projectsData } from "../helpercode/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6 relative">
            <div className="absolute w-4 h-4 bg-white dark:bg-gray-950 border-4 border-blue-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A showcase of my recent work, highlighting scalablity, performance, and intuitive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard3D key={index} project={project} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="https://github.com/indramani-1mishra" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-full font-bold transition shadow-lg hover:-translate-y-1">
            <Github size={20} /> View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
