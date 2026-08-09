import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import SchoolMarquee from "../components/SchoolMarquee";
import Testimonials from "../components/Testimonials";
import { HeroPhotoGrid } from "../components/Media";
import { camps, campOrder, missionParagraphs, impactStats, org } from "../data/content";
import "./Home.css";

export default function Home() {
  const [activeSeason, setActiveSeason] = useState("summer-2026");
  const camp = camps[activeSeason];

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="home-hero">
        <div className="container container-wide home-hero-inner">
          <div className="home-hero-copy">
            <span className="pill pill-dark">
              <span className="pill-dot" />
              Free · Student-run · Naperville
            </span>
            <h1>
              Curious minds.
              <br />
              <span className="home-hero-accent">Healthier lives.</span>
            </h1>
            <p className="lede">
              Human Health Explorers is a free health science program for elementary and
              middle schoolers, designed, built, and taught entirely by local high
              school students.
            </p>
            <div className="btn-row">
              <Link to="/camps/fall-2026" className="btn btn-primary btn-lg">
                See Our Programs
              </Link>
              <Link to="/get-involved" className="btn btn-ghost-light btn-lg">
                Volunteer With Us →
              </Link>
            </div>
          </div>
          <div className="home-hero-media">
            <div className="home-hero-glow" aria-hidden="true" />
            <HeroPhotoGrid />
          </div>
        </div>
      </section>

      {/* ---------- school marquee ---------- */}
      <SchoolMarquee />

      {/* ---------- mission ---------- */}
      <section className="section">
        <div className="container home-mission">
          <Reveal>
            <span className="eyebrow">Our mission</span>
            <h2>Curious minds. Healthier lives.</h2>
          </Reveal>
          <Reveal delay={90} className="home-mission-body">
            {missionParagraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
            <p className="home-mission-kicker">
              Let's turn curiosity about the human body into knowledge that lasts.
            </p>
            <div className="btn-row">
              <Link to="/about" className="btn btn-navy">
                More about us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- impact strip ---------- */}
      <section className="section-tight home-impact">
        <div className="container">
          <div className="home-impact-grid">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 70} className="home-impact-item">
                <div className="home-impact-value">{stat.value}</div>
                <div className="home-impact-label">{stat.label}</div>
                <p>{stat.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- programs, season-tabbed ---------- */}
      <section className="section" id="programs">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Our programs</span>
            <h2>Every season, a new group of explorers</h2>
            <p>Select a season to explore that program.</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="season-tabs" role="tablist" aria-label="Program seasons">
              {campOrder.map((slug) => (
                <button
                  key={slug}
                  type="button"
                  role="tab"
                  aria-selected={activeSeason === slug}
                  className={`season-tab ${activeSeason === slug ? "is-active" : ""}`}
                  onClick={() => setActiveSeason(slug)}
                >
                  {camps[slug].season}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="program-cards" key={activeSeason}>
            <article className="program-card program-card-feature">
              <span className={`pill ${camp.status === "upcoming" ? "pill-upcoming" : ""}`}>
                {camp.statusLabel}
              </span>
              <h3>{camp.title}</h3>
              <p>{camp.cardBlurb}</p>
              <div className="program-card-stat">{camp.cardStat}</div>
              <Link to={`/camps/${camp.slug}`} className="program-card-link">
                Explore {camp.season} →
              </Link>
            </article>

            <div className="program-card-side">
              {camp.stats.map((stat) => (
                <div className="program-mini" key={stat.label}>
                  <span className="program-mini-value">{stat.display}</span>
                  <span className="program-mini-label">{stat.label}</span>
                </div>
              ))}
              <div className="program-meta">
                <p>
                  <strong>Where</strong>
                  {camp.venue}
                </p>
                <p>
                  <strong>When</strong>
                  {camp.schedule}
                </p>
              </div>
            </div>
          </div>

          <Reveal delay={120} className="program-secondary">
            <article className="card card-hover program-alt">
              <h3>Workshops</h3>
              <p>
                In-school and partner workshops that bring the curriculum to students
                where they already are: a full day at Madison Junior High and an ongoing
                Friday series at Ray Chinese School.
              </p>
              <div className="program-card-stat">2 workshops · 145 students</div>
              <Link to="/workshops" className="program-card-link">
                See our workshops →
              </Link>
            </article>
            <article className="card card-hover program-alt">
              <h3>Bring HHE to your school</h3>
              <p>
                We build around your schedule, whether that's a single assembly, a full day across class
                periods, or a recurring weekly series. Every format we run is free.
              </p>
              <div className="program-card-stat">Now booking for fall</div>
              <a href={`mailto:${org.email}`} className="program-card-link">
                Email us →
              </a>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ---------- testimonials ---------- */}
      <Testimonials />

      {/* ---------- closing CTA ---------- */}
      <section className="home-cta">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-light">Get involved</span>
            <h2>Fall camp is coming. Be first to hear.</h2>
            <p className="lede">
              Four connected weekly sessions this fall, two grade tracks, and a final
              challenge to wrap it all up.
            </p>
            <div className="btn-row">
              <Link to="/camps/fall-2026" className="btn btn-primary btn-lg">
                Fall 2026 details
              </Link>
              <Link to="/get-involved" className="btn btn-ghost-light btn-lg">
                Volunteer or partner
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
