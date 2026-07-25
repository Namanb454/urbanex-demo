import { Fragment } from "react";
import Header from "./components/Header";
import SiteChrome from "./components/SiteChrome";
import Plan from "./components/Plan";
import Voice from "./components/Voice";
import Future from "./components/Future";
import Location from "./components/Location";
import { LineReveal, LinesReveal, Reveal } from "./components/anim";

const FOOTER_NAV = [
  { href: "#header", label: "home" },
  { href: "#about", label: "about" },
  { href: "#plan", label: "plan" },
  { href: "#voice", label: "voice" },
  { href: "#future", label: "future" },
  { href: "#location", label: "location" },
];

export default function Home() {
  return (
    <div id="container" className="l-container">
      <Header />

      <main id="main" className="l-main">
        <SiteChrome />

        {/* ABOUT */}
        <section id="about" className="about js-navStokerTrigger">
          <h2 className="visuallyHidden">ABOUT TRANS×HOME</h2>
          <div className="l-inner">
            <div className="aboutTitle">
              <LineReveal as="div" className="js-svgLineAnim displayNotSp">
                <img src="/assets/img/about/title.svg" alt="ABOUT TRANS×HOME" className="js-svgLineAnimTarget" />
              </LineReveal>
              <LineReveal as="div" className="js-svgLineAnim displaySp">
                <img src="/assets/img/about/title_narrow.svg" alt="ABOUT TRANS×HOME" width={325} height={81} className="js-svgLineAnimTarget" />
              </LineReveal>
            </div>
            <p className="aboutCopy">
              <LinesReveal
                as="span"
                className="aboutCopyLine"
                lines={[
                  <Fragment key="l">
                    Your space —<br className="displaySp" />
                    and you yourself — keep changing.
                  </Fragment>,
                ]}
              />
              <LinesReveal as="span" className="aboutCopyLine" lines={["Why not begin an experiment in living?"]} />
            </p>
            <Reveal as="p" className="aboutLead">
              Today, the ways we live and work keep changing — and homes, too, are being asked to be far more flexible and free. TRANS×HOME [The Transforming Home] is an experimental residence proposed by Osaka Gas Urban Development and grown together with the people who live in it. By freely using two different types of dwelling and a new kind of private space — the “semi-private area” — residents find their own way of living by actually “trying out” everyday life. That first step eventually connects to someone else’s new way of living, too. TRANS×HOME is a home meant to be a doorway to that future.
            </Reveal>
          </div>
        </section>

        <Plan />
        <Voice />
        <Future />
        <Location />

        {/* CONTACT */}
        <section id="contact" className="contact js-navStokerTrigger">
          <div className="l-inner">
            <div className="fullLine" />
            <div className="contactInner">
              <h2 className="visuallyHidden">CONTACT</h2>
              <LineReveal as="figure" className="contactTitle js-svgLineAnim">
                <img src="/assets/img/contact/title.svg" alt="CONTACT" width={394} height={60} className="js-svgLineAnimTarget" />
              </LineReveal>
              <div className="contactBody">
                <dl className="contactDetail">
                  <dt className="contactDetailTerm">Contact</dt>
                  <dd className="contactDetailData">
                    <p className="contactDetailLead">
                      <span className="contactDetailLeadMain">
                        Get in touch about TRANS×HOME [The Transforming Home] here.
                      </span>
                    </p>
                    <a
                      href="https://ogud.co.jp/inquiry/?type=personal&content=experimental"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="frameBtn"
                    >
                      <span className="frameBtnText hoverSlideAnim">
                        <span className="hoverSlideAnimBlock js-cloneTarget">Make an inquiry</span>
                      </span>
                      <span className="frameBtnBg" />
                    </a>
                  </dd>
                </dl>
                <dl className="contactDetail">
                  <dt className="contactDetailTerm">Application guidelines</dt>
                  <dd className="contactDetailData">
                    <p className="contactDetailLead">
                      <span className="contactDetailLeadMain">
                        Applications for TRANS×HOME [The Transforming Home] are now closed (deadline: September 21, 2025). Thank you to everyone who applied.
                      </span>
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="fullLine reverse" />
          </div>
        </section>
      </main>

      <footer id="footer" className="footer">
        <div className="l-inner">
          <div className="footerNav">
            <div className="footerNavLogo">
              <figure className="js-svgLineAnim displayNotSp">
                <img src="/assets/img/footer/logo.svg" alt="TRANS×HOME" className="js-svgLineAnimTarget" />
              </figure>
              <figure className="js-svgLineAnim displaySp">
                <img src="/assets/img/footer/logo_narrow.svg" alt="TRANS×HOME" width={333} height={90} className="js-svgLineAnimTarget" />
              </figure>
            </div>
            <ul className="footerNavList">
              {FOOTER_NAV.map((n) => (
                <li className="footerNavListItem" key={n.href}>
                  <a href={n.href} className="footerNavLink hoverSlideAnim">
                    <span className="visuallyHidden">{n.label}</span>
                    <span className="footerNavLinkBlock hoverSlideAnimBlock js-cloneTarget">
                      <span className="js-svgLineAnim displayNotSp">
                        <img src={`/assets/img/footer/nav_${n.label}.svg`} alt="" className="js-svgLineAnimTarget" />
                      </span>
                      <span className="js-svgLineAnim displaySp">
                        <img src={`/assets/img/footer/nav_${n.label}_narrow.svg`} alt="" className="js-svgLineAnimTarget" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="fullLine" />
          </div>
        </div>
        <div className="footerInner">
          <div className="l-inner">
            <div className="footerContents">
              <ul className="footerLink">
                <li className="footerLinkItem">
                  <a href="https://ogud.co.jp/" target="_blank" rel="noopener noreferrer" className="alpha">
                    <img src="/assets/img/footer/logo_ogud_tagline.svg" alt="Osaka Gas Urban Development" width={222} height={45} />
                  </a>
                </li>
                <li className="footerLinkItem next21">
                  <a href="https://www.osakagas.co.jp/company/efforts/next21/" target="_blank" rel="noopener noreferrer" className="alpha">
                    <img src="/assets/img/footer/logo_next21.svg" alt="Osaka Gas Experimental Housing NEXT21" width={110} height={24} />
                  </a>
                </li>
                <li className="footerLinkItem daigasgroup">
                  <a href="https://www.daigasgroup.com/" target="_blank" rel="noopener noreferrer" className="alpha">
                    <img src="/assets/img/footer/logo_daigasgroup.svg" alt="Daigas Group" width={108} height={43} />
                  </a>
                </li>
                <li className="footerLinkItem policy">
                  <a href="https://ogud.co.jp/privacy/" target="_blank" rel="noopener noreferrer" className="alpha textUppercase">
                    privacy policy
                  </a>
                </li>
              </ul>
              <p className="footerCopyright">
                <small>
                  Copyright (C) OSAKA GAS URBAN DEVELOPMENT Co., Ltd. <br className="displayNarrow" />
                  all rights reserved.
                </small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
