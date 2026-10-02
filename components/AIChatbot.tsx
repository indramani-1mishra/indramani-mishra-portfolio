"use client";

import { useState, useEffect, useRef } from "react";
import { 
  RiSendPlaneFill, 
  RiCloseLine, 
  RiRefreshLine, 
  RiFullscreenLine, 
  RiFullscreenExitLine, 
  RiFileCopyLine, 
  RiCheckLine, 
  RiWhatsappLine, 
  RiBriefcaseLine, 
  RiCodeSSlashLine, 
  RiCodeBoxLine, 
  RiPriceTag3Line, 
  RiFileLine, 
  RiArrowRightLine, 
  RiUser3Line,
  RiMailSendLine,
  RiCheckboxCircleFill,
  RiVolumeUpLine,
  RiVolumeMuteLine
} from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { contactInfo } from "../helpercode/data";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

const SUGGESTIONS = [
  { label: "I want to hire Indramani", icon: RiBriefcaseLine, color: "text-blue-500" },
  { label: "Website Pricing & Packages", icon: RiPriceTag3Line, color: "text-emerald-500" },
  { label: "Key Projects & Work", icon: RiCodeBoxLine, color: "text-indigo-500" },
  { label: "Tech Stack & Skills", icon: RiCodeSSlashLine, color: "text-purple-500" },
  { label: "Who is Indramani?", icon: RiUser3Line, color: "text-amber-500" },
];

const WELCOME_VOICE_TEXT = "Thank you for visiting Indramani Mishra's portfolio! I am his AI Assistant. Feel free to explore his projects, technical skills, services, and pricing, or chat with me to get started.";

// Helper to parse [SUBMIT_REQUIREMENTS: name=... | email=... | phone=... | service=... | message=...]
const parseSubmissionTag = (text: string) => {
  const match = text.match(/\[SUBMIT_REQUIREMENTS:\s*([^\]]+)\]/i);
  if (!match) return null;

  const rawData = match[1];
  const fields: Record<string, string> = {};

  rawData.split("|").forEach((part) => {
    const [key, ...val] = part.split("=");
    if (key && val.length) {
      fields[key.trim().toLowerCase()] = val.join("=").trim();
    }
  });

  return {
    name: fields.name || "Client",
    email: fields.email || "client@example.com",
    phone: fields.phone || "Not provided",
    service: fields.service || "Website Development",
    message: fields.message || "Project enquiry submitted via AI Assistant.",
  };
};

// Formats inline bold, links, code
const formatInlineMarkdown = (content: string) => {
  const parts = content.split(/(\*\*.*?\*\*|`.*?`|https?:\/\/[^\s]+)/g);

  return parts.map((part, pIdx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={pIdx} className="font-bold text-gray-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={pIdx} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-700">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("http://") || part.startsWith("https://")) {
      return (
        <a
          key={pIdx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold"
        >
          {part} <FiExternalLink size={10} />
        </a>
      );
    }
    return part;
  });
};

