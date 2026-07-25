"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Draggable before/after comparison slider.
 * Drag the pointer (arrows) left/right to wipe between the two images.
 * Reimplements the original `js-scrubSlide` behaviour.
 */
export default function ScrubSlide({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50); // percentage 0-100

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      ref={wrapRef}
      className="js-scrubSlide"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ cursor: "ew-resize", touchAction: "none" }}
    >
      <figure
        className="js-scrubSlideBefore"
        style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt="" />
      </figure>
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt="" />
      </figure>
      <div
        className="js-scrubSlidePointer"
        style={{
          left: `${pos}%`,
          transform: "translateX(-50%)",
          transition: dragging.current ? "none" : "left 0.1s ease-out",
        }}
      />
    </div>
  );
}
