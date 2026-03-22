"use client";

import { useState } from "react";
import { CheckCircle, Search } from "lucide-react";
import { pricingData } from "../helpercode/data";

export default function PricingSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPricing = pricingData.filter((item) =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Affordable Website Packages</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6 relative">
            <div className="absolute w-4 h-4 bg-gray-50 dark:bg-gray-900 border-4 border-blue-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Get your business online at the most competitive rates. High quality Web Development tailored to your needs.
          </p>

          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search packages (e.g., Static, CMS, App)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {filteredPricing.length > 0 ? (
            filteredPricing.map((pkg, index) => (
              <div 
                key={index} 
                className={`relative p-8 rounded-3xl transition-transform duration-300 hover:-translate-y-2 ${pkg.recommended ? 'bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-2xl scale-105 z-10' : 'bg-white dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 hover:border-blue-500 shadow-xl'}`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${pkg.recommended ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{pkg.category}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-extrabold">{pkg.price}</span>
                  <span className={`text-sm ${pkg.recommended ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>/ project</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className={`shrink-0 ${pkg.recommended ? 'text-blue-300' : 'text-blue-500'}`} size={20} />
                      <span className={pkg.recommended ? 'text-blue-50' : 'text-gray-700 dark:text-gray-300'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.dispatchEvent(new Event('openEnquiry'))}
                  className={`block text-center w-full py-3 rounded-xl font-bold transition-colors border-none outline-none cursor-pointer ${pkg.recommended ? 'bg-white text-blue-700 hover:bg-gray-100' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'}`}
                >
                  Choose {pkg.category}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center text-gray-500 py-12">
              No packages found matching your search. Please try another keyword.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
