"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

/**
 * Click-to-flip before/after viewer used in the VOICE section.
 * Reimplements the original `js-turnSlide` behaviour.
 */
export default function TurnSlide({
  before,
  after,
}: {
  before: ReactNode;
  after: ReactNode;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="js-turnSlide">
      <div className="js-turnSlideImg">
        <figure className="js-turnSlideImgBefore">{before}</figure>
        <AnimatePresence>
          {flipped && (
            <motion.figure
              className="js-turnSlideImgAfter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ opacity: 1 }}
            >
              {after}
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
      <button
        type="button"
        className="js-turnSlideTrigger"
        onClick={() => setFlipped((v) => !v)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/voice/icon_turn.svg"
          alt=""
          className="js-turnSlideTriggerIcon"
          style={{
            transition: "transform 0.5s ease",
            transform: flipped ? "rotate(180deg)" : "none",
          }}
        />
        <span className="hoverSlideAnim">
          <span className="js-turnSlideTriggerText ffEn hoverSlideAnimBlock js-cloneTarget">
            click
          </span>
        </span>
        <span className="js-turnSlideTriggerBg" />
      </button>
    </div>
  );
}
