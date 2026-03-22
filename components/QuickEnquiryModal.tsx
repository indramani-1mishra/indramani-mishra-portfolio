"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

import emailjs from "@emailjs/browser";

import Swal from 'sweetalert2';

export default function QuickEnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const handleOpenEnquiry = () => setIsOpen(true);
    window.addEventListener("openEnquiry", handleOpenEnquiry);
    return () => window.removeEventListener("openEnquiry", handleOpenEnquiry);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    emailjs.send(
      "service_6y7x856",
      "template_jyd5pmh",
      formData,
      "s0C8pJnc0EjKkOigu"
    )
      .then((result) => {
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        setIsOpen(false);
        setStatus("");
        Swal.fire({
          title: "Thank You!",
          text: "Thank you for your enquiry. I will get back to you shortly!",
          icon: "success",
          confirmButtonColor: "#2563eb"
        });
      })
      .catch((error) => {
        console.error(error);
        setStatus("");
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#ef4444"
        });
      });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center animate-bounce"
        aria-label="Quick Enquiry"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold">Quick Enquiry</h2>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-gray-800 dark:text-gray-100">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600"
              />
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 appearance-none"
              >
                <option value="" disabled>Select Requirement</option>
                <option value="Website Development">Website Development</option>
                <option value="App Development">App Development</option>
                <option value="Add to Team">Hire Me / Add to Team</option>
                <option value="Other">Other Query</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message..."
                rows={3}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Send Enquiry
              </button>
              {status && <p className="text-center text-sm mt-2 text-green-600 dark:text-green-400 font-medium">{status}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
