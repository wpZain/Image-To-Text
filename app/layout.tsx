import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Textify | Image to Text OCR",
    template: "%s | Textify",
  },
  description: "Convert images into editable text with a clean OCR workspace designed for documents, screenshots, and notes.",
  keywords: ["OCR", "image to text", "scan to text", "extract text from image"],
  openGraph: {
    title: "Textify",
    description: "Image to text OCR for documents, screenshots, and handwritten notes.",
    url: "/",
    siteName: "Textify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Textify",
    description: "Turn images into editable text in seconds.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900">{children}</body>
    </html>
  );
}
