"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Plan-detail carousel. On desktop (>=769px) the site CSS lays the slides out as
 * a stacked block and hides the controls, so this only drives the horizontal
 * transform + controls on mobile — matching the original Swiper breakpoint setup.
 */
export default function Carousel({
  slides,
}: {
  slides: ReactNode[];
}) {
  const [index, setIndex] = useState(0);
  const [mobile, setMobile] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(count - 1, i + 1));

  return (
    <div className="js-planDetailSwiper swiper">
      <div
        className="swiper-wrapper"
        ref={wrapRef}
        style={
          mobile
            ? {
                display: "flex",
                transform: `translate3d(-${index * 100}%,0,0)`,
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
              }
            : undefined
        }
      >
        {slides.map((s, i) => (
          <div className="swiper-slide" key={i}>
            {s}
          </div>
        ))}
      </div>
      <div className="planDetailSwiperCntrol">
        <button type="button" className="planDetailSwiperPrevBtn alpha" onClick={prev} disabled={index === 0}>
          <img src="/assets/img/plan/btn_prev.svg" alt="Show previous" width={36} height={36} />
        </button>
        <div className="swiper-pagination" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={"swiper-pagination-bullet" + (i === index ? " swiper-pagination-bullet-active" : "")}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                cursor: "pointer",
                background: i === index ? "var(--color-main)" : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
        <button type="button" className="planDetailSwiperNextBtn alpha" onClick={next} disabled={index === count - 1}>
          <img src="/assets/img/plan/btn_next.svg" alt="Show next" width={36} height={36} />
        </button>
      </div>
    </div>
  );
}
