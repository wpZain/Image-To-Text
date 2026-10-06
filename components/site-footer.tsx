import Link from "next/link";

const footerLinks = [
  { href: "/extract", label: "Extract" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="text-sm font-semibold tracking-[0.16em] text-slate-900 uppercase">Textify</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Image-to-text OCR for documents, screenshots, notes, and everyday paperwork.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">Product</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-slate-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>hello@textify.app</li>
            <li>Support within 24 hours</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
