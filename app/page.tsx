"use client";

import { useState, useRef, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";

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

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            QR Code Maker
          </h1>
          <p className="mt-3 text-gray-500">
            Buat QR Code dengan cepat dan gratis.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Buat QR Code
            </h2>
            <div className="mt-6">
              <label
                htmlFor="qr-input"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-gray-900 outline-none transition ${
                  value && !isValidUrl ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-black focus:ring-gray-200"
                } focus:ring-2`}
              />
              {value && !isValidUrl && (
                <p className="mt-1 text-xs text-red-500">URL tidak valid (perlu http/https)</p>
              )}
            </div>
          </section>

          <section className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
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
              <div className="flex h-[220px] w-[220px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center text-sm text-gray-400">
                Masukkan URL valid
              </div>
            )}
            <button
              type="button"
              onClick={downloadQR}
              disabled={!isValidUrl}
              className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Download QR Code
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}