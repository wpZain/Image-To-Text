import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const faqItems = [
  {
    question: "What image formats are supported?",
    answer: "JPG, JPEG, PNG, and WEBP images are supported in the current version.",
  },
  {
    question: "What is the maximum file size?",
    answer: "Images up to 10MB are accepted to keep the processing flow fast and reliable.",
  },
  {
    question: "How does OCR work in this app?",
    answer: "The app validates the file on the server, then sends it to the configured OCR provider. If no API credentials are set, it runs in a clearly labeled demo mode.",
  },
  {
    question: "Can I extract text from screenshots?",
    answer: "Yes. The workflow is designed for screenshots, notes, and other image-based text sources.",
  },
  {
    question: "Can I use it on mobile?",
    answer: "Yes. The OCR workspace stacks cleanly on smaller screens and keeps actions easy to tap.",
  },
  {
    question: "Is it free?",
    answer: "Yes. This version is free and does not require Stripe or a subscription flow.",
  },
  {
    question: "What happens to my uploaded image?",
    answer: "The app processes the image without storing it permanently by default. The architecture is ready for temporary cleanup or future storage if needed.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Everything you need to know.</h1>
        </div>

        <div className="space-y-5">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">{item.question}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/extract">Try Image to Text</Link>
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
