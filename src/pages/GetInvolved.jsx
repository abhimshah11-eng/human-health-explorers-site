import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { org } from "../data/content";
import "./GetInvolved.css";

const paths = [
  {
    tag: "For families",
    title: "Send your student",
    body: "Camps are free, hands-on, and built for grades 4 through 8. Fall 2026 runs four connected Sunday sessions from October 18 to November 8, split into two grade tracks. Registration opens soon, so check the Fall page or follow us for updates.",
    // No live fall form yet, so this points at updates rather than a stale
    // summer form. Swap back to the interest form once fall registration opens.
    action: { label: "Follow for updates", href: org.instagram, external: true },
    secondary: { label: "Fall 2026 details", to: "/camps/fall-2026" },
  },
  {
    tag: "For high schoolers",
    title: "Teach with us",
    body: "HHE is entirely student-run. No prior teaching experience needed. Our curriculum and slides are built in-house, and new instructors shadow a session before leading one. Tell us what you'd want to teach.",
    action: { label: "Email us to volunteer", href: `mailto:${org.email}` },
    secondary: { label: "Meet the team", to: "/about" },
  },
  {
    tag: "For schools",
    title: "Book a workshop",
    body: "We've run a full day across class periods at a junior high and a recurring weekly series for ages 5 to 12. Tell us your grade levels, time slot, and rough headcount, and we'll build around it, free.",
    action: { label: "Request a workshop", href: `mailto:${org.email}` },
    secondary: { label: "See past workshops", to: "/workshops" },
  },
  {
    tag: "For businesses",
    title: "Sponsor a session",
    body: "Local businesses have donated over $1,000 in prizes so far. Space, materials, and prizes are what keep every session free, and every contribution goes straight to students.",
    action: { label: "Talk about sponsoring", href: `mailto:${org.email}` },
    secondary: { label: "Current partners", to: "/partners" },
  },
];

export default function GetInvolved() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="pill pill-dark">
            <span className="pill-dot" />
            Get involved
          </span>
          <h1>There's a Place for You Here</h1>
          <p className="lede">
            Whether you're a parent, a high schooler who wants to teach, a school looking
            for a workshop, or a business that wants to back local students, it all
            starts with a message.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="involve-grid">
            {paths.map((path, i) => (
              <Reveal key={path.title} delay={i * 70}>
                <article className="involve-card">
                  <span className="involve-tag">{path.tag}</span>
                  <h2>{path.title}</h2>
                  <p>{path.body}</p>
                  <div className="btn-row">
                    {path.action.external ? (
                      <a
                        href={path.action.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-navy"
                      >
                        {path.action.label}
                      </a>
                    ) : (
                      <a href={path.action.href} className="btn btn-navy">
                        {path.action.label}
                      </a>
                    )}
                    <Link to={path.secondary.to} className="btn btn-ghost">
                      {path.secondary.label}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container involve-contact">
          <Reveal>
            <span className="eyebrow">Reach us</span>
            <h2>A student reads every message</h2>
            <p className="lede">
              We don't have an office or a phone line. Email gets to us fastest, and
              Instagram is where session photos and announcements go up first.
            </p>
          </Reveal>
          <Reveal delay={90} className="involve-contact-cards">
            <a href={`mailto:${org.email}`} className="contact-card">
              <span className="contact-label">Email</span>
              <span className="contact-value">{org.email}</span>
            </a>
            <a
              href={org.instagram}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <span className="contact-label">Instagram</span>
              <span className="contact-value">{org.instagramHandle}</span>
            </a>
            <div className="contact-card">
              <span className="contact-label">Based in</span>
              <span className="contact-value">Naperville, Illinois</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
