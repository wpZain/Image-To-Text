import { ImageExtractor } from "@/components/ocr/image-extractor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ExtractPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <ImageExtractor />
      <SiteFooter />
    </div>
  );
}
