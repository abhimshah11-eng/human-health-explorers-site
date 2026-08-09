import { heroTiles, galleryFor, heroPhotos } from "../data/photos";
import "./Media.css";

/**
 * Photo backdrop for a dark `.page-hero`. Renders behind the hero copy with a
 * scrim over it so the headline stays readable. `page` keys into heroPhotos.
 */
export function HeroPhoto({ page }) {
  const photo = heroPhotos[page];
  if (!photo) return null;

  return (
    <div className="hero-photo">
      <img src={photo.src} alt="" style={{ objectPosition: photo.position }} fetchPriority="high" />
    </div>
  );
}

/**
 * 16-tile hero photo grid. Falls back to a brand pattern when no photos have
 * been imported yet, so the hero never renders as empty boxes.
 */
export function HeroPhotoGrid() {
  const tiles = heroTiles(16);

  if (tiles.length === 0) {
    return <div className="hero-grid hero-grid-empty" aria-hidden="true" />;
  }

  return (
    <div className="hero-grid">
      {tiles.map((photo, i) => (
        <div className="hero-tile" key={i} style={{ animationDelay: `${i * 45}ms` }}>
          <img src={photo.src} alt={i === 0 ? photo.alt : ""} loading={i < 6 ? "eager" : "lazy"} />
        </div>
      ))}
    </div>
  );
}

/**
 * Photo gallery for camp and workshop pages. Pass `photos` to hand-pick the set
 * (used where the page already shows session photos and the gallery should add
 * variety rather than repeat them); otherwise it falls back to the season pool.
 */
export function Gallery({ source, photos: explicit, limit = 6, caption }) {
  const photos = (explicit ?? galleryFor(source)).slice(0, limit);
  if (photos.length === 0) return null;

  // Pick the column count that leaves no ragged last row.
  const cols = photos.length % 3 === 0 ? 3 : photos.length % 2 === 0 ? 2 : Math.min(photos.length, 3);

  return (
    <figure className="gallery">
      <div className={`gallery-grid gallery-grid-${cols}`}>
        {photos.map((photo, i) => (
          <div className="gallery-item" key={`${photo.src}-${i}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Three-up (or four-up) big-number stat bar. */
export function StatBar({ stats, light = false }) {
  return (
    <div className={`statbar ${light ? "statbar-light" : ""}`}>
      {stats.map((stat) => (
        <div className="statbar-item" key={stat.label}>
          <div className="statbar-value">{stat.display ?? stat.value}</div>
          <div className="statbar-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
