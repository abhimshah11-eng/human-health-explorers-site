import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "../data/content";
import "./Testimonials.css";

const INTERVAL = 7000;

export default function Testimonials({ items = testimonials }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback((next) => setIndex(((next % count) + count) % count), [count]);

  // Respect a reduced-motion preference by not auto-advancing at all.
  const reduceMotion = useRef(false);
  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [paused, count, index]);

  if (count === 0) return null;

  return (
    <section
      className="testimonials"
      aria-roledescription="carousel"
      aria-label="What families and students say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Only keyboard focus pauses. Plain onFocus would also fire when an arrow
      // is clicked with a mouse, and that button keeps focus afterwards, which
      // would pin the carousel paused for good.
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setPaused(true);
      }}
      onBlur={() => setPaused(false)}
      // Tapping holds the current quote so it can be read without it moving on.
      onTouchStart={() => setPaused(true)}
    >
      <div className="container">
        <h2 className="testimonials-title">What Families Are Saying</h2>

        <div className="testimonial-stage">
          <svg className="testimonial-mark" viewBox="0 0 32 24" aria-hidden="true">
            <path
              d="M13 24V13.2C13 5.9 17.4 1.2 25 0l1.6 3.6c-4.1 1-6.2 3.4-6.4 6.6H26V24zM0 24V13.2C0 5.9 4.4 1.2 12 0l1.6 3.6C9.5 4.6 7.4 7 7.2 10.2H13V24z"
              fill="currentColor"
            />
          </svg>

          {/* All quotes share one grid cell, so the stage is exactly as tall as
              the longest quote in this set and never jumps as it advances. */}
          <div className="testimonial-quotes" aria-live="polite">
            {items.map((t, i) => (
              <blockquote
                key={t.quote}
                className={`testimonial-quote ${i === index ? "is-active" : ""}`}
                aria-hidden={i !== index}
              >
                <p>{t.quote}</p>
                <cite>{t.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="testimonial-nav">
          <button
            type="button"
            className="testimonial-arrow"
            aria-label="Previous quote"
            onClick={() => go(index - 1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="testimonial-dots">
            {items.map((t, i) => (
              <button
                key={t.quote}
                type="button"
                className={`testimonial-dot ${i === index ? "is-active" : ""}`}
                aria-label={`Go to quote ${i + 1} of ${count}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="testimonial-arrow"
            aria-label="Next quote"
            onClick={() => go(index + 1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
