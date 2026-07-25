"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Carousel from "./Carousel";
import ScrubSlide from "./ScrubSlide";
import FrameAnim from "./FrameAnim";
import { LineReveal, LinesReveal, Reveal } from "./anim";

type Media =
  | { kind: "scrub"; before: string; after: string }
  | { kind: "frame"; frames: string[] }
  | { kind: "img"; src: string };

type Slide = {
  id: string;
  arch: "full" | "half";
  narrow?: boolean;
  title: string;
  lead: ReactNode;
  media: Media;
  notice?: { company?: string; note?: string };
};

type Type = {
  id: string;
  titleSvg: string;
  titleW?: number;
  titleH?: number;
  hotspots: string[]; // css helper classes for floor-plan dots
  dt: ReactNode;
  dd: string;
  floor: string;
  slides: Slide[];
};

const P = "/assets/img/plan";

const TYPES: Type[] = [
  {
    id: "typeU",
    titleSvg: `${P}/402u/title.svg`,
    titleW: 262,
    titleH: 65,
    hotspots: ["typeU-1", "typeU-2", "typeU-3", "typeU-3B", "typeU-4"],
    dt: (
      <Fragment key="dt">
        Comfortable precisely
        <br />
        because it is compact.
      </Fragment>
    ),
    dd: "Clever beds and storage make roughly 25㎡ remarkably comfortable. Beyond “usable despite being small” to “usable because it is small” — a new kind of comfort.",
    floor: `${P}/402u/floor.webp`,
    slides: [
      {
        id: "typeU-1",
        arch: "full",
        title: "Sleep, relax, and work — all in one space.",
        lead: "A comfortable bed, a raised tatami nook to unwind, a desk to focus. Three ways to spend your time in a single space.",
        media: { kind: "scrub", before: `${P}/402u/1-b.webp`, after: `${P}/402u/1-a.webp` },
        notice: { company: "Sweat Co., Ltd. Plastic-Model Furniture Division" },
      },
      {
        id: "typeU-2",
        arch: "full",
        title: "A small private room, or a big entertainment space.",
        lead: "Gently partition the bed area with a roll screen, and it quickly becomes a place to sleep deeply, read, or enjoy a movie.",
        media: { kind: "scrub", before: `${P}/402u/2-b.webp`, after: `${P}/402u/2-a.webp` },
      },
      {
        id: "typeU-3",
        arch: "full",
        title: "Compact wet areas that widen your living space.",
        lead: "The washbasin follows your daily flow, and the shower booth adds heating, drying, and self-cleaning. A tidy design keeps daily upkeep easy.",
        media: { kind: "img", src: `${P}/402u/3.webp` },
        notice: { company: "Panasonic Construction Engineering Co., Ltd." },
      },
      {
        id: "typeU-4",
        arch: "full",
        title: "A customizable kitchen you choose to fit your life.",
        lead: "Switch between dishwasher space and storage space to match your lifestyle after moving in.",
        media: { kind: "scrub", before: `${P}/402u/4-b.webp`, after: `${P}/402u/4-a.webp` },
        notice: {
          company: "Takara Standard Co., Ltd.",
          note: "*The movable shelf shown is for illustration only and is not included.",
        },
      },
    ],
  },
  {
    id: "typeS",
    titleSvg: `${P}/402s/title.svg`,
    hotspots: ["typeS-1", "typeS-2", "typeS-3", "typeS-4"],
    dt: (
      <Fragment key="dt">
        A free layout
        <br />
        that creates comfort.
      </Fragment>
    ),
    dd: "Casters make the cabinets freely arrangeable — separate or L-shaped, and even a table when guests come.",
    floor: `${P}/402s/floor.webp`,
    slides: [
      {
        id: "typeS-1",
        arch: "full",
        title: "A movable, highly flexible kitchen.",
        lead: "Casters make the cabinets freely arrangeable — separate or L-shaped, and even a table when guests come.",
        media: { kind: "frame", frames: [1, 2, 3, 4, 5, 6].map((n) => `${P}/402s/1_${n}.webp`) },
        notice: { company: "Takara Standard Co., Ltd." },
      },
      {
        id: "typeS-2",
        arch: "half",
        narrow: true,
        title: "A bathtub only when you want one.",
        lead: (
          <>
            Featuring “Bathtope,” a removable fabric bathtub.
            <br className="displayNotSp" />
            Usually a shower, a bath when the mood strikes — a new option.
          </>
        ),
        media: { kind: "frame", frames: [1, 2, 3, 4, 5].map((n) => `${P}/402s/2_${n}.webp`) },
        notice: { company: "LIXIL Corporation" },
      },
      {
        id: "typeS-3",
        arch: "full",
        title: "Partition it, store it, move it.",
        lead: "Cabinets and closets with movable back panels double as partitions, loosely dividing the space to suit your mood or purpose.",
        media: { kind: "frame", frames: [1, 2, 3, 4, 5].map((n) => `${P}/402s/3_${n}.webp`) },
        notice: { company: "Motoyama Construction Co., Ltd." },
      },
      {
        id: "typeS-4",
        arch: "full",
        title: "A place to sleep, and a place to relax.",
        lead: "The bed on casters stores bedding and transforms into a raised nook — freely switching use to match your lifestyle.",
        media: { kind: "frame", frames: [1, 2, 3, 4, 5, 6].map((n) => `${P}/402s/4_${n}.webp`) },
        notice: { company: "Motoyama Construction Co., Ltd." },
      },
    ],
  },
  {
    id: "typeC",
    titleSvg: `${P}/402c/title.svg`,
    hotspots: ["typeC-1", "typeC-2", "typeC-3"],
    dt: (
      <Fragment key="dt">
        The “semi-private area”:
        <br />
        a new form of shared space.
      </Fragment>
    ),
    dd: "A multipurpose private space — the “semi-private area” — for hobbies, work, or guests. A shared space you can use like your own home widens the freedom of living.",
    floor: `${P}/402c/floor.webp`,
    slides: [
      {
        id: "typeC-1",
        arch: "full",
        title: "Use it all yourself, or share it with others.",
        lead: "Partitions switch it between one room and two, and a smart key lets you enter smoothly from either dwelling.",
        media: { kind: "scrub", before: `${P}/402c/1-b.webp`, after: `${P}/402c/1-a.webp` },
        notice: { company: "Union Corporation" },
      },
      {
        id: "typeC-2",
        arch: "full",
        title: "Just assemble it in a snap when you need it.",
        lead: "Furniture goes together as easily as a plastic model and stores away just as fast — expanding how you use the space.",
        media: { kind: "frame", frames: [1, 2, 3].map((n) => `${P}/402c/2_${n}.webp`) },
        notice: { company: "Sweat Co., Ltd. Plastic-Model Furniture Division" },
      },
      {
        id: "typeC-3",
        arch: "full",
        title: "Soundproofed, for a lavish big screen.",
        lead: "The open window quickly turns into a screen — enjoy movies and sports with immersive sound.",
        media: { kind: "frame", frames: [1, 2, 3].map((n) => `${P}/402c/3_${n}.webp`) },
      },
    ],
  },
];

