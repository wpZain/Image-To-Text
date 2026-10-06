import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
            <Sparkles className="h-4 w-4" />
          </span>
          Textify
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/faq" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-flex">
            Help
          </Link>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/extract">
              Extract Text
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
