"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";

function ProjectTexture({ url }: { url: string }) {
  const texture = useTexture(url);
  
  return (
    <Float rotationIntensity={0.8} floatIntensity={2} speed={3}>
      <mesh>
        <planeGeometry args={[4.5, 2.5]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

export default function ProjectCard3D({ project }: { project: any }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const imageUrl = project.title === 'Safehand Lifecare' ? '/safehand_lifecare.png' : project.image;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 flex flex-col relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered && !isMobile ? 'translateY(-8px)' : 'none' }}
    >
      <div className="relative h-64 w-full bg-gray-250 dark:bg-gray-800 overflow-hidden select-none">
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-900/20 mix-blend-overlay z-0"></div>
        
        {isMobile ? (
          <div className="relative w-full h-full">
            <Image 
              src={imageUrl} 
              alt={project.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} className="z-10" gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={
              <Html center>
                <Loader2 className="animate-spin text-blue-500" size={30} />
              </Html>
            }>
              <ProjectTexture url={imageUrl} />
            </Suspense>
          </Canvas>
        )}

        {/* Floating Category Tag */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20 pointer-events-none">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-blue-400/30">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col relative z-20 bg-white dark:bg-gray-900">
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>
        <div className="flex items-center gap-4 mt-auto">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-750 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all w-full shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            Live Preview <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
