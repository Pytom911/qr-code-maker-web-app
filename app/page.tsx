"use client";

import { useState, useRef, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";

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

export default function Home() {
  const [value, setValue] = useState("https://example.com");
  const qrRef = useRef<SVGSVGElement>(null);

  const isValidUrl = useMemo(() => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, [value]);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  const applyPreset = (url: string) => setValue(url);

  return (
    <main className="min-h-screen bg-gray-900 px-6 py-12">
      <div className="mx-auto max-w-5xl">
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
                  ref={qrRef}
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
            <button
              type="button"
              onClick={downloadQR}
              disabled={!isValidUrl}
              className="mt-6 w-full max-w-xs rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            >
              Download QR Code
            </button>
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
                Output SVG Berkualitas Tinggi
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Unduh QR Code dalam format SVG (vektor) — tajam tanpa batas resolusi, siap cetak maupun digital.
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
              <p className="text-zinc-300">Klik tombol Download QR Code untuk menyimpan berkas SVG</p>
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