function Arch({ arch }: { arch: "full" | "half" }) {
  return (
    <figure className="planDetailBlockArch">
      {arch === "half" ? (
        <picture>
          <source srcSet={`${P}/arch_detail.svg`} media="(max-width: 768px)" />
          <img src={`${P}/arch_detail_half.svg`} alt="" />
        </picture>
      ) : (
        <img src={`${P}/arch_detail.svg`} alt="" />
      )}
    </figure>
  );
}

function MediaView({ media }: { media: Media }) {
  if (media.kind === "scrub") return <ScrubSlide before={media.before} after={media.after} />;
  if (media.kind === "frame") return <FrameAnim frames={media.frames} />;
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={media.src} alt="" />
    </figure>
  );
}

function SlideBlock({ slide }: { slide: Slide }) {
  return (
    <section id={slide.id} className={"planDetailBlock" + (slide.narrow ? " narrowContents" : "")}>
      <Arch arch={slide.arch} />
      <LinesReveal as="h4" className="planDetailBlockTitle" lines={[slide.title]} amount={0.5} />
      <p className="planDetailBlockLead">{slide.lead}</p>
      <MediaView media={slide.media} />
      {slide.notice && (
        <div className="planDetailBlockNotice">
          {slide.notice.company && (
            <dl>
              <dt>Partner company</dt>
              <dd>{slide.notice.company}</dd>
            </dl>
          )}
          {slide.notice.note && <p>{slide.notice.note}</p>}
        </div>
      )}
    </section>
  );
}

/**
 * The floor-plan graphic. Starts large & centred, then (driven by `scale`,
 * anchored to its left edge) shrinks toward the left as the detail column
 * scrolls in — while cross-fading to the type currently in view.
 */
function PlanImg({
  active,
  scale,
}: {
  active: string | null;
  scale: number;
}) {
  return (
    <div id="planImg" className="planImg">
      <div
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "left center",
          transform: `scale(${scale})`,
          willChange: "transform",
        }}
      >
      <div id="planImgList" className="planImgList">
        {TYPES.map((t) => (
          <div
            key={t.id}
            className={"planImgItem" + (active === t.id ? " is-active" : "")}
            data-room={t.id}
          >
            {t.hotspots.map((h) => (
              <a key={h} href={`#${h.replace(/B$/, "")}`} className={`planImgLink ${h}`}>
                <span className="core" />
                <span className="visuallyHidden">{t.id} feature</span>
              </a>
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.floor} alt={`${t.id} floor plan`} width={1233} height={760} />
          </div>
        ))}
        <figure className={"planImgBase" + (active === null ? " is-active" : "")}>
          <img src={`${P}/floor_base.webp`} alt="Floor plan" width={1233} height={760} />
        </figure>
      </div>
      </div>
    </div>
  );
}

