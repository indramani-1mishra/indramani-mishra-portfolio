import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import TopBar from "../components/TopBar";
import WorkspaceShowcaseBanner from "../components/WorkspaceShowcaseBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiryModal from "../components/QuickEnquiryModal";
import AIChatbot from "../components/AIChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://indramani-mishra-portfolio.vercel.app"),
  title: "Indramani Mishra - Full Stack Developer (MERN & Next.js)",
  description: "Professional portfolio of Indramani Mishra. Specialized in creating fast, scalable, and SEO-friendly web/app solutions using Next.js and MERN stack. Available for Hire and New Projects.",
  keywords: ["Indramani Mishra", "Full Stack Developer", "MERN Stack", "Next.js Developer", "Web Development", "App Development", "Software Engineer", "React Developer", "New Delhi", "Chirag Delhi"],
  authors: [{ name: "Indramani Mishra" }],
  creator: "Indramani Mishra",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://indramani-mishra-portfolio.vercel.app", // Fallback URL
    title: "Indramani Mishra - Full Stack Developer",
    description: "Welcome to my portfolio! I build high-performance, dynamic websites and scalable applications using the latest web technologies.",
    siteName: "Indramani Mishra Portfolio",
    images: [
      {
        url: "/my_image.jpg",
        width: 1200,
        height: 630,
        alt: "Indramani Mishra - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indramani Mishra - Full Stack Developer",
    description: "I build high-performance, dynamic websites and scalable applications. Hire me for your next big project!",
    images: ["/my_image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden w-full max-w-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200 overflow-x-hidden w-full max-w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TopBar />
          <WorkspaceShowcaseBanner />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <QuickEnquiryModal />
          <AIChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}

