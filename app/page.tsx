"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

const SAWERIA_URL = "https://saweria.co/PytomDev";
const GITHUB_REPO = "https://github.com/Pytom911/qr-code-maker-web-app";
const GITHUB_PROFILE = "https://github.com/Pytom911";

const presets = [
  { label: "example.com", value: "https://example.com" },
  { label: "github.com/Pytom911", value: "https://github.com/Pytom911" },
  { label: "youtube.com", value: "https://youtube.com" },
];

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true" {...props}>
      <path d="M12 20.7l-1.5-1.36C6.02 15.5 3 12.72 3 9.28 3 6.5 5.14 4.5 7.75 4.5c1.5 0 2.98.7 3.94 1.83A5.13 5.13 0 0 1 15.62 4.5c2.61 0 4.75 2 4.75 4.78 0 3.44-3.02 6.22-7.5 10.06L12 20.7z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.13v3.16c0 .31.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function QrIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM21 14v.01M14 21v.01M18 18h3v3h-3z" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M16.7 5.3a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 6.47-6.47a.75.75 0 0 1 1.06 0z" clipRule="evenodd" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true" {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true" {...props}>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" />
    </svg>
  );
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="M21 15l-5-5-9 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const features = [
  {
    icon: ShieldIcon,
    title: "100% in Your Browser",
    desc: "QR codes are generated locally on your device. No uploads, no tracking, no servers.",
  },
  {
    icon: ImageIcon,
    title: "High-Quality SVG & PNG",
    desc: "Download as vector SVG for print or 1024px PNG for digital. Free, no watermarks.",
  },
  {
    icon: ZapIcon,
    title: "Error Correction Level H",
    desc: "Resilient to up to 30% damage. Scans reliably even when dirty, folded, or small.",
  },
];

const year = new Date().getFullYear();

