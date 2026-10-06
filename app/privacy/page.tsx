import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Privacy</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Privacy statement</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
          <p>
            Textify is designed as a lightweight OCR tool for image processing, not a large-scale consumer data platform. Uploaded images are processed for the purpose of extracting text and are not intentionally stored after processing in the initial version.
          </p>
          <p>
            The app is built to keep secrets out of the browser and use server-side handling for OCR requests. We do not require payment information or user accounts for the current product flow.
          </p>
          <p>
            If a real OCR provider is configured later, that provider may have its own data-handling policies. The app architecture is ready to support temporary cleanup, storage limits, and explicit retention controls as the product grows.
          </p>
        </div>

        <div className="mt-10">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/extract">Back to OCR</Link>
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
