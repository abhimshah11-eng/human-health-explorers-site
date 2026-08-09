// Photo manifest. Files live in /public/photos and are referenced by URL.
//
// Spring photos were split out of the Spring 2026 flyer collage — they predate
// the Session folders in Drive, which is why they only appear on the Spring tab.
// Summer photos were pulled from Drive (HHE Summer Camp 2026 Photos), filtered
// to candid shots, EXIF-rotated upright, and resized to 1600px / q80.

export const springPhotos = [
  { src: "/photos/spring/spring-01.jpg", alt: "HHE instructors presenting a health science slide to students at The Alive Center" },
  { src: "/photos/spring/spring-02.jpg", alt: "A student raising their hand during a Spring 2026 session at The Alive Center" },
  { src: "/photos/spring/spring-03.jpg", alt: "Students seated around tables working through a hands-on activity" },
  { src: "/photos/spring/spring-04.jpg", alt: "A full room of students at a Spring 2026 Human Health Explorers session" },
];

export const summerPhotos = [
  { src: "/photos/session1-01.jpg", session: 1, alt: "Students seated at classroom tables taking notes during the nutrition session" },
  { src: "/photos/session1-02.jpg", session: 1, alt: "Two high school instructors presenting at the front of the room" },
  { src: "/photos/session1-03.jpg", session: 1, alt: "Students raising their hands toward a nutrition slide at Nichols Library" },
  { src: "/photos/session1-04.jpg", session: 1, alt: "Students facing a projected nutrition and metabolism slide" },
  { src: "/photos/session1-05.jpg", session: 1, alt: "Students working through a muscle-cramp scenario during the nutrition session" },
  { src: "/photos/session1-06.jpg", session: 1, alt: "Students filling out printed worksheets at a table" },
  { src: "/photos/session1-07.jpg", session: 1, alt: "Students raising their hands to answer a question" },
  { src: "/photos/session1-08.jpg", session: 1, alt: "Students moving around the room between activities" },
  { src: "/photos/session1-09.jpg", session: 1, alt: "Students seated at tables during a lesson on vitamins" },
  { src: "/photos/session1-10.jpg", session: 1, alt: "A group of students laughing together over their worksheets" },
  { src: "/photos/session1-11.jpg", session: 1, alt: "Students working in small groups at tables" },
  { src: "/photos/session2-01.jpg", session: 2, alt: "Whole-camp group photo of students at the immune system session" },
  { src: "/photos/session3-01.jpg", session: 3, alt: "Students working at long tables with instructors standing behind them" },
  { src: "/photos/session3-02.jpg", session: 3, alt: "Students at a table smiling with markers and worksheets in front of them" },
  { src: "/photos/session3-03.jpg", session: 3, alt: "Students holding up their completed worksheets" },
  { src: "/photos/session3-04.jpg", session: 3, alt: "Wide view of the room during the brain science session" },
  { src: "/photos/session3-05.jpg", session: 3, alt: "Students working through a decision-making activity at their tables" },
  { src: "/photos/session3-06.jpg", session: 3, alt: "Students seated at tables during work time" },
  { src: "/photos/session3-07.jpg", session: 3, alt: "Students gathered at the back of the room during a lesson on habits" },
  { src: "/photos/session3-08.jpg", session: 3, alt: "Students gathered at the front of the room around a laptop and screen" },
  { src: "/photos/session3-09.jpg", session: 3, alt: "Students in lively discussion during a group activity" },
  { src: "/photos/session3-10.jpg", session: 3, alt: "Students talking in small groups at their tables" },
  { src: "/photos/session4-01.jpg", session: 4, alt: "Students at tables during a lesson on cell organelles" },
  { src: "/photos/session4-02.jpg", session: 4, alt: "Students standing together in front of a recap slide" },
  { src: "/photos/session4-03.jpg", session: 4, alt: "Students sitting in a circle on the floor during a break" },
  { src: "/photos/session4-04.jpg", session: 4, alt: "Instructors helping students color a cell diagram together" },
  { src: "/photos/session4-05.jpg", session: 4, alt: "Three students smiling during a hands-on cell biology activity" },
  { src: "/photos/session4-06.jpg", session: 4, alt: "Students raising their hands during the cancer and cell biology session" },
  { src: "/photos/session4-07.jpg", session: 4, alt: "Students examining an activity card together" },
  { src: "/photos/session4-08.jpg", session: 4, alt: "Students seated in a circle on the floor during a group break" },
  { src: "/photos/session4-09.jpg", session: 4, alt: "Students at tables during a lesson on the immune system and cancer" },
  { src: "/photos/session4-10.jpg", session: 4, alt: "An instructor leaning over to help two students at a table" },
  { src: "/photos/session4-11.jpg", session: 4, alt: "Students facing a slide asking what malignant cancer and metastasis mean" },
  { src: "/photos/session5-01.jpg", session: 5, alt: "Group photo of students in front of the projection screen at Nichols Library" },
  { src: "/photos/session5-02.jpg", session: 5, alt: "Two students placing sticky notes high on the wall during a biomechanics activity" },
  { src: "/photos/session5-03.jpg", session: 5, alt: "Students up and moving during an active sports science game" },
  { src: "/photos/session5-04.jpg", session: 5, alt: "Students standing in clusters during a group activity" },
  { src: "/photos/session6-01.jpg", session: 6, alt: "Students moving across the room during the outbreak transmission simulation" },
  { src: "/photos/session6-02.jpg", session: 6, alt: "Students gathered in clusters during the epidemiology session" },
  { src: "/photos/session6-03.jpg", session: 6, alt: "Students and instructors talking at the tables during the epidemiology session" },
  { src: "/photos/session6-04.jpg", session: 6, alt: "Students sitting on the floor in small groups working the Mystery Transmission Case" },
];

