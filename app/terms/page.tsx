import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Terms</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Terms of service</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
          <p>
            Textify provides an OCR tool for turning image-based text into editable text. The service is provided as-is for personal and business use, with the understanding that OCR accuracy will vary depending on image quality, layout, and formatting.
          </p>
          <p>
            You are responsible for ensuring that you have the right to upload and process the images you submit. Do not upload files that contain sensitive or restricted content unless you have permission to process them.
          </p>
          <p>
            The current version is offered free of charge and may be updated or changed without notice. The project is intentionally structured so that future billing or premium features can be introduced without major application restructuring.
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
