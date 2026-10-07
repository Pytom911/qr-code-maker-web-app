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

/* FRAME FEATURE DISABLED - original type & options commented, code kept for re-enable
type FrameTemplate = "none" | "rounded" | "love" | "circle" | "square-ornament";
const FRAME_OPTIONS: { value: FrameTemplate; label: string; icon: string }[] = [
  { value: "none", label: "None", icon: "○" },
  { value: "rounded", label: "Rounded", icon: "▢" },
  { value: "love", label: "Love", icon: "♥" },
  { value: "circle", label: "Circle", icon: "◎" },
  { value: "square-ornament", label: "Ornament", icon: "⛶" },
];
*/
type FrameTemplate = "none" | "rounded" | "love" | "circle" | "square-ornament";
const FRAME_OPTIONS: { value: FrameTemplate; label: string; icon: string }[] = [];

const COLOR_PRESETS = [
  { name: "Classic Black", fg: "#000000", bg: "#ffffff" },
  { name: "Ocean Blue", fg: "#1e40af", bg: "#dbeafe" },
  { name: "Ruby Red", fg: "#dc2626", bg: "#fee2e2" },
  { name: "Forest Green", fg: "#15803d", bg: "#dcfce7" },
  { name: "Royal Purple", fg: "#7c3aed", bg: "#ede9fe" },
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

/* FRAME FEATURE DISABLED - drawHeartShape commented, code kept for re-enable
function drawHeartShape(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const scale = size / 24;
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(0, -2);
  ctx.bezierCurveTo(0, -5, -5, -7, -7, -2);
  ctx.bezierCurveTo(-9, 2, -4, 6, 0, 10);
  ctx.bezierCurveTo(4, 6, 9, 2, 7, -2);
  ctx.bezierCurveTo(5, -7, 0, -5, 0, -2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
*/
function drawHeartShape(_ctx: CanvasRenderingContext2D, _cx: number, _cy: number, _size: number, _color: string) {}

/* FRAME FEATURE DISABLED - drawFrameDecoration commented, code kept for re-enable
function drawFrameDecoration(
  ctx: CanvasRenderingContext2D,
  template: FrameTemplate,
  size: number,
  fgColor: string
) {
  ctx.save();
  ctx.strokeStyle = fgColor;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const thick = size >= 512 ? 14 : 3.5;
  const thin = size >= 512 ? 5 : 1.5;
  if (template === "rounded") {
    const pad = size * 0.025;
    const r = size * 0.08;
    const x = pad;
    const y = pad;
    const w = size - pad * 2;
    const h = size - pad * 2;
    ctx.lineWidth = thick;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = thin;
    ctx.globalAlpha = 0.45;
    const ip = pad + thick * 0.9;
    const ir = r * 0.55;
    ctx.beginPath();
    ctx.moveTo(ip + ir, ip);
    ctx.lineTo(ip + w - pad * 2 - ir, ip);
    ctx.quadraticCurveTo(ip + w - pad * 2, ip, ip + w - pad * 2, ip + ir);
    ctx.lineTo(ip + w - pad * 2, ip + h - pad * 2 - ir);
    ctx.quadraticCurveTo(ip + w - pad * 2, ip + h - pad * 2, ip + w - pad * 2 - ir, ip + h - pad * 2);
    ctx.lineTo(ip + ir, ip + h - pad * 2);
    ctx.quadraticCurveTo(ip, ip + h - pad * 2, ip, ip + h - pad * 2 - ir);
    ctx.lineTo(ip, ip + ir);
    ctx.quadraticCurveTo(ip, ip, ip + ir, ip);
    ctx.closePath();
    ctx.stroke();
  } else if (template === "love") {
    const pad = size * 0.02;
    const r = size * 0.06;
    ctx.lineWidth = thick * 0.85;
    ctx.beginPath();
    ctx.moveTo(pad + r, pad);
    ctx.lineTo(size - pad - r, pad);
    ctx.quadraticCurveTo(size - pad, pad, size - pad, pad + r);
    ctx.lineTo(size - pad, size - pad - r);
    ctx.quadraticCurveTo(size - pad, size - pad, size - pad - r, size - pad);
    ctx.lineTo(pad + r, size - pad);
    ctx.quadraticCurveTo(pad, size - pad, pad, size - pad - r);
    ctx.lineTo(pad, pad + r);
    ctx.quadraticCurveTo(pad, pad, pad + r, pad);
    ctx.closePath();
    ctx.stroke();
    const hs = size * 0.11;
    const corners: [number, number][] = [
      [pad + hs * 0.55, pad + hs * 0.35],
      [size - pad - hs * 0.55, pad + hs * 0.35],
      [pad + hs * 0.55, size - pad - hs * 0.35],
      [size - pad - hs * 0.55, size - pad - hs * 0.35],
    ];
    corners.forEach(([cx, cy]) => drawHeartShape(ctx, cx, cy, hs, fgColor));
    const mx = size / 2;
    const myTop = pad + hs * 0.95;
    const myBot = size - pad - hs * 0.95;
    drawHeartShape(ctx, mx, myTop, hs * 0.72, fgColor);
    drawHeartShape(ctx, mx, myBot, hs * 0.72, fgColor);
    const myLeft = pad + hs * 0.95;
    const myRight = size - pad - hs * 0.95;
    drawHeartShape(ctx, myLeft, mx, hs * 0.72, fgColor);
    drawHeartShape(ctx, myRight, mx, hs * 0.72, fgColor);
  } else if (template === "circle") {
    const cx = size / 2;
    const cy = size / 2;
    const outer = size * 0.485;
    const inner = size * 0.43;
    ctx.lineWidth = thick;
    ctx.beginPath();
    ctx.arc(cx, cy, outer, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = thin * 1.2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    const dots = 12;
    const dotR = size >= 512 ? 7 : 1.8;
    const dotRadius = size * 0.46;
    for (let i = 0; i < dots; i++) {
      const a = (Math.PI * 2 * i) / dots;
      const x = cx + Math.cos(a) * dotRadius;
      const y = cy + Math.sin(a) * dotRadius;
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = fgColor;
      ctx.fill();
    }
  } else if (template === "square-ornament") {
    const pad = size * 0.018;
    ctx.lineWidth = thick;
    ctx.strokeRect(pad, pad, size - pad * 2, size - pad * 2);
    ctx.lineWidth = thin;
    ctx.globalAlpha = 0.45;
    const ip = pad + thick * 0.75;
    ctx.strokeRect(ip, ip, size - ip * 2, size - ip * 2);
    ctx.globalAlpha = 1;
    const os = size * 0.14;
    const th = thick * 0.9;
    ctx.lineWidth = th;
    const corners: [number, number, number, number][] = [
      [pad, pad, 1, 1],
      [size - pad, pad, -1, 1],
      [pad, size - pad, 1, -1],
      [size - pad, size - pad, -1, -1],
    ];
    corners.forEach(([x, y, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(x, y + dy * os * 0.55);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * os * 0.55, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + dx * os * 0.22, y + dy * os * 0.22);
      ctx.lineTo(x + dx * os * 0.45, y + dy * os * 0.18);
      ctx.moveTo(x + dx * os * 0.22, y + dy * os * 0.22);
      ctx.lineTo(x + dx * os * 0.18, y + dy * os * 0.45);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + dx * os * 0.28, y + dy * os * 0.28, size >= 512 ? 6 : 1.6, 0, Math.PI * 2);
      ctx.fillStyle = fgColor;
      ctx.fill();
      ctx.strokeStyle = fgColor;
    });
    const mid = size * 0.5;
    const tick = size * 0.045;
    ctx.lineWidth = thin * 1.1;
    ctx.globalAlpha = 0.7;
    [
      [mid, pad, 0, 1],
      [mid, size - pad, 0, -1],
      [pad, mid, 1, 0],
      [size - pad, mid, -1, 0],
    ].forEach(([x, y, dx, dy]) => {
      ctx.beginPath();
      if (dx === 0) {
        ctx.moveTo(x - tick, y + dy * tick * 0.6);
        ctx.lineTo(x + tick, y + dy * tick * 0.6);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + dy * tick);
      } else {
        ctx.moveTo(x + dx * tick * 0.6, y - tick);
        ctx.lineTo(x + dx * tick * 0.6, y + tick);
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx * tick, y);
      }
      ctx.stroke();
    });
  }
  ctx.restore();
}
*/
function drawFrameDecoration(_ctx: CanvasRenderingContext2D, _template: FrameTemplate, _size: number, _fgColor: string) {}

/* FRAME FEATURE DISABLED - frame removed from filename, warna saja
function generateFilename(ext: string, frameTemplate: FrameTemplate, fgColor: string): string {
  const parts = ["qr-code"];
  if (frameTemplate !== "none") parts.push(frameTemplate);
*/
function generateFilename(ext: string, _frameTemplate: FrameTemplate, fgColor: string): string {
  const parts = ["qr-code"];
  const map: Record<string, string> = {
    "#000000": "",
    "#1e40af": "blue",
    "#dc2626": "red",
    "#15803d": "green",
    "#7c3aed": "purple",
  };
  const colorName = map[fgColor.toLowerCase()] || (fgColor === "#000000" ? "" : "custom");
  if (colorName) parts.push(colorName);
  return `${parts.join("-")}.${ext}`;
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
  const [qrFgColor, setQrFgColor] = useState("#000000");
  const [qrBgColor, setQrBgColor] = useState("#ffffff");
  const [frameTemplate] = useState<FrameTemplate>("none");
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
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

  useEffect(() => {
    if (!isValidUrl) return;
    const timer = window.setTimeout(() => {
      if (!previewCanvasRef.current || !canvasRef.current) return;
      const previewCtx = previewCanvasRef.current.getContext("2d");
      if (!previewCtx) return;
      previewCtx.clearRect(0, 0, 216, 216);
      previewCtx.drawImage(canvasRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height, 0, 0, 216, 216);
      /* FRAME FEATURE DISABLED - frame draw in preview commented
      if (frameTemplate !== "none") drawFrameDecoration(previewCtx, frameTemplate, 216, qrFgColor);
      */
    }, 60);
    return () => window.clearTimeout(timer);
  }, [isValidUrl, value, qrFgColor, qrBgColor, frameTemplate]);

  const applyPreset = (fg: string, bg: string) => {
    setQrFgColor(fg);
    setQrBgColor(bg);
  };

  const resetCustomization = () => {
    setQrFgColor("#000000");
    setQrBgColor("#ffffff");
    /* FRAME FEATURE DISABLED - reset commented
    setFrameTemplate("none");
    */
  };

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
    const svgClone = svgRef.current.cloneNode(true) as SVGSVGElement;
    /* FRAME FEATURE DISABLED - SVG export frame commented
    const svgNS = "http://www.w3.org/2000/svg";
    const size = 216;
    if (frameTemplate !== "none") {
      const group = document.createElementNS(svgNS, "g");
      group.setAttribute("data-frame", frameTemplate);
      group.setAttribute("fill", "none");
      group.setAttribute("stroke", qrFgColor);
      group.setAttribute("stroke-width", "3.5");
      group.setAttribute("stroke-linecap", "round");
      group.setAttribute("stroke-linejoin", "round");
      if (frameTemplate === "rounded") {
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", String(size * 0.025));
        rect.setAttribute("y", String(size * 0.025));
        rect.setAttribute("width", String(size * 0.95));
        rect.setAttribute("height", String(size * 0.95));
        rect.setAttribute("rx", String(size * 0.08));
        group.appendChild(rect);
        const inner = document.createElementNS(svgNS, "rect");
        inner.setAttribute("x", String(size * 0.025 + 3.5 * 0.9));
        inner.setAttribute("y", String(size * 0.025 + 3.5 * 0.9));
        inner.setAttribute("width", String(size * 0.95 - (3.5 * 0.9) * 2));
        inner.setAttribute("height", String(size * 0.95 - (3.5 * 0.9) * 2));
        inner.setAttribute("rx", String(size * 0.08 * 0.55));
        inner.setAttribute("stroke-width", "1.5");
        inner.setAttribute("opacity", "0.45");
        group.appendChild(inner);
      } else if (frameTemplate === "circle") {
        const cx = size / 2;
        const cy = size / 2;
        const c1 = document.createElementNS(svgNS, "circle");
        c1.setAttribute("cx", String(cx));
        c1.setAttribute("cy", String(cy));
        c1.setAttribute("r", String(size * 0.485));
        group.appendChild(c1);
        const c2 = document.createElementNS(svgNS, "circle");
        c2.setAttribute("cx", String(cx));
        c2.setAttribute("cy", String(cy));
        c2.setAttribute("r", String(size * 0.43));
        c2.setAttribute("stroke-width", "1.5");
        c2.setAttribute("opacity", "0.5");
        group.appendChild(c2);
        const dots = 12;
        const dotRadius = size * 0.46;
        for (let i = 0; i < dots; i++) {
          const a = (Math.PI * 2 * i) / dots;
          const x = cx + Math.cos(a) * dotRadius;
          const y = cy + Math.sin(a) * dotRadius;
          const dot = document.createElementNS(svgNS, "circle");
          dot.setAttribute("cx", String(x));
          dot.setAttribute("cy", String(y));
          dot.setAttribute("r", "1.8");
          dot.setAttribute("fill", qrFgColor);
          dot.setAttribute("stroke", "none");
          group.appendChild(dot);
        }
      } else if (frameTemplate === "love") {
        const pad = size * 0.02;
        const r = size * 0.06;
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", String(pad));
        rect.setAttribute("y", String(pad));
        rect.setAttribute("width", String(size - pad * 2));
        rect.setAttribute("height", String(size - pad * 2));
        rect.setAttribute("rx", String(r));
        rect.setAttribute("stroke-width", String(3.5 * 0.85));
        group.appendChild(rect);
        const hs = size * 0.11;
        const scale = hs / 24;
        const corners: [number, number][] = [
          [pad + hs * 0.55, pad + hs * 0.35],
          [size - pad - hs * 0.55, pad + hs * 0.35],
          [pad + hs * 0.55, size - pad - hs * 0.35],
          [size - pad - hs * 0.55, size - pad - hs * 0.35],
        ];
        corners.forEach(([hx, hy]) => {
          const heart = document.createElementNS(svgNS, "path");
          heart.setAttribute("fill", qrFgColor);
          heart.setAttribute("stroke", "none");
          heart.setAttribute("transform", `translate(${hx} ${hy}) scale(${scale})`);
          heart.setAttribute("d", "M0 -2c0 -3 -5 -5 -7 0 -2 4 3 8 7 12 4 -4 9 -8 7 -12 -2 -5 -7 -3 -7 0z");
          group.appendChild(heart);
        });
        const mx = size / 2;
        [[mx, pad + hs * 0.95], [mx, size - pad - hs * 0.95], [pad + hs * 0.95, mx], [size - pad - hs * 0.95, mx]].forEach(([hx, hy]) => {
          const heart = document.createElementNS(svgNS, "path");
          heart.setAttribute("fill", qrFgColor);
          heart.setAttribute("stroke", "none");
          heart.setAttribute("transform", `translate(${hx} ${hy}) scale(${scale * 0.72})`);
          heart.setAttribute("d", "M0 -2c0 -3 -5 -5 -7 0 -2 4 3 8 7 12 4 -4 9 -8 7 -12 -2 -5 -7 -3 -7 0z");
          group.appendChild(heart);
        });
      } else if (frameTemplate === "square-ornament") {
        const pad = size * 0.018;
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", String(pad));
        rect.setAttribute("y", String(pad));
        rect.setAttribute("width", String(size - pad * 2));
        rect.setAttribute("height", String(size - pad * 2));
        group.appendChild(rect);
        const ip = pad + 3.5 * 0.75;
        const inner = document.createElementNS(svgNS, "rect");
        inner.setAttribute("x", String(ip));
        inner.setAttribute("y", String(ip));
        inner.setAttribute("width", String(size - ip * 2));
        inner.setAttribute("height", String(size - ip * 2));
        inner.setAttribute("stroke-width", "1.5");
        inner.setAttribute("opacity", "0.45");
        group.appendChild(inner);
        const os = size * 0.14;
        const corners: [number, number, number, number][] = [
          [pad, pad, 1, 1],
          [size - pad, pad, -1, 1],
          [pad, size - pad, 1, -1],
          [size - pad, size - pad, -1, -1],
        ];
        corners.forEach(([x, y, dx, dy]) => {
          const p1 = document.createElementNS(svgNS, "path");
          p1.setAttribute("d", `M${x} ${y + dy * os * 0.55} L${x} ${y} L${x + dx * os * 0.55} ${y}`);
          p1.setAttribute("stroke-width", String(3.5 * 0.9));
          group.appendChild(p1);
          const p2 = document.createElementNS(svgNS, "path");
          p2.setAttribute("d", `M${x + dx * os * 0.22} ${y + dy * os * 0.22} L${x + dx * os * 0.45} ${y + dy * os * 0.18} M${x + dx * os * 0.22} ${y + dy * os * 0.22} L${x + dx * os * 0.18} ${y + dy * os * 0.45}`);
          p2.setAttribute("stroke-width", String(3.5 * 0.9));
          group.appendChild(p2);
          const dot = document.createElementNS(svgNS, "circle");
          dot.setAttribute("cx", String(x + dx * os * 0.28));
          dot.setAttribute("cy", String(y + dy * os * 0.28));
          dot.setAttribute("r", "1.6");
          dot.setAttribute("fill", qrFgColor);
          dot.setAttribute("stroke", "none");
          group.appendChild(dot);
        });
      }
      svgClone.appendChild(group);
    }
    */
    const svgData = new XMLSerializer().serializeToString(svgClone);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = generateFilename("svg", frameTemplate, qrFgColor);
    link.click();
    URL.revokeObjectURL(url);
    setIsDropdownOpen(false);
  };

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvasRef.current.width;
    exportCanvas.height = canvasRef.current.height;
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return;
    exportCtx.fillStyle = qrBgColor;
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportCtx.drawImage(canvasRef.current, 0, 0);
    /* FRAME FEATURE DISABLED - PNG frame commented
    if (frameTemplate !== "none") drawFrameDecoration(exportCtx, frameTemplate, exportCanvas.width, qrFgColor);
    */
    exportCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = generateFilename("png", frameTemplate, qrFgColor);
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
    setIsDropdownOpen(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
        <QRCodeCanvas
          ref={canvasRef}
          value={value.trim() || "https://example.com"}
          size={1024}
          level="H"
          includeMargin={true}
          fgColor={qrFgColor}
          bgColor={qrBgColor}
        />
        <QRCodeSVG
          ref={svgRef}
          value={value.trim() || "https://example.com"}
          size={216}
          level="H"
          fgColor={qrFgColor}
          bgColor={qrBgColor}
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
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-amber-300 active:scale-[0.98] touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
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
          <section aria-labelledby="create-heading" className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
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
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-800" />
                <span className="text-xs font-medium text-zinc-500">Customize</span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button key={p.name} onClick={() => applyPreset(p.fg, p.bg)} className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800">{p.name}</button>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[{l:"QR Color",v:qrFgColor,s:setQrFgColor},{l:"Background",v:qrBgColor,s:setQrBgColor}].map((c) => (
                  <div key={c.l}>
                    <label className="mb-1.5 block text-xs text-zinc-400">{c.l}</label>
                    <input type="color" value={c.v} onChange={(e) => c.s(e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 p-1" />
                  </div>
                ))}
              </div>
              {/* FRAME FEATURE DISABLED - frame picker commented
              <div className="mt-5 grid grid-cols-5 gap-2">
                {FRAME_OPTIONS.map((f) => (
                  <button key={f.value} onClick={() => setFrameTemplate(f.value)} className={`rounded-lg border p-2 text-center text-xs ${frameTemplate === f.value ? "border-white bg-zinc-800" : "border-zinc-800 bg-zinc-900/80"}`}>{f.icon}<span className="block mt-1">{f.label}</span></button>
                ))}
              </div>
              */}
              <button onClick={resetCustomization} className="mt-5 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-700">Reset</button>
            </div>
          </section>

          <section aria-labelledby="preview-heading" className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="mb-5 flex w-full items-center justify-between">
              <h2 id="preview-heading" className="text-lg font-semibold tracking-tight scroll-mt-24">
                Preview
              </h2>
              <span className="text-xs text-zinc-500">Level H • 30% resilient</span>
            </div>
            {isValidUrl ? (
              <div className="rounded-2xl p-4 ring-1 ring-white/10" style={{ backgroundColor: qrBgColor }}>
                <canvas ref={previewCanvasRef} width={216} height={216} className="block h-[216px] w-[216px]" />
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
                <div className="absolute bottom-full mb-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900" role="menu">
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
