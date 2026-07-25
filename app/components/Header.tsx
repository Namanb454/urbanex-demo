"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Main-visual header: loading counter overlay + fullscreen looping video. */
export default function Header() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 7) + 3);
      setCount(n);
      if (n >= 100) {
        clearInterval(id);
        setTimeout(() => setLoading(false), 350);
      }
    }, 90);
    return () => clearInterval(id);
  }, []);

  // Pick the source based on viewport width.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const set = () => {
      const src =
        window.matchMedia("(max-width: 768px)").matches
          ? "/assets/video/mv_narrow.mp4"
          : "/assets/video/mv_wide.mp4";
      if (!v.src.endsWith(src)) {
        v.src = src;
        v.load();
        v.play().catch(() => {});
      }
    };
    set();
    const mq = window.matchMedia("(max-width: 768px)");
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            id="loading"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "grid",
              placeContent: "center",
              background: "var(--color-base)",
            }}
          >
            <p className="ffEn" style={{ fontSize: 36, fontWeight: 200 }}>
              <span>{String(count).padStart(2, "0")}</span>
              <span style={{ display: "inline-block", paddingLeft: "0.3em", fontSize: 17, fontWeight: 300 }}>
                %
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <header id="header" className="header js-navStokerTrigger">
        <div className="mv">
          <h1 className="visuallyHidden">
            Live. Try. Expand. TRANS×HOME [The Transforming Home]
          </h1>
          <video
            ref={videoRef}
            id="mvVideo"
            className="mvVideo"
            muted
            playsInline
            loop
            autoPlay
            poster="/assets/video/poster.webp"
          />
        </div>
      </header>
    </>
  );
}
