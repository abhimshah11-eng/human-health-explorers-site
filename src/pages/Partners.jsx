import Reveal from "../components/Reveal";
import { HeroPhoto } from "../components/Media";
import { partners, donors, org } from "../data/content";
import "./Partners.css";

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Only donors with a real logo on file are shown. The grid carries no captions,
// so a missing logo would render as an unexplained blank tile.
const donorsWithLogos = donors.filter((d) => d.logo);

export default function Partners() {
  return (
    <>
      <section className="page-hero">
        <HeroPhoto page="partners" />
        <div className="container">
          <span className="pill pill-dark">
            <span className="pill-dot" />
            Powered by our community
          </span>
          <h1>The partners behind every free session</h1>
          <p className="lede">
            Human Health Explorers has never charged a family a cent. That's possible
            because organizations back a student-run program before it has a track
            record, and because local businesses show up for the kids in it.
          </p>
          <div className="btn-row">
            <a href={`mailto:${org.email}`} className="btn btn-primary btn-lg">
              Partner with us
            </a>
          </div>
        </div>
      </section>

      {/* ---------- partner organizations ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Partner organizations</span>
            <h2>Who makes HHE possible</h2>
            <p>
              The organizations HHE holds a standing relationship with, beyond any single
              camp or workshop.
            </p>
          </Reveal>

          <div className="partner-grid">
            {partners.map((partner, i) => (
              <Reveal key={partner.name} delay={i * 70}>
                <article className="partner-card">
                  <div className="partner-logo">
                    {partner.logo ? (
                      <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" />
                    ) : (
                      <span className="partner-monogram">{initials(partner.name)}</span>
                    )}
                  </div>
                  <span className="partner-kind">{partner.kind}</span>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- donor logo grid: static, no captions ---------- */}
      {donorsWithLogos.length > 0 && (
        <section className="section section-surface">
          <div className="container container-wide">
            <Reveal className="section-head center">
              <span className="eyebrow">Thank you</span>
              <h2>Sponsors</h2>
              {/* Deliberately season-agnostic: future sponsors get added to this
                  same grid rather than getting a separate per-season section. */}
              <p>The sponsors that make our sessions possible.</p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="donor-grid">
                {donorsWithLogos.map((donor) => (
                  <li className="donor-tile" key={donor.name}>
                    <img src={donor.logo} alt={donor.name} loading="lazy" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- CTA ---------- */}
      <section className="partner-cta">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-light">Support HHE</span>
            <h2>What support actually buys</h2>
            <p className="lede">
              We're a first-year, student-run program with no paid staff. Every
              contribution goes directly toward one thing: running one more free session
              for one more group of kids. That's the space to host it, the materials to
              run it, and the prizes that make kids want to come back.
            </p>
            <div className="partner-perks">
              <div>
                <h3>Space</h3>
                <p>
                  A donated room is the single highest-value thing a partner can give us.
                  It's what keeps our camps free.
                </p>
              </div>
              <div>
                <h3>Materials</h3>
                <p>
                  Hands-on activities need real physical supplies: worksheets, group
                  activity kits, props, and materials for up to 50 kids at a session.
                </p>
              </div>
              <div>
                <h3>Prizes</h3>
                <p>
                  Prizes give kids something to work toward, especially for the fall
                  challenge, which any student can enter even if they didn't attend a
                  session.
                </p>
              </div>
            </div>
            <div className="btn-row">
              <a href={`mailto:${org.email}`} className="btn btn-primary btn-lg">
                Talk to us about supporting HHE
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
