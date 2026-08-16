import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { HeroPhoto } from "../components/Media";
import { faqGroups, org } from "../data/content";
import "./FAQ.css";

export default function FAQ() {
  // Keyed by "group-item" so the two sections open independently of each other.
  const [open, setOpen] = useState("0-0");

  return (
    <>
      <section className="page-hero">
        <HeroPhoto page="faq" />
        <div className="container">
          <span className="pill pill-dark">
            <span className="pill-dot" />
            Questions
          </span>
          <h1>Frequently asked questions</h1>
          <p className="lede">
            The things families, schools, and community partners ask us most. If your
            question isn't here, email us and a student will actually answer.
          </p>
          <div className="btn-row">
            <a href={`mailto:${org.email}`} className="btn btn-primary btn-lg">
              Ask us anything
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <div className="faq-groups">
            {faqGroups.map((group, g) => (
              <div className="faq-group" key={group.title}>
                <Reveal className="faq-group-head">
                  <h2>{group.title}</h2>
                  {group.subtitle && <p>{group.subtitle}</p>}
                </Reveal>

                <div className="faq-list">
                  {group.faqs.map((faq, i) => {
                    const key = `${g}-${i}`;
                    return (
                      <Reveal key={faq.q} delay={Math.min(i, 4) * 50}>
                        <div className={`faq-item ${open === key ? "is-open" : ""}`}>
                          <button
                            type="button"
                            className="faq-question"
                            aria-expanded={open === key}
                            onClick={() => setOpen(open === key ? null : key)}
                          >
                            <span>{faq.q}</span>
                            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                              <path
                                d="M12 5v14M5 12h14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                          <div className="faq-answer">
                            <p>{faq.a}</p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Reveal delay={120} className="faq-aside">
            <div className="faq-card">
              <h3>Still stuck?</h3>
              <p>
                We're a small student team, so email reaches us fastest. Tell us what you
                need and we'll get back to you.
              </p>
              <a href={`mailto:${org.email}`} className="btn btn-navy">
                {org.email}
              </a>
            </div>

            <div className="faq-card faq-card-alt">
              <h3>Looking for a program?</h3>
              <p>
                Fall 2026 runs four connected Sunday sessions from October 18 to
                November 8, split into two grade tracks, ending in a final challenge.
              </p>
              <Link to="/camps/fall-2026" className="btn btn-primary">
                Fall 2026 details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
