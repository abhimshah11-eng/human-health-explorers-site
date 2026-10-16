import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ReferenceSlider from "../components/ReferenceSlider";
import { HeroPhoto, StatBar } from "../components/Media";
import { CalendarIcon, PinIcon, PeopleIcon } from "../components/Icons";
import { workshops, workshopStats, workshopStatsNote, org } from "../data/content";
import "./Workshops.css";

export default function Workshops() {
  return (
    <>
      <section className="page-hero">
        <HeroPhoto page="workshops" />
        <div className="container">
          <span className="pill pill-dark">
            <span className="pill-dot" />
            Year-round programs
          </span>
          <h1>Workshops</h1>
          <p className="lede">
            Condensed health science sessions delivered inside schools and partner
            programs, bringing the curriculum to students where they already are,
            instead of asking families to find us on a weekend.
          </p>
          <div className="btn-row">
            <a href="#engagements" className="btn btn-primary btn-lg">
              Explore workshops
            </a>
            <a href={`mailto:${org.email}`} className="btn btn-ghost-light btn-lg">
              Bring HHE to your school →
            </a>
          </div>
        </div>
      </section>

      <section className="workshop-stats">
        <div className="container">
          <StatBar stats={workshopStats} light />
          <p className="workshop-stats-note">{workshopStatsNote}</p>
        </div>
      </section>

      <section className="section anchor-offset" id="engagements">
        <div className="container">
          <Reveal className="section-head center workshop-intro">
            <span className="eyebrow">The engagements</span>
            <h2>
              {workshopStats[0].display} Workshops. {workshopStats[1].display} Sessions.
            </h2>
            <p>
              From workshops inside schools like Madison Junior High to ongoing community
              programs like Ray Chinese School, we bring HHE to kids of every age.
            </p>
          </Reveal>

          <div className="workshop-list">
            {workshops.map((workshop, i) => (
              <Reveal key={workshop.n} delay={i * 90}>
                <article className="workshop">
                  <header className="workshop-head">
                    <span className="workshop-num">{workshop.n}</span>
                    <div className="workshop-heading">
                      <h3>{workshop.name}</h3>
                      <div className="workshop-meta">
                        <span>
                          <CalendarIcon />
                          {workshop.dates}
                        </span>
                        <span>
                          <PinIcon />
                          {workshop.location}
                        </span>
                        {workshop.students && (
                          <span>
                            <PeopleIcon />
                            {workshop.students}
                          </span>
                        )}
                      </div>
                    </div>
                  </header>

                  <div className="workshop-body">
                    <div className="workshop-main">
                      <p className="workshop-summary">{workshop.summary}</p>
                      {workshop.photos?.length > 0 && (
                        <div
                          className={`workshop-photos count-${Math.min(workshop.photos.length, 3)}`}
                        >
                          {workshop.photos.map((photo) => (
                            <figure key={photo.src}>
                              <img src={photo.src} alt={photo.alt} loading="lazy" />
                            </figure>
                          ))}
                        </div>
                      )}
                    </div>

                    <aside className="workshop-sessions">
                      <h4>Workshop Sessions</h4>
                      <ol>
                        {workshop.sessions.map((session, j) => (
                          <li key={session.label}>
                            <span className="workshop-session-num">{j + 1}</span>
                            <span className="workshop-session-label">
                              {session.label}
                              {session.date ? ` | ${session.date}` : ""}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </aside>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- named reference callouts ---------- */}
      <section className="section-tight reference-section">
        <div className="container">
          <Reveal>
            <ReferenceSlider />
          </Reveal>
        </div>
      </section>

      <section className="workshop-cta">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-light">Partner with us</span>
            <h2>Bring Human Health Explorers to your school</h2>
            <p className="lede">
              From a single class period to an ongoing weekly series for ages 5 to 12, we
              adapt to whatever fits your group. Tell us your grade levels, your time
              slot, and roughly how many students, and we'll bring the curriculum, the
              materials, and the energy so your staff doesn't have to prep a thing. Every
              format is completely free.
            </p>
            <div className="btn-row">
              <a href={`mailto:${org.email}`} className="btn btn-primary btn-lg">
                Email us
              </a>
              <Link to="/get-involved" className="btn btn-ghost-light btn-lg">
                Other ways to get involved
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