// Helper to format markdown lines
const renderFormattedText = (rawText: string) => {
  const cleanText = rawText.replace(/\[SUBMIT_REQUIREMENTS:\s*[^\]]+\]/gi, "").trim();
  const lines = cleanText.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, lIdx) => {
        // Bullet list
        if (line.trim().startsWith("- ") || line.trim().startsWith("* ") || line.trim().startsWith("• ")) {
          const content = line.trim().replace(/^[-*•]\s+/, "");
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-blue-500 font-bold shrink-0 mt-0.5 text-sm">•</span>
              <span>{formatInlineMarkdown(content)}</span>
            </div>
          );
        }

        // Numbered list
        const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-indigo-500 font-bold shrink-0 text-xs mt-0.5">{numMatch[1]}.</span>
              <span>{formatInlineMarkdown(numMatch[2])}</span>
            </div>
          );
        }

        // Headings
        if (line.trim().startsWith("### ")) {
          return (
            <h4 key={lIdx} className="font-bold text-gray-900 dark:text-white pt-1.5 text-xs sm:text-sm border-b border-gray-100 dark:border-gray-800/80 pb-1">
              {line.replace(/^###\s+/, "")}
            </h4>
          );
        }
        if (line.trim().startsWith("## ")) {
          return (
            <h3 key={lIdx} className="font-extrabold text-blue-600 dark:text-blue-400 pt-2 text-sm sm:text-base">
              {line.replace(/^##\s+/, "")}
            </h3>
          );
        }

        if (!line.trim()) {
          return <div key={lIdx} className="h-1" />;
        }

        return <p key={lIdx}>{formatInlineMarkdown(line)}</p>;
      })}
    </div>
  );
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceGreetingPlayed, setVoiceGreetingPlayed] = useState(false);

  const initialMessage: Message = {
    id: "welcome-msg",
    sender: "ai",
    text: "Welcome! I am **Indramani Mishra's AI Assistant**.\n\nThank you for visiting Indramani Mishra's portfolio! Feel free to ask about his experience, full-stack projects, and skills. If you'd like to build a website or hire Indramani, share your project requirements here and I will help submit them directly to him!",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Text-To-Speech (TTS) Engine
  const speak = (textToSpeak: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const cleanText = textToSpeak
        .replace(/\[SUBMIT_REQUIREMENTS:[^\]]+\]/gi, "")
        .replace(/[*#`_-]/g, "")
        .replace(/https?:\/\/[^\s]+/g, "");

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(
        (v) =>
          (v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Zira") ||
              v.name.includes("Samantha"))) ||
          v.lang === "en-US" ||
          v.lang === "en-GB"
      ) || voices.find((v) => v.lang.startsWith("en"));

      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Speech synthesis error:", err);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Play greeting on user arrival / first interaction
  useEffect(() => {
    const playGreetingOnce = () => {
      if (!voiceGreetingPlayed) {
        setVoiceGreetingPlayed(true);
        speak(WELCOME_VOICE_TEXT);
      }
    };

    // Attach one-time user interaction triggers for browser autoplay compliance
    const handleFirstInteraction = () => {
      playGreetingOnce();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [voiceGreetingPlayed]);

  // Listen to open event from Navbar or Hero buttons
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 300);
      if (!voiceGreetingPlayed) {
        setVoiceGreetingPlayed(true);
        speak(WELCOME_VOICE_TEXT);
      }
    };
    window.addEventListener("openAIChat", handleOpen);
    return () => window.removeEventListener("openAIChat", handleOpen);
  }, [voiceGreetingPlayed]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleCopy = (id: string, text: string) => {
    const clean = text.replace(/\[SUBMIT_REQUIREMENTS:\s*[^\]]+\]/gi, "").trim();
    navigator.clipboard.writeText(clean);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    stopSpeaking();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: "Conversation refreshed. Ask me anything about Indramani Mishra's portfolio, pricing packages, or project requirements.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setSubmittedIds([]);
  };

  // Handle direct In-Chat Requirement Submission via EmailJS
  const handleInChatMessageSubmit = async (
    msgId: string, 
    reqData: { name: string; email: string; phone: string; service: string; message: string },
    auto: boolean = false
  ) => {
    if (submittedIds.includes(msgId)) return;
    setSubmittingId(msgId);

    try {
      await emailjs.send(
        "service_6y7x856",
        "template_jyd5pmh",
        {
          name: reqData.name,
          email: reqData.email,
          phone: reqData.phone,
          service: reqData.service,
          message: reqData.message,
        },
        "s0C8pJnc0EjKkOigu"
      );

      setSubmittedIds((prev) => [...prev, msgId]);

      if (!auto) {
        Swal.fire({
          title: "Form Submitted!",
          text: "Your project details have been successfully emailed to Indramani Mishra. He will contact you shortly!",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      console.error("EmailJS submission error:", error);
      if (!auto) {
        Swal.fire({
          title: "Submission Error",
          text: "Failed to send email. You can also contact Indramani directly on WhatsApp or Email.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } finally {
      setSubmittingId(null);
    }
  };

  const handleSend = async (queryText?: string) => {
    const promptToSend = queryText || input;
    if (!promptToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: promptToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Prepare history payload for multi-turn conversational context
    const currentHistory = messages
      .filter((m) => m.id !== "welcome-msg")
      .slice(-8)
      .map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptToSend.trim(),
          history: currentHistory,
        }),
      });

      const data = await res.json();
      const rawReply =
        data?.reply ||
        data?.data?.output_text ||
        "I am here to assist with Indramani Mishra's portfolio, skills, and projects.";

      const botMessageId = `ai-${Date.now()}`;
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          sender: "ai",
          text: "",
          timestamp: timeStr,
          isStreaming: true,
        },
      ]);
      setLoading(false);

      const words = rawReply.split(" ");
      let currentIdx = 0;
      let streamedText = "";

      const interval = setInterval(() => {
        if (currentIdx < words.length) {
          streamedText += (currentIdx === 0 ? "" : " ") + words[currentIdx];
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: streamedText } : msg
            )
          );
          currentIdx++;
          scrollToBottom();
        } else {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, isStreaming: false } : msg
            )
          );

          // Auto trigger email submission if requirements tag is present
          const autoData = parseSubmissionTag(rawReply);
          if (autoData && !submittedIds.includes(botMessageId)) {
            handleInChatMessageSubmit(botMessageId, autoData, true);
          }
        }
      }, 25);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "I encountered an issue connecting to the AI service. Please feel free to reach out to Indramani directly via email or WhatsApp.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 border border-white/20 backdrop-blur-md cursor-pointer group select-none"
            aria-label="Open AI Assistant"
          >
            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold tracking-wide text-[11px] sm:text-sm">Ask AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-4 md:p-6 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                stopSpeaking();
                setIsOpen(false);
              }}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs sm:bg-black/30 pointer-events-auto"
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 340 }}
              className={`pointer-events-auto flex flex-col bg-white dark:bg-gray-900 border-0 sm:border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden transition-all duration-300 z-50 ${
                isExpanded
                  ? "w-full sm:w-[700px] h-[100dvh] sm:h-[82vh] sm:max-h-[820px] rounded-none sm:rounded-3xl"
                  : "w-full sm:w-[440px] h-[100dvh] sm:h-[630px] rounded-none sm:rounded-3xl"
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-650 to-purple-650 text-white px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between shadow-sm relative shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner font-extrabold text-xs sm:text-sm text-white">
                      AI
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 border-2 border-indigo-700 rounded-full"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-xs sm:text-sm tracking-tight text-white leading-none truncate max-w-[150px] xs:max-w-[180px] sm:max-w-none">
                        Indramani AI Assistant
                      </h3>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-blue-100 font-medium flex items-center gap-1.5 mt-0.5 sm:mt-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online &bull; Voice Enabled
                    </p>
                  </div>
                </div>

                {/* Header Controls */}
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {/* Speech Toggle Button */}
                  <button
                    onClick={() => {
                      if (isSpeaking) {
                        stopSpeaking();
                      } else {
                        speak(WELCOME_VOICE_TEXT);
                      }
                    }}
                    title={isSpeaking ? "Mute Voice" : "Play Voice Greeting"}
                    className={`p-1.5 sm:p-2 rounded-xl transition-colors border-none cursor-pointer flex items-center justify-center ${
                      isSpeaking ? "bg-yellow-400 text-gray-950 animate-pulse font-bold" : "text-white/80 hover:text-white hover:bg-white/15 bg-transparent"
                    }`}
                    aria-label="Toggle Voice"
                  >
                    {isSpeaking ? <RiVolumeUpLine size={16} /> : <RiVolumeMuteLine size={16} />}
                  </button>

                  <button
                    onClick={handleReset}
                    title="Refresh Chat"
                    className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
                    aria-label="Refresh Chat"
                  >
                    <RiRefreshLine size={16} />
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Collapse" : "Expand"}
                    className="hidden sm:flex p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-colors border-none bg-transparent cursor-pointer items-center justify-center"
                    aria-label="Toggle Expand"
                  >
                    {isExpanded ? <RiFullscreenExitLine size={16} /> : <RiFullscreenLine size={16} />}
                  </button>
                  <button
                    onClick={() => {
                      stopSpeaking();
                      setIsOpen(false);
                    }}
                    title="Close"
                    className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
                    aria-label="Close Chat"
                  >
                    <RiCloseLine size={20} />
                  </button>
                </div>
              </div>

              {/* Voice active indicator banner */}
              {isSpeaking && (
                <div className="bg-indigo-50 dark:bg-indigo-950/60 border-b border-indigo-100 dark:border-indigo-900/40 px-3 py-1.5 flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                    </span>
                    <span className="font-semibold text-[11px]">AI Assistant speaking...</span>
                  </div>
                  <button
                    onClick={stopSpeaking}
                    className="text-[11px] font-bold text-red-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    Stop
                  </button>
                </div>
              )}

              {/* Messages Body with ultra-sleek scrollbar */}
              <div 
                className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-gray-50/60 dark:bg-gray-950/50 chat-scrollbar"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(99, 102, 241, 0.35) transparent"
                }}
              >
                {messages.map((msg) => {
                  const reqData = msg.sender === "ai" ? parseSubmissionTag(msg.text) : null;
                  const isSubmitted = submittedIds.includes(msg.id);
                  const isCurrentlySubmitting = submittingId === msg.id;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-2 sm:gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1 text-[10px] sm:text-[11px] font-bold">
                          AI
                        </div>
                      )}

                      <div className={`max-w-[90%] sm:max-w-[82%] flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                        <div
                          className={`p-2.5 sm:p-3.5 rounded-2xl relative group shadow-xs transition-all ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs"
                              : "bg-white dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 border border-gray-200/80 dark:border-gray-700/70 rounded-tl-xs"
                          }`}
                        >
                          {msg.sender === "user" ? (
                            <p className="whitespace-pre-wrap text-xs sm:text-sm font-medium">{msg.text}</p>
                          ) : (
                            renderFormattedText(msg.text)
                          )}

                          {/* In-Chat Submit Status Card */}
                          {reqData && !msg.isStreaming && (
                            <div className="mt-2.5 pt-2 border-t border-gray-200/80 dark:border-gray-700/80">
                              {isSubmitted ? (
                                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs py-1.5 px-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
                                  <RiCheckboxCircleFill size={16} className="shrink-0" />
                                  <span>Form Submitted! Indramani will contact you.</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleInChatMessageSubmit(msg.id, reqData)}
                                  disabled={isCurrentlySubmitting}
                                  className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-1.5 border-none cursor-pointer"
                                >
                                  <RiMailSendLine size={14} />
                                  <span>
                                    {isCurrentlySubmitting
                                      ? "Submitting Form..."
                                      : "Submit Requirement to Indramani"}
                                  </span>
                                </button>
                              )}
                            </div>
                          )}

                          {/* Controls on bot message: Copy & Listen */}
                          {msg.sender === "ai" && !msg.isStreaming && (
                            <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => speak(msg.text)}
                                title="Listen to response"
                                className="p-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-md transition-all text-xs border-none cursor-pointer"
                              >
                                <RiVolumeUpLine size={12} />
                              </button>
                              <button
                                onClick={() => handleCopy(msg.id, msg.text)}
                                title="Copy text"
                                className="p-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-md transition-all text-xs border-none cursor-pointer"
                              >
                                {copiedId === msg.id ? (
                                  <RiCheckLine size={12} className="text-green-500" />
                                ) : (
                                  <RiFileCopyLine size={12} />
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                        <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      </div>

                      {msg.sender === "user" && (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center shrink-0 shadow-xs mt-1">
                          <RiUser3Line size={14} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Animated Typing Indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 text-[10px] sm:text-[11px] font-bold">
                      AI
                    </div>
                    <div className="bg-white dark:bg-gray-800 px-3.5 py-2.5 rounded-2xl rounded-tl-xs border border-gray-200/80 dark:border-gray-700/70 flex items-center gap-1.5 shadow-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce"></div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Carousel */}
              <div className="px-3 py-1.5 sm:py-2 bg-gray-100/80 dark:bg-gray-900/90 border-t border-gray-200/70 dark:border-gray-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 dark:text-gray-400 shrink-0 select-none pl-1">
                  Ask:
                </span>
                {SUGGESTIONS.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(item.label)}
                      disabled={loading}
                      className="shrink-0 text-[11px] sm:text-xs px-2.5 py-1 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full border border-gray-200 dark:border-gray-700/80 transition-all cursor-pointer outline-none font-medium whitespace-nowrap flex items-center gap-1 shadow-2xs hover:scale-102"
                    >
                      <IconComp className={item.color} size={12} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Links Bar */}
              <div className="px-3.5 py-1.5 sm:py-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline text-[11px] sm:text-xs"
                  >
                    <RiWhatsappLine size={13} /> WhatsApp
                  </a>
                  <span className="text-gray-300 dark:text-gray-700 select-none">&bull;</span>
                  <button
                    onClick={() => handleSend("I want to hire Indramani for a project")}
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer text-[11px] sm:text-xs"
                  >
                    <RiBriefcaseLine size={13} /> Hire Me
                  </button>
                </div>
                <Link
                  href="/resume"
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold flex items-center gap-1 text-[11px] sm:text-xs"
                >
                  <RiFileLine size={12} /> ATS Resume <RiArrowRightLine size={11} />
                </Link>
              </div>

              {/* Input Bar */}
              <div className="p-2.5 sm:p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shrink-0 pb-safe">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/80 rounded-2xl px-3 py-1.5 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-inner"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question or requirement..."
                    disabled={loading}
                    className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:shadow-none border-none cursor-pointer flex items-center justify-center shrink-0"
                    aria-label="Send message"
                  >
                    <RiSendPlaneFill size={15} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
