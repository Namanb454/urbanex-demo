"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal, LineReveal, LinesReveal } from "./anim";

// class list per thumbnail (mirrors the original grid placement helpers)
const THUMBS = [
  "narrowWide posLeft", "mlGrid", "ml", "narrowWide posLeft", "mlGrid mbGrid",
  "mlGridHalf", "narrowWide ml", "mr", "narrowWide mlHalf", "ml",
  "mr", "mlGridHalf", "narrowWide ml mbGrid", "narrowWide", "mlAuto",
  "mlGridHalf mbGrid", "narrowWide mlAuto", "mrFull", "mlGridHalf", "narrowWide ml", "",
];
// orientation per full-size slide
const ORIENT: Record<number, "landscape" | "portrait"> = {
  6: "portrait", 9: "portrait", 14: "portrait", 17: "portrait", 20: "portrait",
};

export default function Location() {
  const [open, setOpen] = useState<number | null>(null);
  const total = 21;

  const show = (n: number) => setOpen(n);
  const close = () => setOpen(null);
  const prev = () => setOpen((n) => (n === null ? n : n === 1 ? total : n - 1));
  const next = () => setOpen((n) => (n === null ? n : n === total ? 1 : n + 1));

  return (
    <section id="location" className="location js-navStokerTrigger">
      <div className="l-inner">
        <div className="locationHeader">
          <div className="locationHeaderLine" />
          <div className="planHeaderLine" />
          <div className="sectionTitle">
            <hgroup>
              <p className="sectionTitleJa mb80 spMb20">The NEXT21 Experimental Housing Base</p>
              <h2 className="visuallyHidden">LOCATION</h2>
            </hgroup>
            <figure className="sectionTitleEn">
              <LineReveal as="figure" className="js-svgLineAnim displayNotSp">
                <img src="/assets/img/location/title.svg" alt="LOCATION" width={1093} height={152} className="js-svgLineAnimTarget" />
              </LineReveal>
              <LineReveal as="figure" className="js-svgLineAnim displaySp">
                <img src="/assets/img/location/title_narrow.svg" alt="LOCATION" width={322} height={45} className="js-svgLineAnimTarget" />
              </LineReveal>
            </figure>
          </div>
        </div>
        <section className="locationIntro">
          <div className="locationIntroContent">
            <LinesReveal
              as="h3"
              className="locationIntroTitle"
              lines={["Exploring the possibilities of home:", "an experimental housing complex."]}
            />
            <Reveal as="p" className="locationIntroLead">
              TRANS×HOME [The Transforming Home] sits within one corner of Osaka Gas’s “NEXT21 Experimental Housing Complex.” Living experiments began here in 1994, building up efforts to explore the possibilities of home from the standpoints of environment, energy, and everyday life.<br />In its 6th phase for fiscal 2025, a new living experiment is underway under the theme “Redefining what it means to gather and live together in a community.”
            </Reveal>
          </div>
        </section>

        <div className="locationImgList">
          {THUMBS.map((cls, i) => {
            const n = i + 1;
            return (
              <motion.div
                key={n}
                className={`locationThumb ${cls} js-flipTrigger`.trim()}
                data-img={n}
                onClick={() => show(n)}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="locationThumbOverlay"
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: (i % 4) * 0.08 }}
                  style={{ transformOrigin: "top" }}
                />
                <figure className="locationImgItem" data-img={n}>
                  <img src={`/assets/img/location/img_${n}.webp`} alt="" />
                  <figcaption>&copy; yosuke ohtake</figcaption>
                </figure>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <>
            <motion.div
              className="locationSlideOverlay"
              style={{ pointerEvents: "auto" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              className="locationSlideWrap"
              style={{ pointerEvents: "auto" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="swiper locationSlide">
                <div className="swiper-wrapper" style={{ transform: "none" }}>
                  <motion.div
                    key={open}
                    className="swiper-slide"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className={`locationFull ${ORIENT[open] ?? "landscape"}`}
                      style={{
                        backgroundImage: `url(/assets/img/location/img_${open}.webp)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </motion.div>
                </div>
                <button type="button" className="locationSlidePrevBtn alpha" onClick={prev}>
                  <img src="/assets/img/location/btn_prev.svg" alt="Show previous" width={65} height={65} />
                </button>
                <button type="button" className="locationSlideNextBtn alpha" onClick={next}>
                  <img src="/assets/img/location/btn_next.svg" alt="Show next" width={65} height={65} />
                </button>
                <button type="button" className="locationSlideCloseBtn alpha" onClick={close}>
                  <img src="/assets/img/location/btn_close.svg" alt="Hide slide" width={65} height={65} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