export const allPhotos = [...summerPhotos, ...springPhotos];

/** Look up photo objects by filename, e.g. pickPhotos("session4-05", "session3-03"). */
export function pickPhotos(...names) {
  return names
    .map((n) => allPhotos.find((p) => p.src.endsWith(`/${n}.jpg`)))
    .filter(Boolean);
}

// Background photos for the dark page heroes. All landscape, all real sessions,
// one per page so no two heroes repeat. `position` is the object-position used to
// keep the subject in frame as the hero gets shorter on narrow screens.
export const heroPhotos = {
  about: {
    src: "/photos/session2-01.jpg",
    position: "50% 34%",
    alt: "The full Human Health Explorers summer camp group, students and high school instructors together at Nichols Library",
  },
  workshops: {
    src: "/photos/session1-07.jpg",
    position: "50% 42%",
    alt: "Students raising their hands to answer a question during an HHE session",
  },
  faq: {
    src: "/photos/session4-03.jpg",
    position: "50% 46%",
    alt: "Students sitting in a circle on the floor during a break between activities",
  },
  partners: {
    src: "/photos/session5-01.jpg",
    position: "50% 40%",
    alt: "Students gathered for a group photo in front of the screen at Nichols Library",
  },
};

export function galleryFor(source) {
  if (source === "spring") return springPhotos;
  return summerPhotos.length > 0 ? summerPhotos : springPhotos;
}

// Hand-picked for the 16-tile hero: a spread across all five sessions, favouring
// wide room shots and lively activity over head-on slide photos.
const HERO_ORDER = [
  "/photos/session5-03.jpg",
  "/photos/session1-03.jpg",
  "/photos/session4-04.jpg",
  "/photos/session3-02.jpg",
  "/photos/session1-10.jpg",
  "/photos/session4-03.jpg",
  "/photos/session3-09.jpg",
  "/photos/session5-02.jpg",
  "/photos/session1-07.jpg",
  "/photos/session4-05.jpg",
  "/photos/session3-03.jpg",
  "/photos/session1-06.jpg",
  "/photos/session4-07.jpg",
  "/photos/session5-04.jpg",
  "/photos/session3-08.jpg",
  "/photos/session1-11.jpg",
];

export function heroTiles(count = 16) {
  const bySrc = new Map(summerPhotos.map((p) => [p.src, p]));
  const picked = HERO_ORDER.map((src) => bySrc.get(src)).filter(Boolean);
  const pool = picked.length > 0 ? picked : allPhotos;
  if (pool.length === 0) return [];
  return Array.from({ length: count }, (_, i) => pool[i % pool.length]);
}
