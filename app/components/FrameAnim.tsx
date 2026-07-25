"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Image-sequence "flipbook" used across the PLAN section.
 * The last frame is the in-flow base; the others cross-fade on top of it as the
 * sequence steps forward while the block is in view. Mirrors `js-frameAnimSlide`.
 */
export default function FrameAnim({ frames }: { frames: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [active, setActive] = useState(0);
  const last = frames.length - 1;

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActive((a) => (a >= last ? 0 : a + 1));
    }, 900);
    return () => clearInterval(id);
  }, [inView, last]);

  return (
    <div className="js-frameAnimSlide" ref={ref}>
      {frames.map((src, i) => (
        <figure
          key={i}
          className={
            "js-frameAnimSlideItem" + (i === active && i !== last ? " is-active" : "")
          }
          style={
            i !== last
              ? { transition: "opacity 0.5s ease" }
              : undefined
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" />
        </figure>
      ))}
    </div>
  );
}
