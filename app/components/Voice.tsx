"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import TurnSlide from "./TurnSlide";
import { LineReveal, LinesReveal, Reveal } from "./anim";

const V = "/assets/img/voice";
const clamp = (x: number) => Math.min(1, Math.max(0, x));

type VoiceItem = {
  id: string;
  titleSvg: string;
  titleW: number;
  titleH: number;
  dt: ReactNode;
  dd: ReactNode;
  before: ReactNode;
  after: ReactNode;
  bg: { wide: string; narrow: string; w: number; h: number };
};

function Img({ base, w, h }: { base: string; w: number; h: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={base} alt="" width={w} height={h} />;
}
function Picture({ base, landscape, w, h }: { base: string; landscape: string; w: number; h: number }) {
  return (
    <picture>
      <source srcSet={landscape} media="(max-width: 768px)" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base} alt="" width={w} height={h} />
    </picture>
  );
}

const ITEMS: VoiceItem[] = [
  {
    id: "voice_1",
    titleSvg: `${V}/detail_1_title.svg`,
    titleW: 179,
    titleH: 73,
    dt: (
      <>
        I want to use one space
        <br />
        much more freely.
      </>
    ),
    dd: "“It would be so handy to do all kinds of things in one place.” Real customer voices like this inspired a space that plays many roles. Free from fixed ideas, you can try a way of living that fits you.",
    before: <Img base={`${V}/detail_1_img_before.webp`} w={385} h={314} />,
    after: <Img base={`${V}/detail_1_img_after.webp`} w={385} h={314} />,
    bg: { wide: `${V}/detail_1_bg.webp`, narrow: `${V}/detail_1_bg_narrow.webp`, w: 885, h: 651 },
  },
  {
    id: "voice_2",
    titleSvg: `${V}/detail_2_title.svg`,
    titleW: 197,
    titleH: 73,
    dt: (
      <>
        I want the bedroom to match
        <br />
        our two rhythms of life.
      </>
    ),
    dd: "When guests come, connect the bed and furniture into one open space. Turn it into a raised nook, and it becomes a cozy place to gather.",
    before: <Picture base={`${V}/detail_2_img_before.webp`} landscape={`${V}/detail_2_img_landscape_before.webp`} w={240} h={400} />,
    after: <Picture base={`${V}/detail_2_img_after.webp`} landscape={`${V}/detail_2_img_landscape_after.webp`} w={240} h={400} />,
    bg: { wide: `${V}/detail_2_bg.webp`, narrow: `${V}/detail_2_bg_narrow.webp`, w: 735, h: 648 },
  },
  {
    id: "voice_3",
    titleSvg: `${V}/detail_3_title.svg`,
    titleW: 193,
    titleH: 73,
    dt: (
      <>
        I want the kitchen to match
        <br />
        my cooking and dining mood.
      </>
    ),
    dd: (
      <>
        Some days you want to enjoy conversation, others to focus on cooking.
        <br />
        A movable kitchen and mobile furniture let you switch freely
        <br />
        between facing-in and wall-side layouts.
      </>
    ),
    before: <Img base={`${V}/detail_3_img_before.webp`} w={363} h={315} />,
    after: <Img base={`${V}/detail_3_img_after.webp`} w={363} h={315} />,
    bg: { wide: `${V}/detail_3_bg.webp`, narrow: `${V}/detail_3_bg_narrow.webp`, w: 885, h: 657 },
  },
  {
    id: "voice_4",
    titleSvg: `${V}/detail_4_title.svg`,
    titleW: 198,
    titleH: 76,
    dt: <>I want a place I can drop into, without worrying about my noise or anyone else’s.</>,
    dd: (
      <>
        Whether you want to lose yourself in a hobby without minding the noise, or gather with others.
        <br />
        Having “another private space” right next to your home opens everyday life up far more freely.
      </>
    ),
    before: <Picture base={`${V}/detail_4_img_before.webp`} landscape={`${V}/detail_4_img_landscape_before.webp`} w={240} h={400} />,
    after: <Picture base={`${V}/detail_4_img_after.webp`} landscape={`${V}/detail_4_img_landscape_after.webp`} w={240} h={400} />,
    bg: { wide: `${V}/detail_4_bg.webp`, narrow: `${V}/detail_4_bg_narrow.webp`, w: 783, h: 653 },
  },
];

export default function Voice() {
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [stageH, setStageH] = useState<number | undefined>(undefined);

  // Vertical scroll through the pinned stage translates the card row
  // horizontally — reimplements the original's scroll-driven `voiceList`.
  useEffect(() => {
    const travel = () => {
      const list = listRef.current;
      if (!list) return 0;
      return Math.max(0, list.scrollWidth - window.innerWidth);
    };
    const onScroll = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;
      setX(p * travel());
    };
    const onResize = () => {
      setStageH(travel() + window.innerHeight);
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Re-measure once images have loaded (card widths depend on them).
    const t = setTimeout(onResize, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="voice" className="voice js-navStokerTrigger">
      <div className="l-inner">
        <div className="voiceHeader">
          <div className="voiceHeaderLine" />
          <div className="sectionTitle">
            <hgroup>
              <p className="sectionTitleJa mb80 spMb20">Customer Voices</p>
              <h2 className="visuallyHidden">VOICE</h2>
            </hgroup>
            <div className="sectionTitleEn">
              <LineReveal as="figure" className="js-svgLineAnim displayNotSp">
                <img src={`${V}/title.svg`} alt="VOICE" width={700} height={170} className="js-svgLineAnimTarget" />
              </LineReveal>
              <LineReveal as="figure" className="js-svgLineAnim displaySp">
                <img src={`${V}/title_narrow.svg`} alt="VOICE" width={206} height={49} className="js-svgLineAnimTarget" />
              </LineReveal>
            </div>
          </div>
          <section className="voiceIntro">
            <div className="voiceIntroContent">
              <LinesReveal as="h3" className="voiceIntroTitle" lines={["Development shaped by customer voices, expanding everyday life."]} />
              <Reveal as="p" className="voiceIntroLead">
                TRANS×HOME [The Transforming Home] is an experimental residence planned by Osaka Gas Urban Development with an eye on the needs of future living.
                <br />
                Drawing on voices from customers of the homes we have delivered so far, we open up the possibilities of layout and equipment, aiming for a life that expands more freely and openly.
              </Reveal>
            </div>
          </section>
        </div>
      </div>

      <div className="voiceStage" ref={stageRef} style={{ height: stageH }}>
        <div className="voiceListWrap">
          <div
            id="voiceList"
            className="voiceList l-inner"
            ref={listRef}
            style={{ transform: `translate3d(${-x}px,0,0)` }}
          >
            {ITEMS.map((item) => (
              <section id={item.id} className="voiceDetail" key={item.id}>
                <div className="voiceDetailContents">
                  <div className="voiceDetailContentsText">
                    <h3 className="voiceDetailTitle">
                      <img src={item.titleSvg} alt={item.id.replace("_", " ").toUpperCase()} width={item.titleW} height={item.titleH} />
                    </h3>
                    <dl>
                      <dt className="voiceDetailTerm">{item.dt}</dt>
                      <dd className="voiceDetailData">{item.dd}</dd>
                    </dl>
                  </div>
                  <div className="voiceDetailContentsImg">
                    <TurnSlide before={item.before} after={item.after} />
                  </div>
                </div>
                <figure className="voiceDetailBg">
                  <picture>
                    <source srcSet={item.bg.narrow} media="(max-width: 768px)" />
                    <img src={item.bg.wide} alt="" width={item.bg.w} height={item.bg.h} />
                  </picture>
                </figure>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
