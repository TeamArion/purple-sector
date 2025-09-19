// src/components/Preloader.tsx
"use client";
import { useEffect, useRef, useState } from "react";

/** Utility: clamp 0..100 */
const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** Promise with timeout fallback */
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | void> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(undefined), ms);
    p.then((v) => {
      clearTimeout(t);
      resolve(v);
    }).catch(() => {
      clearTimeout(t);
      resolve(undefined);
    });
  });
}

/** Image loader as a Promise (independent from DOM img) */
function loadImage(src: string, timeoutMs = 3000) {
  const prom = new Promise<void>((resolve) => {
    if (!src) return resolve();
    const img = new Image();
    // Better decode path for modern browsers
    img.onload = () => resolve();
    img.onerror = () => resolve(); // treat error as “done” so we don’t hang
    img.src = src;
    // If supported, try decode to ensure readiness
    (img as any).decode?.().then(() => resolve()).catch(() => resolve());
  });
  return withTimeout(prom, timeoutMs);
}

/** Video loader as a Promise (metadata level is enough for hero tiles) */
function loadVideo(src: string, timeoutMs = 3000) {
  const prom = new Promise<void>((resolve) => {
    if (!src) return resolve();
    const v = document.createElement("video");
    v.preload = "metadata";
    const done = () => resolve();
    v.addEventListener("loadeddata", done, { once: true });
    v.addEventListener("error", done, { once: true });
    v.src = src;
    // Kick load
    v.load();
  });
  return withTimeout(prom, timeoutMs);
}

/** Extract a video src (supports <video src> or <source src>) */
function getVideoSrc(el: HTMLVideoElement): string | null {
  // prefer currentSrc if already resolved
  if (el.currentSrc) return el.currentSrc;
  if (el.src) return el.src;
  const source = el.querySelector("source[src]");
  return source ? (source as HTMLSourceElement).src : null;
}

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const totalRef = useRef(0);
  const loadedRef = useRef(0);
  const animFrame = useRef<number | null>(null);

  // Smooth progress setter (batch updates)
  const bump = (val: number) => {
    // Cancel any pending frame
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(() => {
      setProgress((p) => clamp(Math.max(p, val)));
    });
  };

  useEffect(() => {
    // 1) Prefer explicitly marked critical assets
    const marked = Array.from(
      document.querySelectorAll<HTMLElement>("[data-preload]")
    );

    // 2) Fallback: everything currently in DOM
    const imgs = marked.length
      ? Array.from(marked).filter((n) => n.tagName === "IMG") as HTMLImageElement[]
      : Array.from(document.images);

    const vids = marked.length
      ? (Array.from(marked).filter((n) => n.tagName === "VIDEO") as HTMLVideoElement[])
      : Array.from(document.querySelectorAll("video"));

    // Build unique src sets to avoid double counting duplicates
    const imgSrcs = Array.from(
      new Set(
        imgs
          .map((i) => i.currentSrc || i.src)
          .filter(Boolean)
      )
    );

    const vidSrcs = Array.from(
      new Set(
        vids
          .map(getVideoSrc)
          .filter(Boolean) as string[]
      )
    );

    const total = imgSrcs.length + vidSrcs.length;

    // If nothing to preload, finish quickly
    if (total === 0) {
      bump(100);
      const fin = setTimeout(() => setDone(true), 250);
      return () => clearTimeout(fin);
    }

    totalRef.current = total;

    const onOneDone = () => {
      loadedRef.current += 1;
      const pct = Math.round((loadedRef.current / totalRef.current) * 100);
      bump(pct);
    };

    // Launch loads with per-asset timeouts
    const tasks: Promise<any>[] = [
      ...imgSrcs.map((src) => loadImage(src).then(onOneDone)),
      ...vidSrcs.map((src) => loadVideo(src).then(onOneDone)),
    ];

    // 3) Global failsafe: never hang beyond X ms
    const GLOBAL_TIMEOUT_MS = 7000; // tune if needed (5–8s typical)
    const globalTimeout = new Promise<void>((resolve) =>
      setTimeout(resolve, GLOBAL_TIMEOUT_MS)
    );

    // When either all tasks settle OR the global timeout fires, we finish
    Promise.race([
      Promise.allSettled(tasks),
      globalTimeout,
    ]).then(() => {
      bump(100);
      setTimeout(() => setDone(true), 400); // smooth fade
    });

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div className="relative">
      {/* Fullscreen preloader */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-600 ${
          done ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Replace with your logo if you want */}
        <h1 className="special-font mb-6 text-4xl md:text-6xl">Purple Sector</h1>

        <p className="mb-3 font-mono text-lg">{progress}%</p>

        <div className="h-2 w-64 rounded bg-gray-700">
          <div
            className="h-2 rounded bg-purple-600 transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* App content (kept out of a11y focus while hidden) */}
      <div aria-hidden={!done} className={done ? "visible" : "invisible"}>
        {children}
      </div>
    </div>
  );
}
