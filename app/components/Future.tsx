"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { LineReveal, LinesReveal, Reveal } from "./anim";

const F = "/assets/img/future";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Scroll-driven concept diagram. Three "sean" stages cross-fade while growing
 * in size, and their notice-pins pop in — reimplements the original pinned
 * GSAP timeline (positions/sizes come from the site CSS; opacity/scale here).
 */
function ConceptDiagram() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setP(total > 0 ? clamp01(-rect.top / total) : 0);
    };
    const onResize = () => onScroll();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Per-stage opacity / size.
  const s1op = 1 - seg(p, 0.26, 0.36);
  const s2op = seg(p, 0.32, 0.42) * (1 - seg(p, 0.58, 0.66));
  const s3op = seg(p, 0.62, 0.72);
  const s1w = lerp(24, 30, seg(p, 0, 0.33));
  const s2w = lerp(38, 47, seg(p, 0.32, 0.66));
  const s3w = lerp(54, 72, seg(p, 0.62, 1));

  // Caption cross-fade.
  const cap1 = 1 - seg(p, 0.26, 0.36);
  const cap2 = seg(p, 0.34, 0.44) * (1 - seg(p, 0.58, 0.66));
  const cap3 = seg(p, 0.64, 0.74);

  // Pin pop-in (staggered).
  const pin2 = (i: number) => seg(p, 0.42 + i * 0.03, 0.5 + i * 0.03);
  const pin3 = (i: number) => seg(p, 0.73 + i * 0.018, 0.8 + i * 0.018);

  const sean3notice = `${F}/sean_3_notice.svg`;

  return (
    <div className="futureStage" ref={stageRef}>
    <div className="futurePin">
      <div id="conceptDiagram" className="conceptDiagram">
        {/* Stage 1 */}
        <div
          id="conceptDiagram_sean-1"
          className="conceptDiagramSean"
          style={{ width: `${s1w}%`, opacity: s1op }}
        >
          <img src={`${F}/sean_1.svg`} alt="" id="conceptDiagram_sean-1_img" className="conceptDiagramSeanImg" />
        </div>

        {/* Stage 2 */}
        <div
          id="conceptDiagram_sean-2"
          className="conceptDiagramSean"
          style={{ width: `${s2w}%`, opacity: s2op }}
        >
          {[0, 1, 2].map((i) => (
            <img
              key={i}
              src={`${F}/sean_2_notice.svg`}
              alt=""
              className="noticePin conceptDiagram_sean-2_notice"
              style={{ opacity: pin2(i) }}
            />
          ))}
          <img src={`${F}/sean_2.svg`} alt="" id="conceptDiagram_sean-2_img" className="conceptDiagramSeanImg" />
        </div>

        {/* Stage 3 */}
        <div
          id="conceptDiagram_sean-3"
          className="conceptDiagramSean"
          style={{ width: `${s3w}%`, opacity: s3op }}
        >
          <div>
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src={sean3notice}
                alt=""
                className="noticePin conceptDiagram_sean-3_notice_other"
                style={{ opacity: pin3(i) }}
              />
            ))}
          </div>
          <div>
            {[4, 5].map((i) => (
              <img
                key={i}
                src={sean3notice}
                alt=""
                className="noticePin conceptDiagram_sean-3_notice_other smallPin"
                style={{ opacity: pin3(i) }}
              />
            ))}
          </div>
          <div>
            {[6, 7].map((i) => (
              <img
                key={i}
                src={sean3notice}
                alt=""
                className="noticePin conceptDiagram_sean-3_notice_other largePin"
                style={{ opacity: pin3(i) }}
              />
            ))}
          </div>
          <img
            src={sean3notice}
            alt=""
            id="conceptDiagram_sean-3_notice_primary"
            className="noticePin conceptDiagram_sean-3_notice_primaly largePin"
            style={{ opacity: pin3(8) }}
          />
          <img src={`${F}/sean_3.svg`} alt="" id="conceptDiagram_sean-3_img" className="conceptDiagramSeanImg" />
        </div>
      </div>

      {/* Captions (below the diagram, cross-fading per stage) */}
      <div className="conceptCaptions">
        <figure className="conceptCaption" style={{ opacity: cap1 }}>
          <img src={`${F}/sean_1_caption.svg`} alt="" />
        </figure>
        <figure className="conceptCaption" style={{ opacity: cap2 }}>
          <img src={`${F}/sean_2_caption.svg`} alt="" />
        </figure>
        <figure className="conceptCaption" style={{ opacity: cap3 }}>
          <img src={`${F}/sean_3_caption.svg`} alt="" />
        </figure>
      </div>
    </div>
    </div>
  );
}

