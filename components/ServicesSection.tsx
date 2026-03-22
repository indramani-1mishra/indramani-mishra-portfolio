"use client";

import { servicesData } from "../helpercode/data";
import { Globe, Smartphone, Users, ShoppingCart } from "lucide-react";

export default function ServicesSection() {
  const iconMap: { [key: string]: React.FC<any> } = {
    Globe: Globe,
    Smartphone: Smartphone,
    Users: Users,
    ShoppingCart: ShoppingCart,
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">My Services</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6 relative">
            <div className="absolute w-4 h-4 bg-white dark:bg-gray-950 border-4 border-blue-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Providing top-tier digital solutions to help your business grow and stand out in the crowded digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <div 
                key={index} 
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm relative z-10">
                  {Icon && <Icon size={32} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
