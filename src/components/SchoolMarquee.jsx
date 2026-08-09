import { schools } from "../data/content";
import "./SchoolMarquee.css";

// Logo-only marquee: the school name is carried by alt text, never rendered as
// visible copy. Schools without a verified logo are filtered out rather than
// shown as a text stand-in.
const withLogos = schools.filter((s) => s.logo);

function Row({ items, reverse = false, duration }) {
  return (
    <div className="marquee-row">
      <div
        className={`marquee-track ${reverse ? "is-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((school, i) => (
          <div className="school-tile" key={`${school.name}-${i}`}>
            <img src={school.logo} alt={school.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SchoolMarquee() {
  if (withLogos.length === 0) return null;

  const mid = Math.ceil(withLogos.length / 2);

  return (
    <section className="marquee-section">
      <div className="container">
        <div className="marquee-head">
          <span className="eyebrow">Schools we've reached</span>
          <h2>Students from {schools.length} schools have explored with us</h2>
          <p>
            Elementary, middle, and high schools across Naperville, Aurora, Plainfield
            and the surrounding suburbs. Every one of them is represented by a student
            who showed up to a free session.
          </p>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <Row items={withLogos.slice(0, mid)} duration={62} />
        <Row items={withLogos.slice(mid)} reverse duration={72} />
      </div>

      {/* Screen readers get the plain list rather than the duplicated marquee. */}
      <ul className="visually-hidden">
        {schools.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
    </section>
  );
}
