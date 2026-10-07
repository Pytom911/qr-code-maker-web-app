"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

const presets = [
  { label: "https://example.com", value: "https://example.com" },
  { label: "https://github.com/Pytom911", value: "https://github.com/Pytom911" },
  { label: "https://youtube.com", value: "https://youtube.com" },
];

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
      {...props}
    >
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

export default function Home() {
  const [value, setValue] = useState("https://example.com");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isValidUrl = useMemo(() => {
    try {
      const url = new URL(value);
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

  const applyPreset = (url: string) => setValue(url);

  return (
    <main className="min-h-screen bg-gray-900 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Hidden Canvas for PNG Export */}
        <div className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
          <QRCodeCanvas
            ref={canvasRef}
            value={value}
            size={1024}
            level="H"
            includeMargin={true}
          />
        </div>

        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-4xl font-bold text-zinc-100">
            QR Code Maker
          </h1>
          <a
            href="https://github.com/Pytom911/qr-code-maker-web-app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-100 transition-colors bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
          >
            <StarIcon />
            Star di GitHub
          </a>
        </header>

        <p className="mb-8 text-zinc-400">
          Buat QR Code dengan cepat dan gratis. Dibuat oleh <a href="https://github.com/Pytom911" target="_blank" rel="noopener noreferrer" className="text-zinc-100 hover:underline">PytomDev</a>.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-100">
              Buat QR Code
            </h2>
            <div className="mt-6">
              <label
                htmlFor="qr-input"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                URL (http/https)
              </label>
              <textarea
                id="qr-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="https://example.com"
                maxLength={2000}
                rows={5}
                className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none ${
                  value && !isValidUrl ? "border-red-500 bg-zinc-900 text-zinc-100" : "border-zinc-700 bg-zinc-900 text-zinc-100"
                } transition-colors focus-visible:ring-2 focus-visible:ring-zinc-500`}
              />
              {value && !isValidUrl && (
                <p className="mt-1 text-xs text-red-400" role="alert">
                  URL tidak valid (perlu http/https)
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <span className="text-sm text-zinc-400">Contoh:</span>
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset.value)}
                    className="px-3 py-1 text-xs font-medium text-zinc-300 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
                  >
                    {preset.label.replace("https://", "")}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-zinc-100">
              Preview
            </h2>
            {isValidUrl ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <QRCodeSVG
                  ref={svgRef}
                  value={value}
                  size={220}
                  level="H"
                />
              </div>
            ) : (
              <div className="flex h-[220px] w-[220px] items-center justify-center rounded-2xl border border-dashed border-zinc-600 bg-zinc-900 text-center text-sm text-zinc-400">
                Masukkan URL valid
              </div>
            )}
            
            <div className="relative mt-6 w-full max-w-xs" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={!isValidUrl}
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
              >
                Download QR Code
                <ChevronDownIcon />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute bottom-full mb-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 shadow-xl"
                  role="menu"
                >
                  <button
                    role="menuitem"
                    onClick={downloadSVG}
                    className="flex w-full items-center px-4 py-3 text-left text-sm text-zinc-100 hover:bg-zinc-700 transition-colors border-b border-zinc-700"
                  >
                    Download SVG (Vector)
                  </button>
                  <button
                    role="menuitem"
                    onClick={downloadPNG}
                    className="flex w-full items-center px-4 py-3 text-left text-sm text-zinc-100 hover:bg-zinc-700 transition-colors"
                  >
                    Download PNG (High Res)
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-zinc-100">
            Mengapa Memilih QR Code Maker
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-zinc-100">
                100% di Browser
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                QR Code Anda diproses langsung di perangkat, tanpa dikirim ke server. Data Anda aman.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-zinc-100">
                Output SVG & PNG Berkualitas Tinggi
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Unduh QR Code dalam format SVG (vektor) atau PNG resolusi tinggi — tajam tanpa batas, siap cetak maupun digital.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-zinc-100">
                Error Correction Level H
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                QR Code yang dihasilkan tahan kerusakan hingga 30%, menjamin pemindaian tetap berhasil.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-zinc-700 bg-zinc-800 p-8">
          <h2 className="mb-6 text-2xl font-bold text-zinc-100">
            Cara Membuat QR Code
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-sm font-bold text-zinc-100">1</span>
              <p className="text-zinc-300">Masukkan URL dengan protokol <code className="bg-zinc-900 px-1 py-0.5 text-sm text-zinc-200">http://</code> atau <code className="bg-zinc-900 px-1 py-0.5 text-sm text-zinc-200">https://</code></p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-sm font-bold text-zinc-100">2</span>
              <p className="text-zinc-300">Preview QR Code muncul otomatis di samping</p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-sm font-bold text-zinc-100">3</span>
              <p className="text-zinc-300">Klik tombol Download untuk memilih format SVG atau PNG</p>
            </li>
          </ol>
        </section>

        <footer className="mt-16 border-t border-zinc-800 pt-8">
          <p className="mb-4 text-center text-zinc-400">
            Suka dengan alat ini? Beri bintang di <a href="https://github.com/Pytom911/qr-code-maker-web-app" target="_blank" rel="noopener noreferrer" className="text-zinc-100 hover:underline">repository GitHub</a>.
          </p>
          <p className="text-center text-sm text-zinc-500">
            Dibuat dengan ❤️ oleh <a href="https://github.com/Pytom911" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:underline">PytomDev</a>
          </p>
        </footer>
      </div>
    </main>
  );
}