export default function Future() {
  return (
    <section id="future" className="future js-navStokerTrigger">
      <div className="l-inner">
        <div className="futureHeader">
          <div className="futureHeaderLine" />
          <div className="sectionTitle">
            <hgroup>
              <p className="sectionTitleJa mb80 spMb20">The Future of Living</p>
              <h2 className="visuallyHidden">FUTURE</h2>
            </hgroup>
            <div className="sectionTitleEn">
              <LineReveal as="figure" className="js-svgLineAnim displayNotSp">
                <img src={`${F}/title.svg`} alt="FUTURE" width={885} height={151} className="js-svgLineAnimTarget" />
              </LineReveal>
              <LineReveal as="figure" className="js-svgLineAnim displaySp">
                <img src={`${F}/title_narrow.svg`} alt="FUTURE" width={261} height={45} className="js-svgLineAnimTarget" />
              </LineReveal>
            </div>
          </div>
          <section className="futureIntro">
            <div className="futureIntroContent">
              <LinesReveal
                as="h3"
                className="futureIntroTitle"
                lines={[
                  "By trying out how we live,",
                  "we keep building homes",
                  <Fragment key="l">
                    you can call
                    <br />
                    “just right.”
                  </Fragment>,
                ]}
              />
              <Reveal as="p" className="futureIntroLead">
                The insights and voices born from living in the experimental residence are reflected in Osaka Gas Urban Development’s SCENES condominiums and URBANEX rental apartments. Together with our customers, we keep finding and testing ways of living, continually updating what a home can be.
              </Reveal>
            </div>
          </section>
        </div>
      </div>

      <ConceptDiagram />

      <div className="futureFooter l-inner">
        <LinesReveal
          as="p"
          className="futureFooterCopy"
          lines={["Osaka Gas Urban Development", "draws on the insights from the", "TRANS×HOME [Transforming Home] experiment", "to create the living of tomorrow"]}
        />
        <div className="futureFooterBrand">
          {[
            {
              logo: `${F}/logo_urbanex.svg`,
              alt: "URBANEX — A new choice for city living.",
              w: 284,
              h: 54,
              lead: "Under the concept “A new choice for city living,” URBANEX is a rental-apartment brand developed across the Kansai and Tokyo metropolitan areas, delivering homes committed to convenience, advanced specifications, and comfort.",
              href: "https://ogud.co.jp/urbanex/",
              cls: "",
            },
            {
              logo: `${F}/logo_scenes.svg`,
              alt: "A residence that moves your life. SCENES",
              w: 199,
              h: 81,
              lead: "Under the concept “A residence that moves your life,” SCENES is a condominium brand developed across the Kansai region, delivering homes that stay close to each person’s life and deepen new joys and emotions the longer you live in them.",
              href: "https://ogud.co.jp/scenes/",
              cls: "ls-03",
            },
          ].map((b) => (
            <Reveal as="dl" className="futureFooterBrandDetail" key={b.href}>
              <dt className="futureFooterBrandDetailTerm">
                <img src={b.logo} alt={b.alt} width={b.w} height={b.h} />
              </dt>
              <dd className="futureFooterBrandDetailData">
                <p className={"futureFooterBrandDetailLead " + b.cls}>{b.lead}</p>
                <a href={b.href} target="_blank" rel="noopener noreferrer" className="linkHasArrow">
                  <span className="hoverSlideAnim">
                    <span className="hoverSlideAnimBlock js-cloneTarget">
                      <span className="linkText fw700 textUppercase">more detail</span>
                    </span>
                  </span>
                  <img src="/assets/img/icon_arrow.svg" alt="" />
                </a>
              </dd>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
