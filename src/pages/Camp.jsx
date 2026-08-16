import { Link, Navigate, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Gallery, StatBar } from "../components/Media";
import { CalendarIcon, PinIcon } from "../components/Icons";
import Testimonials from "../components/Testimonials";
import { camps, campOrder, org, testimonialsForCamp } from "../data/content";
import "./Camp.css";

/** Tilted photo collage that sits beside the copy in the feature hero. */
function HeroCollage({ photos, tag }) {
  return (
    <div className="camp-collage" aria-hidden="true">
      {photos.slice(0, 3).map((photo, i) => (
        <figure className={`camp-collage-item item-${i + 1}`} key={photo.src}>
          <img src={photo.src} alt="" loading={i === 0 ? "eager" : "lazy"} />
        </figure>
      ))}
      {tag && <span className="camp-collage-tag">{tag}</span>}
    </div>
  );
}

export default function Camp() {
  const { slug } = useParams();
  const camp = camps[slug];

  if (!camp) return <Navigate to="/camps/summer-2026" replace />;

  const isUpcoming = camp.status === "upcoming";
  // An upcoming camp only links a form once its own form exists. It must never
  // fall back to a past season's form.
  const formUrl = isUpcoming ? org.fallInterestForm : org.summerInterestForm;
  const isFeature = camp.heroLayout === "feature";

  if (isFeature) {
    return (
      <>
        {/* ---------- feature hero: copy + stats beside a photo collage ---------- */}
        <section className="page-hero camp-hero-feature">
          <div className="container camp-feature-inner">
            <div className="camp-feature-copy">
              <span className="pill pill-dark">
                <span className="pill-dot" />
                {camp.season} · {camp.statusLabel}
              </span>
              <h1>
                {camp.heroTitle[0]}{" "}
                <span className="camp-feature-accent">{camp.heroTitle[1]}</span>
              </h1>
              <p className="lede">{camp.tagline}</p>
              <div className="btn-row">
                <a href="#sessions" className="btn btn-primary btn-lg">
                  Explore the sessions ↓
                </a>
                <Link to="/camps/fall-2026" className="btn btn-ghost-light btn-lg">
                  What's next: Fall 2026 →
                </Link>
              </div>

              <hr className="camp-feature-rule" />

              <div className="camp-feature-stats">
                {camp.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="camp-feature-stat-value">{stat.display}</span>
                    <span className="camp-feature-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Kept under the numbers, where it lived before this layout. */}
              {camp.highlight && <p className="camp-feature-highlight">{camp.highlight}</p>}
            </div>

            <HeroCollage photos={camp.heroPhotos} tag={camp.heroTag} />
          </div>
        </section>

        {/* ---------- overview strip: title, blurb, session-at-a-glance cards ---------- */}
        <section className="camp-overview">
          <div className="container">
            <Reveal className="camp-overview-head">
              <h2>{camp.overviewTitle}</h2>
              <p>{camp.overviewBlurb}</p>
            </Reveal>
            <Reveal delay={80}>
              {/* Up to 4 sessions sit on one row; more split into two balanced
                  rows so the last card is never a lone orphan. */}
              <ol
                className="camp-overview-grid"
                style={{
                  "--overview-cols":
                    camp.sessions.length <= 4
                      ? camp.sessions.length
                      : Math.ceil(camp.sessions.length / 2),
                }}
              >
                {camp.sessions.map((session) => (
                  <li key={session.n}>
                    {/* Jumps to that session's full write-up further down. */}
                    <a href={`#session-${session.n}`}>
                      <span className="camp-overview-n">Session {session.n}</span>
                      <span className="camp-overview-topic">{session.topic}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <CampBody camp={camp} slug={slug} isUpcoming={isUpcoming} />
      </>
    );
  }

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="page-hero camp-hero">
        <div className="container">
          <span className={`pill pill-dark ${isUpcoming ? "is-upcoming" : ""}`}>
            <span className="pill-dot" />
            {camp.season} · {camp.statusLabel}
          </span>
          <h1>{camp.title}</h1>
          <p className="lede">{camp.tagline}</p>
          <div className="btn-row">
            {isUpcoming ? (
              <>
                {formUrl && (
                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    Join the interest list
                  </a>
                )}
                <a
                  href={`mailto:${org.email}`}
                  className={`btn btn-lg ${formUrl ? "btn-ghost-light" : "btn-primary"}`}
                >
                  Ask a question
                </a>
                {!formUrl && (
                  <a
                    href={org.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost-light btn-lg"
                  >
                    Follow for updates
                  </a>
                )}
              </>
            ) : (
              <>
                <a href="#sessions" className="btn btn-primary btn-lg">
                  Explore the sessions
                </a>
                <Link to="/camps/fall-2026" className="btn btn-ghost-light btn-lg">
                  What's next: Fall 2026 →
                </Link>
              </>
            )}
          </div>

          {/* Stands in for the interest-list CTA until the fall form exists. */}
          {isUpcoming && !formUrl && camp.interestNotice && (
            <p className="camp-hero-notice">{camp.interestNotice}</p>
          )}

          <div className="camp-hero-meta">
            <div>
              <span>Where</span>
              {camp.venue}
            </div>
            <div>
              <span>When</span>
              {camp.schedule}
            </div>
            <div>
              <span>Cost</span>
              100% free
            </div>
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="camp-stats">
        <div className="container">
          <div className="camp-stats-head">
            <span className="eyebrow">By the numbers</span>
            <h2>{camp.statsHeading}</h2>
          </div>
          <StatBar stats={camp.stats} light />
          <p className="camp-highlight">{camp.highlight}</p>
        </div>
      </section>

      <CampBody camp={camp} slug={slug} isUpcoming={isUpcoming} />
    </>
  );
}

/**
 * Everything below the hero. Shared by both hero layouts so the feature hero can
 * swap in without duplicating the sessions, gallery, and cross-links.
 */
function CampBody({ camp, slug, isUpcoming }) {
  return (
    <>
    {/* ---------- fall-only: grade tracks ---------- */}
    {camp.tracks && (
      <section className="section section-surface">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Two tracks</span>
            <h2>Different grades, different scaffolding</h2>
            <p>
              Rather than aim one curriculum at the middle and lose both ends, fall camp
              splits into two tracks. Both share the same core lesson each week, then
              break into different activities and different competitions matched to
              their level.
            </p>
          </Reveal>
          <div className="track-grid">
            {camp.tracks.map((track, i) => (
              <Reveal key={track.name} delay={i * 90}>
                <article className="card card-hover track-card">
                  <span className="track-badge">{track.name}</span>
                  <p>{track.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* ---------- fall-only: topic list ----------
        Names only. What each session actually does isn't published until it has
        run, so there is deliberately no description field to render here. */}
    {camp.topics && (
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Topics</span>
            <h2>What we'll cover</h2>
          </Reveal>
          <Reveal delay={70}>
            <ol className="camp-topics">
              {camp.topics.map((topic) => (
                <li key={topic.n}>
                  <span className="camp-topic-num">{topic.n}</span>
                  <span className="camp-topic-name">{topic.name}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    )}

    {/* ---------- fall-only: how to attend ---------- */}
    {camp.attendanceInfo && (
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How to attend</span>
            <h2>{camp.attendanceInfo.title}</h2>
          </Reveal>
          <Reveal delay={70}>
            <div className="attend-panel">
              <p>{camp.attendanceInfo.blurb}</p>
            </div>
          </Reveal>
        </div>
      </section>
    )}

    {/* ---------- sessions ---------- */}
    {camp.sessions && (
      <section className="section anchor-offset" id="sessions">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Session by session</span>
            <h2>
              {camp.sessions.length} sessions. {camp.season}.
            </h2>
            <p>
              {camp.venue}
              {camp.note ? ` · ${camp.note}` : ""}
            </p>
          </Reveal>

          {camp.sessionLayout === "alternating" ? (
            <div className="session-alt-list">
              {camp.sessions.map((session, i) => (
                <Reveal key={session.n} delay={Math.min(i, 3) * 60}>
                  <article
                    className={`session-alt anchor-offset ${i % 2 === 1 ? "is-flipped" : ""} ${
                      session.photos?.length ? "" : "is-textonly"
                    }`}
                    id={`session-${session.n}`}
                  >
                    <div className="session-alt-text">
                      <span className="session-alt-num" aria-hidden="true">
                        {String(session.n).padStart(2, "0")}
                      </span>
                      <h3>{session.topic}</h3>
                      <div className="session-alt-meta">
                        <span>
                          <CalendarIcon />
                          {session.date}
                        </span>
                        <span>
                          <PinIcon />
                          {session.venue}
                        </span>
                      </div>
                      <p>{session.description}</p>
                    </div>

                    {session.photos?.length > 0 && (
                      <div
                        className={`session-alt-photos count-${Math.min(session.photos.length, 3)}`}
                      >
                        {session.photos.map((photo) => (
                          <figure key={photo.src}>
                            <img src={photo.src} alt={photo.alt} loading="lazy" />
                          </figure>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="session-list">
              {camp.sessions.map((session, i) => (
                <Reveal key={session.n} delay={Math.min(i, 3) * 70}>
                  <article className="session anchor-offset" id={`session-${session.n}`}>
                    <div className="session-num">{session.n}</div>
                    <div className="session-body">
                      <h3>{session.topic}</h3>
                      <div className="session-meta">
                        <span className="session-date">{session.date}</span>
                        <span>{session.venue}</span>
                      </div>
                      <p>{session.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    )}

    {/* ---------- curriculum-pending note ---------- */}
    {camp.curriculumNote && (
      <section className="section-tight">
        <div className="container">
          <div className="notice">
            <strong>Curriculum in design</strong>
            <p>{camp.curriculumNote}</p>
          </div>
        </div>
      </section>
    )}

    {/* ---------- gallery ---------- */}
    <section className="section section-surface">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">From the sessions</span>
          <h2>{isUpcoming ? "What a session looks like" : `${camp.season} in photos`}</h2>
          {/* Completed camps let the photos speak for themselves. Fall keeps a line
              because its gallery shows Summer photos, which needs explaining. */}
          {isUpcoming && (
            <p>
              Photos from our Summer 2026 camp at Nichols Library. Fall runs the same
              way, just connected week to week.
            </p>
          )}
        </Reveal>
        <Gallery source={camp.photoSource} photos={camp.galleryPhotos} limit={6} />
      </div>
    </section>

    {/* ---------- testimonials for this camp only ---------- */}
    <Testimonials items={testimonialsForCamp(slug)} />

    {/* ---------- other seasons ---------- */}
    <section className="section-tight camp-nav">
      <div className="container">
        <h3>Other seasons</h3>
        <div className="camp-nav-grid">
          {campOrder
            .filter((s) => s !== slug)
            .map((s) => (
              <Link key={s} to={`/camps/${s}`} className="card card-hover camp-nav-card">
                <span className={`pill ${camps[s].status === "upcoming" ? "pill-upcoming" : ""}`}>
                  {camps[s].statusLabel}
                </span>
                <h4>{camps[s].season}</h4>
                <p>{camps[s].cardBlurb}</p>
                <span className="camp-nav-link">View {camps[s].title} →</span>
              </Link>
            ))}
        </div>
      </div>
    </section>
    </>
  );
}
