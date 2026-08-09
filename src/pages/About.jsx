import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Gallery, HeroPhoto } from "../components/Media";
import {
  missionParagraphs,
  impactStats,
  participation,
  schools,
  team,
  org,
} from "../data/content";
import "./About.css";

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Placeholder avatar palette, cycled by position so no two people shown next to
 * each other share a background. Cyan takes dark text; the rest take white.
 */
const AVATAR_COLORS = [
  { bg: "var(--navy)", fg: "#ffffff" },
  { bg: "var(--teal)", fg: "#ffffff" },
  { bg: "var(--blue)", fg: "#ffffff" },
  { bg: "var(--cyan)", fg: "var(--navy-deep)" },
];

/** A real headshot when one exists, otherwise a branded initials placeholder. */
function Avatar({ member, index, className = "team-avatar" }) {
  if (member.photo) {
    return <img className={className} src={member.photo} alt={member.name} loading="lazy" />;
  }
  const c = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className={className} style={{ background: c.bg, color: c.fg }} aria-hidden="true">
      {initials(member.name)}
    </div>
  );
}

function TeamCard({ member, index, featured = false }) {
  return (
    <article className={`team-card ${featured ? "is-featured" : ""}`}>
      <Avatar member={member} index={index} />
      <h3>{member.name}</h3>
      <p className="team-role">{member.role}</p>
      <p className="team-bio">{member.bio}</p>
    </article>
  );
}

// Order matters: "Kennedy Junior High School" ends in "High School" but is a
// junior high, so the middle/junior test has to run before the high school one.
function levelOf(name) {
  if (/(Middle School|Junior High School)$/.test(name)) return "Middle & Junior High";
  if (/High School$/.test(name)) return "High Schools";
  if (/Elementary School$/.test(name)) return "Elementary";
  return "Other";
}

const LEVEL_ORDER = ["High Schools", "Middle & Junior High", "Elementary", "Other"];

export default function About() {
  const schoolsByLevel = Object.fromEntries(
    LEVEL_ORDER.map((level) => [level, schools.filter((s) => levelOf(s.name) === level)])
  );

  return (
    <>
      <section className="page-hero">
        <HeroPhoto page="about" />
        <div className="container">
          <span className="pill pill-dark">
            <span className="pill-dot" />
            About us
          </span>
          <h1>Curious minds. Healthier lives.</h1>
          <p className="lede">
            A free health science program for Naperville's elementary and middle
            schoolers, built and taught entirely by local high school students.
          </p>
        </div>
      </section>

      {/* ---------- mission ---------- */}
      <section className="section">
        <div className="container about-mission">
          <Reveal>
            <span className="eyebrow">Our mission</span>
            <h2>Why we started</h2>
          </Reveal>
          <Reveal delay={80} className="about-mission-body">
            {missionParagraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- impact ---------- */}
      <section className="section section-navy">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Impact</span>
            <h2>Impact at a glance</h2>
            <p>
              Every number here comes from a single year of programming. We started in
              early 2026.
            </p>
          </Reveal>
          <div className="impact-grid">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 70}>
                <div className="impact-card">
                  <span className="impact-tag">Impact</span>
                  <div className="impact-value">{stat.value}</div>
                  <div className="impact-label">{stat.label}</div>
                  <p>{stat.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- deeper breakdown ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">A deeper look</span>
            <h2>Where those students came from</h2>
            <p>
              A breakdown of participation by program, and every school that has sent us
              at least one student.
            </p>
          </Reveal>

          <div className="breakdown">
            <Reveal className="breakdown-panel">
              <h3>Student participation</h3>
              <p className="breakdown-sub">Students who have joined an HHE program</p>
              <ul className="bar-list">
                {participation.map((row) => (
                  <li key={row.label}>
                    <div className="bar-head">
                      <span className="bar-label">{row.label}</span>
                      <span className="bar-value">{row.display}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${row.weight}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={90} className="breakdown-panel">
              <h3>Schools we serve</h3>
              <p className="breakdown-sub">
                {schools.length} schools across Naperville, Aurora, Plainfield and the
                surrounding suburbs
              </p>
              {Object.entries(schoolsByLevel)
                .filter(([, list]) => list.length > 0)
                .map(([level, list]) => (
                  <div className="school-group" key={level}>
                    <h4>
                      {level} <em>({list.length})</em>
                    </h4>
                    <div className="school-tags">
                      {list.map((s) => (
                        <span key={s.name} className="school-tag">
                          {s.name.replace(
                            / (Elementary|Middle|Junior High|High) School$/,
                            ""
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- photos ---------- */}
      <section className="section section-surface">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">In the room</span>
            <h2>What it actually looks like</h2>
            <p>
              Every photo on this site is from a real HHE session at Nichols Library or
              The Alive Center.
            </p>
          </Reveal>
          <Gallery source="summer" limit={6} />
        </div>
      </section>

      {/* ---------- team ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Our team</span>
            <h2>Run entirely by high schoolers</h2>
            <p>
              No adults at the front of the room. Every session, slide, and school
              partnership is built and delivered by students from Naperville-area high
              schools.
            </p>
          </Reveal>

          <Reveal>
            <h3 className="team-tier-title">{team.tier1.title}</h3>
            <div className="team-grid team-grid-3">
              {team.tier1.members.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} featured />
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="team-tier-title">{team.tier2.title}</h3>
            <div className="team-grid team-grid-2">
              {team.tier2.members.map((member, i) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  index={team.tier1.members.length + i}
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="team-tier-title">Mentors</h3>
            <p className="team-mentors-sub">
              The instructors and mentors who make each session run.
            </p>
            <div className="mentor-grid">
              {team.mentors.map((mentor, i) => {
                const m = typeof mentor === "string" ? { name: mentor } : mentor;
                return (
                  <div className="mentor-chip" key={m.name}>
                    <Avatar
                      member={m}
                      index={team.tier1.members.length + team.tier2.members.length + i}
                      className="mentor-avatar"
                    />
                    {m.name}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="about-cta">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-light">Join us</span>
            <h2>Want to teach, partner, or send your kid?</h2>
            <p className="lede">
              We're always looking for high schoolers who want to teach, schools that want
              a workshop, and families who want in on the next camp.
            </p>
            <div className="btn-row">
              <Link to="/get-involved" className="btn btn-primary btn-lg">
                Get involved
              </Link>
              <a href={`mailto:${org.email}`} className="btn btn-ghost-light btn-lg">
                {org.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
