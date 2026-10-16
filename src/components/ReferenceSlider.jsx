import { useCallback, useRef, useState } from "react";
import { workshopReferences } from "../data/content";

// Minimum horizontal travel before a touch counts as a swipe rather than a tap
// or a vertical scroll that drifted sideways.
const SWIPE_MIN = 40;

/**
 * Carousel of named letters of reference.
 *
 * Deliberately unlike the anonymous parent/student carousel: a bordered
 * document-style card signed with a real name and title, and no autoplay.
 * These are formal references, so the reader advances them on their own terms.
 */
export default function ReferenceSlider({ items = workshopReferences }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);
  const count = items.length;

  const go = useCallback(
    (next) => setIndex(((next % count) + count) % count),
    [count]
  );

  if (count === 0) return null;

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > SWIPE_MIN) go(index + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <div
      className="reference-slider"
      role="group"
      aria-roledescription="carousel"
      aria-label="Letters of reference"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={onTouchEnd}
    >
      {/* Every card occupies the same grid cell, so the stage is exactly as tall
          as the longest reference and never jumps height as it advances. */}
      <div className="reference-stage" aria-live="polite">
        {items.map((ref, i) => (
          <figure
            key={ref.name}
            className={`reference-card ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <span className="reference-label">From a letter of reference</span>
            <svg className="reference-mark" viewBox="0 0 32 24" aria-hidden="true">
              <path
                d="M13 24V13.2C13 5.9 17.4 1.2 25 0l1.6 3.6c-4.1 1-6.2 3.4-6.4 6.6H26V24zM0 24V13.2C0 5.9 4.4 1.2 12 0l1.6 3.6C9.5 4.6 7.4 7 7.2 10.2H13V24z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p>{ref.quote}</p>
            </blockquote>
            <figcaption>
              <span className="reference-name">{ref.name}</span>
              <span className="reference-role">{ref.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {count > 1 && (
        <div className="reference-nav">
          <button
            type="button"
            className="reference-arrow"
            aria-label="Previous reference"
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

          <div className="reference-dots">
            {items.map((ref, i) => (
              <button
                key={ref.name}
                type="button"
                className={`reference-dot ${i === index ? "is-active" : ""}`}
                aria-label={`Go to reference ${i + 1} of ${count}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="reference-arrow"
            aria-label="Next reference"
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
      )}
    </div>
  );
}