export default function Home() {
  const [value, setValue] = useState("https://example.com");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedMenuItem, setFocusedMenuItem] = useState(-1);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const isValidUrl = useMemo(() => {
    try {
      const url = new URL(value.trim());
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape" && isDropdownOpen) {
      e.preventDefault();
      setIsDropdownOpen(false);
      setFocusedMenuItem(-1);
    } else if (e.key === "ArrowDown" && !isDropdownOpen) {
      e.preventDefault();
      setIsDropdownOpen(true);
      setFocusedMenuItem(0);
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsDropdownOpen(false);
      setFocusedMenuItem(-1);
      dropdownButtonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedMenuItem(index === 1 ? 0 : 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedMenuItem(index === 0 ? 1 : 0);
    }
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    link.click();
    URL.revokeObjectURL(url);
    setIsDropdownOpen(false);
  };

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.png";
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
    setIsDropdownOpen(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[120px]" />
        <div className="absolute top-40 -left-40 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute top-96 -right-40 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]" />
      </div>
      <div className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
        <QRCodeCanvas
          ref={canvasRef}
          value={value.trim() || "https://example.com"}
          size={1024}
          level="H"
          includeMargin={true}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 pb-10 pt-6 sm:px-8 sm:pt-8">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex w-fit items-center gap-3 rounded-xl touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <QrIcon />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold tracking-tight">QR Code Maker</span>
              <span className="block text-xs text-zinc-500">by PytomDev • Free</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2" aria-label="Primary actions">
            <a
              href={SAWERIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-black shadow-[0_0_24px_-6px] shadow-amber-400/50 transition hover:bg-amber-300 active:scale-[0.98] touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <HeartIcon />
              Support Me
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            >
              <StarIcon />
              Star on GitHub
            </a>
          </nav>
        </header>

        <section className="mb-8 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Free • No sign-up • Private
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl balance">
            Create QR Codes<br />
            <span className="text-zinc-500">in an instant.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400">
            Paste a URL, preview appears instantly, download as high-res SVG or PNG.
            Everything runs in your browser. Your data never leaves your device.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section aria-labelledby="create-heading" className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="create-heading" className="text-lg font-semibold tracking-tight scroll-mt-24">
                  Create QR Code
                </h2>
                <p className="mt-1 text-sm text-zinc-500">Enter a valid http/https link</p>
              </div>
              <span 
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isValidUrl ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/25" : "bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700"}`}
                aria-live="polite"
              >
                {isValidUrl ? <><CheckIcon /> Valid</> : "Pending"}
              </span>
            </div>
            <div className="mt-5">
              <label htmlFor="qr-input" className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-300">
                URL
                <span className="text-xs font-normal text-zinc-500">{value.length}/2000</span>
              </label>
              <div className="relative">
                <textarea
                  id="qr-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="https://your-domain.com…"
                  maxLength={2000}
                  rows={5}
                  spellCheck={false}
                  className={`w-full resize-none rounded-xl border bg-zinc-950 px-4 py-3 pr-10 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 outline-none transition focus-visible:ring-2 ${value && !isValidUrl ? "border-red-500/70 focus-visible:ring-red-500/40" : "border-zinc-800 focus:border-zinc-600 focus-visible:ring-zinc-500/40"}`}
                />
                {value && (
                  <button
                    type="button"
                    onClick={() => setValue("")}
                    aria-label="Clear input"
                    className="absolute right-3 top-3 rounded-lg px-2 py-1 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
                  >
                    Clear
                  </button>
                )}
              </div>
              {value.trim() && !isValidUrl ? (
                <p className="mt-2 text-xs text-red-400" role="alert">
                  Invalid URL: start with http:// or https://
                </p>
              ) : (
                <p className="mt-2 text-xs text-zinc-600">Example: https://your-store.com/promo</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500">Try:</span>
                {presets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setValue(preset.value)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${value === preset.value ? "bg-white text-black ring-white" : "bg-zinc-800/80 text-zinc-300 ring-zinc-700 hover:bg-zinc-700 hover:text-white"}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="preview-heading" className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-5 flex w-full items-center justify-between">
              <h2 id="preview-heading" className="text-lg font-semibold tracking-tight scroll-mt-24">
                Preview
              </h2>
              <span className="text-xs text-zinc-500">Level H • 30% resilient</span>
            </div>
            {isValidUrl ? (
              <div className="rounded-2xl bg-white p-4 shadow-xl shadow-black/40 ring-1 ring-white/20">
                <QRCodeSVG
                  ref={svgRef}
                  value={value.trim()}
                  size={216}
                  level="H"
                  className="block h-[216px] w-[216px]"
                />
              </div>
            ) : (
              <div className="flex h-[216px] w-[216px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 text-center">
                <QrIcon />
                <p className="max-w-[160px] text-sm text-zinc-500">Enter a valid URL to see QR code</p>
              </div>
            )}
            {isValidUrl && (
              <p className="mt-4 max-w-[260px] truncate text-xs text-zinc-500" title={value.trim()}>
                {value.trim()}
              </p>
            )}

            <div className="relative mt-5 w-full max-w-xs" ref={dropdownRef}>
              <button
                ref={dropdownButtonRef}
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onKeyDown={handleDropdownKeyDown}
                disabled={!isValidUrl}
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
                aria-label="Select QR code download format"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Download QR Code
                <ChevronDownIcon />
              </button>

              {isDropdownOpen && (
                <div className="absolute bottom-full mb-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50" role="menu">
                  <button
                    role="menuitem"
                    onClick={downloadSVG}
                    onKeyDown={(e) => handleMenuKeyDown(e, 0)}
                    autoFocus={focusedMenuItem === 0}
                    className="flex w-full flex-col gap-0.5 border-b border-zinc-800 px-4 py-3 text-left transition hover:bg-zinc-800 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-500"
                  >
                    <span className="text-sm font-semibold text-zinc-100">SVG: Vector</span>
                    <span className="text-xs text-zinc-500">Best for print & logos</span>
                  </button>
                  <button
                    role="menuitem"
                    onClick={downloadPNG}
                    onKeyDown={(e) => handleMenuKeyDown(e, 1)}
                    autoFocus={focusedMenuItem === 1}
                    className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition hover:bg-zinc-800 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-500"
                  >
                    <span className="text-sm font-semibold text-zinc-100">PNG: 1024px</span>
                    <span className="text-xs text-zinc-500">Best for social & web</span>
                  </button>
                </div>
              )}
            </div>
            {!isValidUrl && <p className="mt-3 text-xs text-zinc-600">Button activates when URL is valid</p>}
          </section>
        </div>

        <section aria-labelledby="features-heading" className="mt-14">
          <h2 id="features-heading" className="text-xl font-bold tracking-tight sm:text-2xl scroll-mt-24">
            Why Use This Tool?
          </h2>
          <p className="mt-1 text-sm text-zinc-500">Lightweight, fast, no traps.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-700 hover:bg-zinc-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-200 ring-1 ring-zinc-700 transition group-hover:bg-white group-hover:text-black">
                  <f.icon />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="howto-heading" className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <h2 id="howto-heading" className="text-xl font-bold tracking-tight sm:text-2xl scroll-mt-24">
            How to Use
          </h2>
          <ol className="mt-6 space-y-4">
          {[
            "Enter a URL starting with http:// or https://",
            "Preview appears instantly on the right",
            "Click Download, then choose SVG or PNG",
          ].map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">{i + 1}</span>
                <p className="text-sm text-zinc-300 sm:text-[15px]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="support-heading" className="mt-6 overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.12] via-zinc-900 to-zinc-900 p-6 sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-black">
                <HeartIcon />
              </span>
              <div>
                <h2 id="support-heading" className="text-lg font-bold tracking-tight sm:text-xl scroll-mt-24">
                  This Tool Is Free. A Tip Helps.
                </h2>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-zinc-400">
                  Support PytomDev to keep building free open-source tools via Saweria.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
              <a
                href={SAWERIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-300 active:scale-[0.98] touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 sm:flex-none"
              >
                <HeartIcon />
                Support via Saweria
              </a>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-zinc-700 bg-zinc-950/60 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 sm:flex-none"
              >
                <StarIcon />
                Give a Star
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-zinc-900 pt-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                  <QrIcon />
                </span>
                <span className="font-bold tracking-tight">QR Code Maker</span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
                Free, fast, and private QR code generator. Runs 100% in your browser. Built with Next.js & Tailwind.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={SAWERIA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-300 ring-1 ring-amber-400/25 transition hover:bg-amber-400 hover:text-black touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <HeartIcon />
                  saweria.co/PytomDev
                </a>
                <a
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub PytomDev"
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-300 ring-1 ring-zinc-800 transition hover:bg-zinc-800 hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
                >
                  <GithubIcon />
                  PytomDev
                </a>
              </div>
            </div>
            <nav aria-label="Navigation">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Explore</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li><a href="#create-heading" className="text-zinc-400 transition hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded">Create QR</a></li>
                <li><a href="#preview-heading" className="text-zinc-400 transition hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded">Preview & Download</a></li>
                <li><a href="#features-heading" className="text-zinc-400 transition hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded">Features</a></li>
                <li><a href="#howto-heading" className="text-zinc-400 transition hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded">How to Use</a></li>
              </ul>
            </nav>
            <nav aria-label="Resources">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Support</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li><a href={SAWERIA_URL} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition hover:text-amber-300 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">Support via Saweria</a></li>
                <li><a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded">Star Repository</a></li>
                <li><a href={`${GITHUB_REPO}/issues`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded">Report a Bug</a></li>
                <li><a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition hover:text-white touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded">Developer Profile</a></li>
              </ul>
            </nav>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-900 pt-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-zinc-600">© {year} PytomDev. Free to use for personal & commercial purposes.</p>
            <p className="text-xs text-zinc-600">
              Like this tool? <a href={SAWERIA_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-300 hover:text-amber-200 hover:underline touch-action-manipulation">Buy me a coffee</a> • <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white hover:underline touch-action-manipulation">GitHub</a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
