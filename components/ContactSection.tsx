"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { contactInfo } from "../helpercode/data";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending message...");
    
    emailjs.send(
      "service_6y7x856", 
      "template_jyd5pmh", 
      formData, 
      "s0C8pJnc0EjKkOigu"
    )
    .then((result) => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setStatus("");
      Swal.fire({
        title: "Thank You!",
        text: "Thank you for reaching out! I will get back to you as soon as possible.",
        icon: "success",
        confirmButtonColor: "#2563eb"
      });
    })
    .catch((error) => {
      console.error(error);
      setStatus("");
      Swal.fire({
        title: "Oops!",
        text: "Failed to send message. Please try again later.",
        icon: "error",
        confirmButtonColor: "#ef4444"
      });
    });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Let's Work Together</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6 relative">
            <div className="absolute w-4 h-4 bg-gray-50 dark:bg-gray-900 border-4 border-blue-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have a project in mind or want to hire me? Get in touch today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Get In Touch</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Fill out the form to the right or contact me directly using the information below. My inbox is always open for new opportunities.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-xl text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{contactInfo.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-xl text-green-600 dark:text-green-400 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-green-600 dark:hover:text-green-400 transition">{contactInfo.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-xl text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition">{contactInfo.email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl flex flex-col justify-center border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <MessageSquare size={20} /> Send Message
              </button>
              {status && <p className="text-center font-semibold text-green-600 dark:text-green-400 mt-4">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
