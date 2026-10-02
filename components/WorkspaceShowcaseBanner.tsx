"use client";

import { useState } from "react";
import Image from "next/image";
import { FiCheckCircle, FiMaximize2, FiX } from "react-icons/fi";
import { RiShieldCheckLine, RiCodeBoxLine, RiExpandDiagonalLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkspaceShowcaseBanner() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  if (!isBannerVisible) return null;

  return (
    <>
      {/* Top Foreground Showcase Strip (Before Header) */}
      <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border-b border-indigo-500/20 backdrop-blur-md px-3 sm:px-6 py-2 transition-all relative z-40">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3">
          
          {/* Left: Thumbnail & Live Verification */}
          <div className="flex items-center gap-3">
            {/* Front Thumbnail with Hover Glow */}
            <div
              onClick={() => setIsPreviewOpen(true)}
              className="relative w-9 h-11 sm:w-10 sm:h-12 rounded-lg overflow-hidden shrink-0 border border-blue-400/50 shadow-md cursor-pointer group hover:scale-105 transition-transform bg-gray-900"
              title="Click to view live workstation & employee verification"
            >
              <Image
                src="/indramanibackgroundimage.jpeg"
                alt="Indramani Mishra Workstation & Safehand Lifecare ID"
                fill
                sizes="48px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <FiMaximize2 className="text-white text-[10px] opacity-0 group-hover:opacity-100 drop-shadow" />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-1">
                  <RiShieldCheckLine className="text-blue-500" size={15} />
                  Safehand Lifecare
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  <FiCheckCircle size={10} /> Verified Developer ID
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 truncate max-w-[220px] xs:max-w-[340px] sm:max-w-none">
                Live production setup & official developer credentials of Indramani Mishra
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] sm:text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border-none outline-none"
            >
              <RiExpandDiagonalLine size={12} />
              <span>View Photo</span>
            </button>

            <button
              onClick={() => setIsBannerVisible(false)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
              title="Close Banner"
              aria-label="Close"
            >
              <FiX size={15} />
            </button>
          </div>

        </div>
      </div>

      {/* Elegant Portrait Photo Modal with high z-index above all navigation */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-[340px] sm:max-w-[380px] w-full overflow-hidden shadow-2xl p-3.5 sm:p-4 flex flex-col items-center space-y-2.5 my-auto"
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                    Indramani Mishra &bull; Verification
                  </h4>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-none bg-transparent cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Portrait Photo with Natural Aspect Ratio */}
              <div className="relative w-full aspect-[9/13] max-h-[56vh] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-950 shadow-inner">
                <Image
                  src="/indramanibackgroundimage.jpeg"
                  alt="Indramani Mishra Workstation & Safehand Lifecare ID"
                  fill
                  priority
                  sizes="(max-width: 400px) 100vw, 380px"
                  className="object-cover object-center"
                />
              </div>

              {/* Verified Badge / Footer */}
              <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/50 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-bold text-blue-900 dark:text-blue-300 flex items-center justify-center gap-1.5">
                  <FiCheckCircle className="text-emerald-500 shrink-0" size={13} />
                  Safehand Lifecare &bull; Website Developer
                </p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5">
                  Live Workstation &bull; Production Next.js & MERN Stack
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