const clamp = (x: number) => Math.min(1, Math.max(0, x));

export default function Plan() {
  const [observed, setObserved] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll progress across the pinned stage (0 = plan just pinned,
  // 1 = detail column fully scrolled) drives the shrink + detail reveal.
  // Computed manually to stay robust across SSR/hydration.
  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total > 0 ? clamp(-rect.top / total) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scale = 1 - clamp(progress / 0.13) * (1 - 0.42); // 1 → 0.42
  const bodyOpacity = clamp((progress - 0.04) / (0.15 - 0.04)); // 0 → 1
  const bodyY = 80 * (1 - bodyOpacity);
  const shrunk = progress >= 0.11;

  // Keep the base plan while it is still large; once shrunk, follow the
  // detail section currently in view.
  const active = shrunk ? observed : null;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setObserved(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    TYPES.forEach((t) => {
      const el = refs.current[t.id];
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="plan" className="plan js-navStokerTrigger">
      <div className="l-inner">
        <div className="planHeader">
          <div className="planHeaderLine" />
          <div className="sectionTitle">
            <hgroup>
              <p className="sectionTitleJa mb80 spMb20">The Experimental Residence</p>
              <h2 className="visuallyHidden">PLAN</h2>
            </hgroup>
            <div className="sectionTitleEn">
              <LineReveal as="figure" className="js-svgLineAnim displayNotSp">
                <img src={`${P}/title.svg`} alt="PLAN" width={493} height={148} className="js-svgLineAnimTarget" />
              </LineReveal>
              <LineReveal as="figure" className="js-svgLineAnim displaySp">
                <img src={`${P}/title_narrow.svg`} alt="PLAN" width={145} height={43} className="js-svgLineAnimTarget" />
              </LineReveal>
            </div>
          </div>
          <section className="planIntro">
            <div className="planIntroContent">
              <LinesReveal
                as="h3"
                className="planIntroTitle"
                lines={["A new shape of living", "that shifts how you see it."]}
              />
              <Reveal as="p" className="planIntroLead">
                So residents can shape a way of living that is truly their own.
                <br className="displayNotSp" />
                Two dwellings where you can test how space is used, plus a new shared space, widen the freedom of everyday life.
              </Reveal>
            </div>
          </section>
        </div>

        <div className="planStage" ref={stageRef}>
        <PlanImg active={active} scale={scale} />

        <div
          id="planBody"
          className="planBody"
          style={{ opacity: bodyOpacity, transform: `translateY(${bodyY}px)` }}
        >
          <div className="planDetailBox mb60">
            {TYPES.map((t) => (
              <section
                key={t.id}
                id={t.id}
                className="planDetail js-planImgTrigger"
                ref={(el) => {
                  refs.current[t.id] = el;
                }}
              >
                <div className="planDetailHeader">
                  <h3 className="planDetailHeaderTitle">
                    <img src={t.titleSvg} alt={t.id} width={t.titleW} height={t.titleH} />
                  </h3>
                  <figure className="planDetailHeaderLine">
                    <img src={`${P}/line_detail.svg`} alt="" />
                  </figure>
                </div>
                <dl className="planDetailAbout">
                  <LinesReveal as="dt" lines={[t.dt]} amount={0.6} />
                  <dd>{t.dd}</dd>
                </dl>
                <div className="planDetailNarrowImg">
                  {t.slides.map((s, i) => (
                    <a key={s.id} href={`#${s.id}`} className={`planImgLink ${t.hotspots[i] ?? ""}`}>
                      <span className="core" />
                      <span className="visuallyHidden">Feature {i + 1}</span>
                    </a>
                  ))}
                  <img src={t.floor} alt={`${t.id} floor plan`} width={955} />
                </div>
                <Carousel slides={t.slides.map((s) => <SlideBlock key={s.id} slide={s} />)} />
              </section>
            ))}
          </div>

          <div className="planPartner">
            <figure className="planPartnerLine">
              <img src={`${P}/line_partner.svg`} alt="" />
            </figure>
            <dl className="planPartnerDetail">
              <dt className="planPartnerDetailTerm">About our partner companies</dt>
              <dd className="planPartnerDetailData">
                Many companies kindly cooperated in the renovation of NEXT21 Room 402.
              </dd>
              <dd className="planPartnerDetailLink">
                <a href="/assets/pdf/partner.pdf" target="_blank" className="linkBtn fs15">
                  <span className="hoverSlideAnim">
                    <span className="linkBtnText ffEn fw700 textUppercase hoverSlideAnimBlock js-cloneTarget">
                      detail
                    </span>
                  </span>
                  <span className="linkBtnBg" />
                </a>
              </dd>
            </dl>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
