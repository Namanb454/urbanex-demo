"use client";

import { useEffect, useState } from "react";

const NAV = [
  { id: "header", ja: "Home", en: "home", w: 168, h: 33 },
  { id: "about", ja: "TRANS×HOME [The Transforming Home]", en: "about", w: 170, h: 33 },
  { id: "plan", ja: "The Experimental Residence", en: "plan", w: 102, h: 32 },
  { id: "voice", ja: "Customer Voices", en: "voice", w: 143, h: 34 },
  { id: "future", ja: "The Future of Living", en: "future", w: 183, h: 34 },
  { id: "location", ja: "The NEXT21 Experimental Housing Base", en: "location", w: 226, h: 33 },
  { id: "contact", ja: "Contact & Application", en: "contact", w: 213, h: 36 },
];

/** Fixed nav trigger button + slide-in navigation overlay (toggled via body.is-navOpen). */
export default function SiteChrome() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-navOpen", open);
    return () => document.body.classList.remove("is-navOpen");
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        id="navTrigger"
        className="navTrigger"
        onClick={() => setOpen((v) => !v)}
        style={{
          opacity: visible || open ? 1 : 0,
          pointerEvents: visible || open ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
        aria-expanded={open}
      >
        <span className="navTriggerInner">
          <img src="/assets/img/nav/trigger_bar-top.svg" alt="" width={32} height={4} className="navTriggerBar" />
          <img src="/assets/img/nav/trigger_bar-middle.svg" alt="" width={32} height={4} className="navTriggerBar" />
          <img src="/assets/img/nav/trigger_bar-bottom.svg" alt="" width={32} height={4} className="navTriggerBar" />
        </span>
        <picture>
          <source srcSet="/assets/img/nav/trigger_base_narrow.svg" media="(max-width: 768px)" />
          <img src="/assets/img/nav/trigger_base.svg" alt="" width={65} height={65} />
        </picture>
        <span className="visuallyHidden">Toggle navigation</span>
      </button>

      <nav id="nav" className="nav" inert={!open}>
        <div className="navInner">
          <figure id="navStoker" className="navStoker">
            <img src="/assets/img/nav/icon_active.svg" alt="" width={15} height={15} />
          </figure>
          <ul className="navList">
            {NAV.map((n) => (
              <li className="navListItem" data-nav={n.id} key={n.id}>
                {n.id === "contact" && (
                  <figure className="displayNotNarrow mb30">
                    <img src="/assets/img/nav/line_nav.svg" alt="" />
                  </figure>
                )}
                <a href={`#${n.id}`} className="navLink hoverSlideAnim" onClick={(e) => go(e, n.id)}>
                  <span className="hoverSlideAnimBlock js-cloneTarget">
                    <span className="js-svgLineAnim displayNotNarrow">
                      <img src={`/assets/img/nav/${n.en}.svg`} alt={n.en.toUpperCase()} className="js-svgLineAnimTarget" width={n.w} height={n.h} />
                    </span>
                    <span className="js-svgLineAnim displayNarrow">
                      <img src={`/assets/img/nav/${n.en}_narrow.svg`} alt={n.en.toUpperCase()} className="js-svgLineAnimTarget" width={80} height={24} />
                    </span>
                    <span className="navLinkText">{n.ja}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <figure className="navBase">
          <picture>
            <source srcSet="/assets/img/nav/base_narrow.webp" media="(max-width: 768px)" />
            <img src="/assets/img/nav/base.webp" alt="" width={418} height={717} />
          </picture>
        </figure>
      </nav>
    </>
  );
}
