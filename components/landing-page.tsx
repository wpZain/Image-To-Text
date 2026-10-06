import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  FileImage,
  FileText,
  Languages,
  ScanText,
  ShieldCheck,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const features = [
  {
    icon: ScanText,
    title: "Fast OCR",
    description: "Turn scans, photos, and screenshots into clean editable text in seconds.",
  },
  {
    icon: Upload,
    title: "Drag and drop upload",
    description: "Add images from your device with a smooth, polished upload experience.",
  },
  {
    icon: FileImage,
    title: "Image preview",
    description: "Review the source image before extracting and downloading the text.",
  },
  {
    icon: Copy,
    title: "Copy and edit",
    description: "Copy key text or refine the OCR output before sharing it elsewhere.",
  },
  {
    icon: Download,
    title: "Download as TXT",
    description: "Export the finished text as a clean .txt file for easy storage.",
  },
  {
    icon: Languages,
    title: "Multi-language ready",
    description: "The architecture supports multiple OCR providers and future expansion.",
  },
];

const steps = [
  { title: "Upload an image", description: "Drag in a screenshot, receipt, note, or scanned page." },
  { title: "Extract text", description: "Let the OCR pipeline read the image and convert it to text." },
  { title: "Copy or download", description: "Review, copy, edit, and export the result in seconds." },
];

const useCases = [
  "Documents",
  "Screenshots",
  "Notes",
  "Receipts",
  "Scanned pages",
  "Photos of text",
];

const faqItems = [
  {
    question: "What image formats are supported?",
    answer: "JPG, JPEG, PNG, and WEBP are supported in the current build.",
  },
  {
    question: "How does image-to-text work?",
    answer: "The app uploads the image to a server-side OCR layer, validates it, and extracts text using the configured OCR provider.",
  },
  {
    question: "Can I extract text from screenshots?",
    answer: "Yes. Screenshots and images containing readable text are well suited to the workflow.",
  },
  {
    question: "Can I use it on mobile?",
    answer: "Yes. The workspace is intentionally designed to stack cleanly on smaller screens.",
  },
  {
    question: "Is it free?",
    answer: "Yes. This version is a free product with no payment flow or checkout experience.",
  },
  {
    question: "What happens to uploaded images?",
    answer: "The app validates and processes the image in the server route without persisting it by default. The architecture is ready for temporary cleanup or storage later.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                <Sparkles className="h-3.5 w-3.5" />
                Fast, private, and built for everyday OCR
              </div>

              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Turn images into editable text.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Extract text from screenshots, notes, receipts, documents, and scanned pages with a clean workflow designed for speed.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/extract">
                    Extract Text
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-slate-200 bg-white">
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  No payment needed
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Works on desktop and mobile
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                    OCR Workspace
                  </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-40 items-center justify-center rounded-xl border border-slate-200 bg-white">
                      <div className="text-center">
                        <FileImage className="mx-auto h-8 w-8 text-slate-400" />
                        <p className="mt-3 text-sm font-medium text-slate-700">Upload image</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                      <span>Extracted text</span>
                      <span>1,248 chars</span>
                    </div>
                    <div className="space-y-2 text-sm leading-6 text-slate-600">
                      <p>Invoice no. 1048</p>
                      <p>Customer: Northwind Labs</p>
                      <p>Amount due: $1,284.00</p>
                      <p>Thank you for your business.</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="secondary" size="sm" className="rounded-full">
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full border-slate-200 bg-white">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50/80">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 text-sm text-slate-600 sm:grid-cols-3 lg:grid-cols-4 lg:px-8">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-slate-900" /> Privacy-conscious workflow</div>
            <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-slate-900" /> Multiple image formats</div>
            <div className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-slate-900" /> Clean text output</div>
            <div className="hidden items-center gap-2 lg:flex"><Sparkles className="h-4 w-4 text-slate-900" /> Simple, fast processing</div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Built to make OCR feel effortless.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A simple three-step workflow.</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Use cases</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Practical for everyday document work.</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {useCases.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Answers you can count on.</h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Ready to go</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Extract text from your next image.</h2>
              </div>
              <Button asChild size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
                <Link href="/extract">
                  Try Image to Text
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
