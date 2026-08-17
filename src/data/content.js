// All site copy and program data lives here so content can be updated without
// touching components.

import { pickPhotos } from "./photos";

const schoolLogoFiles = import.meta.glob("../assets/schools/*", { eager: true, import: "default" });
const sponsorLogoFiles = import.meta.glob("../assets/sponsors/*", { eager: true, import: "default" });

function resolveLogo(files, filename) {
  const entry = Object.entries(files).find(([path]) => path.endsWith(`/${filename}`));
  return entry ? entry[1] : null;
}

export const org = {
  name: "Human Health Explorers",
  short: "HHE",
  slogan: "Curious minds. Healthier lives.",
  email: "humanhealthexplorers@gmail.com",
  instagram: "https://www.instagram.com/humanhealthexplorers",
  instagramHandle: "@humanhealthexplorers",
  summerInterestForm: "https://forms.gle/e7idfGMdKgrFG57h9",
  // Fall 2026 needs its own form — falls back to the summer one until it exists.
  fallInterestForm: null,
};

// Deduplicated from raw sign-up data: 181 entries -> 35 unique schools.
// Every logo was pulled from that school's own official site (ipsd.org for
// Indian Prairie D204, naperville203.org for D203, the school's own domain for
// the private/parochial ones). A school with `logo: null` is dropped from the
// homepage marquee rather than shown as text — see components/SchoolMarquee.jsx.
export const schools = [
  { name: "Kennedy Junior High School", students: 38, logo: resolveLogo(schoolLogoFiles, "kennedy.png") },
  { name: "Crone Middle School", students: 19, logo: resolveLogo(schoolLogoFiles, "crone.png") },
  { name: "Lincoln Junior High School", students: 17, logo: resolveLogo(schoolLogoFiles, "lincoln.png") },
  { name: "Fischer Middle School", students: 15, logo: resolveLogo(schoolLogoFiles, "fischer.png") },
  { name: "Jefferson Junior High School", students: 12, logo: resolveLogo(schoolLogoFiles, "jefferson.png") },
  { name: "Mill Street Elementary School", students: 11, logo: resolveLogo(schoolLogoFiles, "mill-street.png") },
  { name: "Maplebrook Elementary School", students: 8, logo: resolveLogo(schoolLogoFiles, "maplebrook.png") },
  { name: "Ranch View Elementary School", students: 7, logo: resolveLogo(schoolLogoFiles, "ranch-view.png") },
  { name: "Meadow Glens Elementary School", students: 6, logo: resolveLogo(schoolLogoFiles, "meadow-glens.png") },
  { name: "Scullen Middle School", students: 6, logo: resolveLogo(schoolLogoFiles, "scullen.png") },
  { name: "Kendall Elementary School", students: 5, logo: resolveLogo(schoolLogoFiles, "kendall.png") },
  { name: "Thayer J. Hill Middle School", students: 4, logo: resolveLogo(schoolLogoFiles, "hill.png") },
  { name: "Steck Elementary School", students: 3, logo: resolveLogo(schoolLogoFiles, "steck.png") },
  { name: "Naperville Central High School", students: 3, logo: resolveLogo(schoolLogoFiles, "naperville-central.png") },
  { name: "Washington Junior High School", students: 2, logo: resolveLogo(schoolLogoFiles, "washington.png") },
  { name: "Waubonsie Valley High School", students: 2, logo: resolveLogo(schoolLogoFiles, "waubonsie-valley.png") },
  { name: "Highlands Elementary School", students: 2, logo: resolveLogo(schoolLogoFiles, "highlands.png") },
  { name: "Gordon Gregory Middle School", students: 2, logo: resolveLogo(schoolLogoFiles, "gregory.png") },
  { name: "Owen Elementary School", students: 2, logo: resolveLogo(schoolLogoFiles, "owen.png") },
  { name: "Graham Elementary School", students: 2, logo: resolveLogo(schoolLogoFiles, "graham.png") },
  { name: "Kindi Academy", students: 1, logo: resolveLogo(schoolLogoFiles, "kindi.png") },
  { name: "Madison Junior High School", students: 1, logo: resolveLogo(schoolLogoFiles, "madison.png") },
  { name: "River Woods Elementary School", students: 1, logo: resolveLogo(schoolLogoFiles, "river-woods.png") },
  { name: "Peterson Elementary School", students: 1, logo: resolveLogo(schoolLogoFiles, "peterson.png") },
  { name: "Still Middle School", students: 1, logo: resolveLogo(schoolLogoFiles, "still.png") },
  { name: "Granger Middle School", students: 1, logo: resolveLogo(schoolLogoFiles, "granger.png") },
  { name: "Neuqua Valley High School", students: 1, logo: resolveLogo(schoolLogoFiles, "neuqua-valley.png") },
  { name: "Steeple Run Elementary School", students: 1, logo: resolveLogo(schoolLogoFiles, "steeple-run.png") },
  { name: "Kingsley Elementary School", students: 1, logo: resolveLogo(schoolLogoFiles, "kingsley.png") },
  { name: "Builta Elementary School", students: 1, logo: resolveLogo(schoolLogoFiles, "builta.png") },
  { name: "The Avery Coonley School", students: 1, logo: resolveLogo(schoolLogoFiles, "avery-coonley.png") },
  { name: "St. Joan of Arc School", students: 1, logo: resolveLogo(schoolLogoFiles, "st-joan-of-arc.png") },
  { name: "Spring Brook Elementary School", students: 1, logo: resolveLogo(schoolLogoFiles, "spring-brook.png") },
  { name: "Mary Lou Cowlishaw Elementary School", students: 1, logo: resolveLogo(schoolLogoFiles, "cowlishaw.png") },
  // Raw sign-up data said "Heritage Grove Elementary"; Plainfield D202 has no
  // such school — Heritage Grove is a middle school (grades 6-8). Corrected here
  // so the label matches the logo, which reads "HERITAGE GROVE MIDDLE SCHOOL".
  { name: "Heritage Grove Middle School", students: 1, logo: resolveLogo(schoolLogoFiles, "heritage-grove.png") },
];

export const missionParagraphs = [
  "Human Health Explorers is founded on the belief that every student deserves access to hands-on health science education that makes them genuinely curious about how their bodies work. Naperville has no other free, student-run health literacy program like it. Business and STEM programs get plenty of attention. Health science rarely does, even though it equips kids with knowledge they'll use their whole lives.",
  "In early 2026, we set out to fix that. As a 100% student-run and student-led organization, every session, every curriculum decision, and every partnership is built and run entirely by local high schoolers. For kids, by kids who actually show up.",
];

// ALL-TIME, ALL-PROGRAM totals. These belong on the homepage and About page only.
// Individual camp pages keep their own season-scoped numbers (Summer stays 100+)
// — the two are different metrics, not a mismatch.
//
//   280 = 35 Spring/Alive Center + 50 Madison JH + 100 Summer Camp + 95 Ray Chinese
//   17  = 4 Spring + 6 Summer + 2 Madison (2 of 5 class periods ran) + 5 Ray Chinese
//
// The Ray Chinese 95 is confirmed by Abhi as unique students, not attendances.
export const impactStats = [
  { value: "280+", label: "Unique Students Reached", detail: "across every camp and workshop since early 2026" },
  { value: "30+", label: "Schools Represented", detail: "elementary, middle, and high schools across Naperville, Aurora, Plainfield and beyond" },
  { value: "17", label: "Sessions Delivered", detail: "free camp and workshop sessions, all-time" },
  { value: "$1,000+", label: "In Donated Prizes", detail: "from local businesses and community partners" },
];

export const camps = {
  "spring-2026": {
    slug: "spring-2026",
    season: "Spring 2026",
    status: "completed",
    statusLabel: "Completed",
    title: "Spring Pilot Camp",
    cardBlurb:
      "Our first program ever. Four Tuesday sessions at The Alive Center covering nutrition, fitness, and brain science, ending in a final competition.",
    cardStat: "35 students · 11 schools",
    tagline:
      "Four Tuesday afternoons at The Alive Center that turned a first-year idea into a program with real attendance behind it.",
    venue: "The Alive Center, Naperville",
    schedule: "Four Tuesdays, 4:00–5:00 PM",
    photoSource: "spring",
    statsHeading: "Impact at a glance",
    stats: [
      { display: "35", label: "Unique Students" },
      { display: "86", label: "Total Attendances" },
      { display: "11", label: "Schools Represented" },
    ],
    highlight:
      "Among The Alive Center's strongest attendance for a comparable program.",

    // Opt-in feature hero: stats sit inside the hero next to a tilted photo
    // collage, followed by a light overview strip listing the sessions. Camps
    // without `heroLayout` keep the standard hero + separate stats band.
    heroLayout: "feature",
    heroTitle: ["Spring Pilot", "Camp"],
    heroTag: "Where it all started",
    heroPhotos: [
      { src: "/photos/spring/spring-01.jpg", alt: "HHE instructors presenting to students at The Alive Center" },
      { src: "/photos/spring/spring-02.jpg", alt: "A student raising their hand during a Spring 2026 session" },
      { src: "/photos/spring/spring-04.jpg", alt: "A full room of students at a Spring 2026 session" },
    ],
    overviewTitle: "2026 Spring Pilot Camp",
    overviewBlurb:
      "Our first program ever. Four Tuesday sessions at The Alive Center that took students from nutrition and fitness through brain science and healthy decision-making, ending in a final competition.",
    sessions: [
      {
        n: 1,
        topic: "Nutrition & Hydration",
        date: "March 3, 2026",
        venue: "The Alive Center, Naperville",
        description:
          "Our first session ever. Students worked through the macronutrients and what the body actually does with each one, then turned to hydration: how much water you really need, and what energy drinks are doing to you. We closed with 4 Corners, the activity that's since become an HHE staple. A statement goes up, students pick the corner they agree with, and then they have to defend it. Nutrition hot takes, argued out loud.",
      },
      {
        n: 2,
        topic: "Fitness",
        date: "March 10, 2026",
        venue: "The Alive Center, Naperville",
        description:
          "From the heart outward. Students learned what heart rate is really telling them, then took on the muscular system and the difference between muscular strength and muscular endurance. The session finished on flexibility, including why dynamic stretching belongs before a workout and static stretching after, plus another round of 4 Corners on fitness hot takes.",
      },
      {
        n: 3,
        topic: "Brain Science & Healthy Decision-Making",
        date: "March 17, 2026",
        venue: "The Alive Center, Naperville",
        description:
          "Students mapped the brain, covering the frontal, parietal, occipital, and temporal lobes plus the brainstem and cerebellum, then played a brain-map game where we named a function and they had to work out which region controls it. The second half was the part that stuck: dopamine, and how social media is built to exploit it. Instant versus delayed gratification, why that loop is so hard to break, and what to actually do about it. 4 Corners closed the session.",
      },
      {
        n: 4,
        topic: "Final Competition",
        date: "March 24, 2026",
        venue: "The Alive Center, Naperville",
        description:
          "The closer, and the first competition HHE ever ran. Fifteen questions went up on the board one at a time, drawn from everything covered across the four weeks, and students answered on their own papers. We handed out $50 in prizes to the top finishers.",
      },
    ],
  },

  "summer-2026": {
    slug: "summer-2026",
    season: "Summer 2026",
    status: "completed",
    statusLabel: "Completed",
    title: "Summer Camp",
    cardBlurb:
      "Six free weeks at Nichols Library, covering everything from nutrition to epidemiology through hands-on games, experiments, and team challenges.",
    cardStat: "100+ students · 30+ schools",
    tagline:
      "Six free weeks at Nichols Library, covering everything from nutrition to epidemiology through hands-on games, experiments, and team challenges.",
    venue: "Nichols Library, Naperville",
    schedule: "Six sessions, 10:00 AM–12:00 PM",
    photoSource: "summer",
    statsHeading: "Impact at a glance",
    stats: [
      { display: "100+", label: "Unique Students" },
      { display: "30+", label: "Schools Represented" },
      { display: "$1,000+", label: "In Prizes Given Away" },
    ],
    highlight: "Completely free for every family, every session, all summer.",

    // Same opt-in feature hero as Spring. Photos are deliberately ones that
    // appear nowhere else on the site.
    heroLayout: "feature",
    // Alternating photo/text session blocks. Spring stays on the plain list.
    sessionLayout: "alternating",
    heroTitle: ["Summer", "Camp"],
    heroTag: "Hands-on every week",
    heroPhotos: [
      { src: "/photos/session4-02.jpg", alt: "Students gathered together in front of a session recap slide" },
      { src: "/photos/session3-10.jpg", alt: "Students talking in small groups at their tables" },
      { src: "/photos/session4-10.jpg", alt: "An instructor leaning over to help two students at a table" },
    ],
    // Hand-picked so the closing gallery adds personality instead of repeating
    // the session blocks: faces, held-up work, a floor circle, a mentoring moment.
    galleryPhotos: pickPhotos(
      "session4-05",
      "session3-03",
      "session4-03",
      "session4-04",
      "session4-07",
      "session3-02"
    ),
    overviewTitle: "2026 Summer Camp",
    overviewBlurb:
      "Each session stood on its own, so students could drop into any week without missing context. Together, the six traced the human body from a single cell all the way up to a full-scale disease outbreak.",
    sessions: [
      {
        n: 1,
        photos: [
          { src: "/photos/session1-08.jpg", alt: "Students moving around the room between activities" },
          { src: "/photos/session1-09.jpg", alt: "Students seated at tables during the nutrition session" },
          { src: "/photos/session1-10.jpg", alt: "A group of students laughing together over their worksheets" },
        ],
        topic: "Nutrition & Metabolism",
        date: "June 23, 2026",
        venue: "Nichols Library, Naperville",
        attendance: "~50 students",
        description:
          "With 50+ students, we opened the summer with Food Detective, sorting real food cards first by category and then by what each food actually does in the body. From there, teams broke down macronutrients and micronutrients through Macro Corners, physically moving around the room to sort foods like bread, eggs, and avocado by what they fuel. We closed with the Fuel Cafe Final Competition, where teams built a full day of meals on a budget and pitched their choices to judges, giving away over $70 in prizes.",
      },
      {
        n: 2,
        photos: [
          { src: "/photos/session2-01.jpg", alt: "The whole camp gathered together at the immune system session" },
          { src: "/photos/session2-02.jpg", alt: "Student volunteers acting out the skin barrier, a germ, and a macrophage in front of the demo slide" },
          { src: "/photos/session2-03.jpg", alt: "Students drawing and working together at a table during the immune system session" },
        ],
        topic: "Immune System & Disease",
        date: "June 30, 2026",
        venue: "Nichols Library, Naperville",
        attendance: "~50 students",
        description:
          "With 50+ students, teams traced how germs get into the body and the real barriers that stop them, from skin and mucus to stomach acid, before diving into the innate and adaptive immune systems. The highlight was Build-a-Body Defense Map, where teams mapped out the body's entire defense system and then presented it to the room with real confidence. Competition winners took home gift cards from Andy's Frozen Custard and Noodles & Company.",
      },
      {
        n: 3,
        photos: [
          { src: "/photos/session3-01.jpg", alt: "Students working at long tables with instructors behind them" },
          { src: "/photos/session3-04.jpg", alt: "Wide view of the room during the brain science session" },
          { src: "/photos/session3-05.jpg", alt: "Students working through a decision-making activity" },
        ],
        topic: "Brain Science & Decision-Making",
        date: "July 14, 2026",
        venue: "Nichols Library, Naperville",
        attendance: "Mid-30s",
        description:
          "We welcomed 40+ kids for Session 3, opening with Hack Your Habit, where teams mapped their own real habit loops around things like scrolling or procrastinating and found one point where they could actually break the cycle. From there, a Variable Rewards card draw and a live Stroop Test showed students firsthand how unpredictable rewards hook the brain and how stress interferes with clear thinking. The centerpiece was Brain Coach Lab, where teams diagnosed real client cases, from an athlete who freezes under pressure to a student who can't stop checking their phone, and built two-step intervention plans that got tested by a surprise client update. Top teams walked away with over $100 in prizes.",
      },
      {
        n: 4,
        photos: [
          { src: "/photos/session4-01.jpg", alt: "Students at tables during the lesson on cell organelles" },
          { src: "/photos/session4-06.jpg", alt: "Students raising their hands during the cancer and cell biology session" },
          { src: "/photos/session4-08.jpg", alt: "Students seated in a circle on the floor during a group break" },
        ],
        topic: "Cancer & Cell Biology",
        date: "July 21, 2026",
        venue: "Nichols Library, Naperville",
        attendance: "27 students",
        description:
          "With 30+ students, we explored how healthy cells function and what happens when the rules controlling cell growth and division break down into cancer. Term Match had students racing around the room to pair up scientific terms with their definitions, with the first three pairs to match up winning prizes. The Mutation Telephone Game passed a word around the room through whispers, showing how small changes compound the more information gets copied, much like how genetic mutations build up over time. We closed with a Jeopardy competition covering everything from the day, and the winning team walked away with some of the biggest prizes of the summer: gift cards to Crumbl Cookies, Andy's Frozen Custard, and Shake Shack.",
      },
      {
        n: 5,
        photos: [
          { src: "/photos/session5-02.jpg", alt: "Two students placing sticky notes high on the wall during a biomechanics activity" },
          { src: "/photos/session5-03.jpg", alt: "Students up and moving during an active sports science game" },
          { src: "/photos/session5-04.jpg", alt: "Students standing in clusters during a group activity" },
        ],
        topic: "Sports Science & Biomechanics",
        date: "July 28, 2026",
        venue: "Nichols Library, Naperville",
        attendance: "~40 students",
        description:
          "With 40+ students, we broke down the musculoskeletal system through a live push-up demonstration and explored why muscles start to burn during intense exercise. The Heart Rate Game had students measure their resting heart rate, run in place for 60 seconds, and measure again to see the change firsthand. The highlight was five hands-on stations, Human Lever, Broad Jump, Vertical Jump, Reaction Test, and Agility, where students tested their own strength, speed, and coordination while learning concepts like torque at the Human Lever station. Top performers at each station won prizes from Shake Shack, Illinois State University, and Subway, with candy for everyone else.",
      },
      {
        n: 6,
        photos: [
          { src: "/photos/session6-04.jpg", alt: "Students sitting on the floor in small groups working the Mystery Transmission Case" },
          { src: "/photos/session6-01.jpg", alt: "Students moving across the room during the outbreak transmission simulation" },
          { src: "/photos/session6-03.jpg", alt: "Students and instructors talking at the tables during the epidemiology session" },
        ],
        topic: "Disease Outbreaks & Epidemiology",
        date: "August 4, 2026",
        venue: "Nichols Library, Naperville",
        attendance: "29 students",
        description:
          "With 40+ students closing out our first summer, we opened with a Rumor Spread Simulation that showed exactly how fast something can travel through a group, one person becomes three, three becomes nine, nine becomes twenty-seven, in just a few rounds. From there, students learned the four real ways diseases actually spread, contact, airborne, waterborne and foodborne, and vector-borne, before rotating through five detective stations, including Contact Tracing Network, Outbreak Telephone, and Mystery Transmission Case. Teams pieced together fictional outbreaks using real epidemiology methods, tracking down sources and figuring out exactly how the sickness spread.",
      },
    ],
    note: "No session was held on July 7.",
  },

  "fall-2026": {
    slug: "fall-2026",
    season: "Fall 2026",
    status: "upcoming",
    statusLabel: "Upcoming",
    title: "Fall Camp",
    cardBlurb:
      "Four standalone Sunday sessions this fall, split into two grade tracks and ending in a final challenge.",
    cardStat: "October 18 – November 8",
    tagline:
      "Four standalone Sunday sessions, two grade tracks, and a final challenge to wrap it all up.",
    venue: "Nichols Library, Naperville",
    schedule:
      "Four Sunday sessions this fall: October 18, 25, November 1, and 8, from 2:00 to 3:30pm.",
    photoSource: "summer",
    // Not "Impact at a glance" — fall hasn't happened yet, so these are plans.
    statsHeading: "What to expect",
    stats: [
      { display: "4", label: "Sessions" },
      { display: "2", label: "Grade Tracks" },
      { display: "3", label: "Topics" },
    ],
    highlight:
      "Every session stands on its own, the same way summer's did. Students can come to all four or just the ones that fit their schedule, and no session assumes they were at the last one. What's new this fall is the split into two grade tracks, so the same topic lands at the right depth for younger and older students.",
    tracks: [
      {
        name: "Junior (Grades 4–6)",
        description:
          "Built for younger explorers. More guided activities, more scaffolding, and concepts introduced through hands-on demos before any of the vocabulary shows up.",
      },
      {
        name: "Senior (Grades 7–8)",
        description:
          "A faster pace and deeper material. Students work with more independence and take on the final challenge with less structure handed to them.",
      },
    ],
    // Topic names only. Activity formats, competition rounds, and mechanics stay
    // unpublished until each session has run — same rule as never posting
    // students' names or session answers ahead of time.
    topics: [
      { n: 1, name: "Heart Health" },
      { n: 2, name: "Genetics & DNA" },
      { n: 3, name: "Gut Health & Microbiology" },
      { n: 4, name: "Final Challenge" },
    ],
    attendanceInfo: {
      title: "In person",
      blurb:
        "Four consecutive Sunday sessions this fall, 90 minutes each, at Nichols Library in Naperville. Hands-on materials provided at no cost.",
    },
    interestNotice:
      "Registration for fall camp opens soon. Check back or follow us on Instagram for updates.",
    // Photos unique to this page: nothing here appears on the homepage or the
    // Summer camp page.
    galleryPhotos: pickPhotos(
      "session6-02",
      "session3-07",
      "session1-05",
      "session1-01",
      "session4-09",
      "session4-11"
    ),
    curriculumNote:
      "Full session activities are still being finalized. We'll share more as sessions approach.",
  },
};

export const campOrder = ["spring-2026", "summer-2026", "fall-2026"];

export const workshops = [
  {
    n: 1,
    name: "Madison Junior High School",
    location: "Naperville, IL",
    dates: "May 15, 2026",
    students: "50 students",
    summary:
      "HHE ran a brain science workshop for two Madison Junior High classes, reaching 50 students, where they mapped brain regions through a room-wide Brain Map game, dug into why apps like TikTok are built to be addictive, and busted concussion myths.",
    // No photos were taken on the day. The lead image is the school's own exterior
    // shot; the two supporting tiles are our own illustrations of what was taught,
    // deliberately drawn rather than photographic so nothing reads as a photo of
    // an event we didn't document.
    photos: [
      { src: "/photos/workshops/madison.jpg", alt: "The main entrance of Madison Junior High School in Naperville" },
      { src: "/photos/workshops/brain-map.svg", alt: "Diagram of the four lobes of the brain used in the Brain Map game" },
      { src: "/photos/workshops/scroll-loop.svg", alt: "Illustration of an endless social media scroll loop and the dopamine hits that drive it" },
    ],
    sessions: [
      { label: "May 15th, 7th period" },
      { label: "May 15th, 8th period" },
    ],
  },
  {
    n: 2,
    name: "Ray Chinese School",
    location: "Naperville, IL",
    dates: "July 3 to August 7, 2026",
    students: "95 students, ages 5–12",
    summary:
      "A recurring Friday workshop series for a rotating group of ages 5–12, using a simplified version of our curriculum across five sessions: nutrition, immune system, brain science, cancer and cell biology, and heart health. In total, we reached 95 unique students.",
    // Camper faces are blurred in these; the instructors' are not. See the
    // README's "Photo privacy" note before adding or replacing any of them.
    photos: [
      { src: "/photos/workshops/raychinese-01.jpg", alt: "HHE instructors teaching a Ray Chinese School classroom during the Your Heart Is a Muscle lesson" },
      { src: "/photos/workshops/raychinese-02.jpg", alt: "Students gathered around a table sorting coloured antigen and antibody cards" },
      { src: "/photos/workshops/raychinese-03.jpg", alt: "Two students holding up their hand-drawn germ and matching antibody cards in front of the immune system slide" },
    ],
    sessions: [
      { label: "Ray Chinese Workshop 1", date: "July 3rd, 2026" },
      { label: "Ray Chinese Workshop 2", date: "July 10th, 2026" },
      { label: "Ray Chinese Workshop 3", date: "July 24th, 2026" },
      { label: "Ray Chinese Workshop 4", date: "July 31st, 2026" },
      { label: "Ray Chinese Workshop 5", date: "August 7th, 2026" },
    ],
  },
];

// Workshops only — must stay consistent with the all-time totals in impactStats,
// which count these same 7 sessions and 145 students.
//   7   = 2 Madison class periods + 5 Ray Chinese sessions
//   145 = 50 Madison + 95 Ray Chinese (13 + 22 + 20 + 20 + 20)
export const workshopStats = [
  { display: "2", label: "Workshops" },
  { display: "7", label: "Total Sessions" },
  { display: "145", label: "Students Taught" },
];

export const workshopStatsNote =
  "Two workshop engagements to date. Madison Junior High ran across two class periods in a single day, reaching 50 students; the Ray Chinese School series ran five Friday sessions, reaching 95 unique students.";

// Named and credentialed, unlike the anonymous parent/student carousel. This is
// from a signed letter of reference written for HHE to use publicly, so the full
// name and title are intentional here.
export const workshopReference = {
  quote:
    "HHE thoughtfully modified both their language and activities to make the content more accessible and engaging for younger learners while still maintaining educational value for older students.",
  name: "Xin Liu",
  role: "Program Director, Ray Chinese School Summer Camp",
};

// Headshots: add `photo: "/photos/team/<name>.jpg"` to any member and it renders
// in place of the initials placeholder. Same circle, no layout change needed.
export const team = {
  tier1: {
    title: "Presidents & Co-Founders",
    members: [
      {
        name: "Abhi Shah",
        role: "Founder & President",
        bio: "Abhi is a rising senior at Naperville North High School. He founded Human Health Explorers after developing a passion for health science and community impact. He likes to play sports and be active in his free time. In the future, he hopes to pursue a career in medicine and public health.",
      },
      {
        name: "Vivaan Trivedi",
        role: "Co-President",
        bio: "Vivaan is a rising junior at Naperville North High School. Passionate about making health science engaging and accessible for younger students, he joined HHE to combine his interest in medicine and education with direct community impact in Naperville.",
      },
      {
        name: "Vib Ragam",
        role: "Co-Founder",
        bio: "Vib is a rising senior at Naperville North High School. He enjoys tutoring and mentoring others, which inspired him to create Human Health Explorers. In his free time, he loves playing sports and gardening. In the future, he hopes to pursue a career in the health sciences and make a positive impact in his community.",
      },
    ],
  },
  tier2: {
    title: "Leadership Team",
    members: [
      {
        name: "Nathan Ho",
        role: "VP of Outreach",
        bio: "Nathan is a rising senior at Naperville North High School. He's passionate about working with kids and promoting the success of others, motivating him to work with Human Health Explorers. He's interested in going into a career in oncology where he can carry out his passion for community service in a professional setting.",
      },
      {
        name: "Hasan Naqvi",
        role: "VP of Curriculum",
        bio: "Hasan is a rising senior at Naperville Central High School. He loves to create a loving community that supports each other in learning and beyond for success, giving him the passion to be on the Human Health Explorers team. His dream is to become a dermatologist so he can help create a strong and healthy lifestyle for his community.",
      },
    ],
  },
  // "Nathan Ho" (Vice President, above) and "Taran Nathan" are two different
  // people who happen to share the name — don't merge them.
  mentors: [
    "Taran Nathan",
    "Harsh Patel",
    "Aarav Soni",
    "Fatema Merchant",
    "Saravan Palakurthi",
    "Olive Jerman",
    "Shriya Mangla",
    "Anika Kamath",
    "Adithya Karthik",
    "Jaime Karuna",
    "Krish Shah",
    "Aaron Fu",
  ],
};

// Adds up to the 280+ headline above. Weights are percentages of the largest row.
export const participation = [
  { label: "Spring 2026 Camp · The Alive Center", display: "35", weight: 35 },
  { label: "Summer 2026 Camp · Nichols Library", display: "100", weight: 100 },
  { label: "Madison Junior High workshop", display: "50", weight: 50 },
  { label: "Ray Chinese School workshops", display: "95", weight: 95 },
];

// Organizational relationships only. Deliberately NOT listed here:
//   Nichols Library  — paid roughly $600 for space. That is a vendor, not a partner.
//   Ray Chinese School — a workshop host, same tier as Madison Junior High and any
//                        future host school. It belongs on the Workshops page only.
export const partners = [
  {
    name: "The Alive Center",
    kind: "Community Partner",
    logo: resolveLogo(sponsorLogoFiles, "alive-center.png"),
    description:
      "Human Health Explorers originated as one of The Alive Center's Teen Service Launchpad programs, and our first Spring Camp was hosted in their space. We maintain an ongoing affiliation with them through informal mentorship.",
  },
  {
    name: "Hack Club",
    kind: "Fiscal Sponsor",
    logo: resolveLogo(sponsorLogoFiles, "hack-club.png"),
    description:
      "Hack Club is the organization that allows HHE to accept tax-deductible donations without holding its own 501(c)(3) status, giving a student-run program real nonprofit footing from day one.",
  },
];

// Businesses that donated prizes over Summer 2026. Rendered as a static logo
// grid with no captions, so the list order is the display order.
const donorLogoFiles = import.meta.glob("../assets/donors/*", { eager: true, import: "default" });

export const donors = [
  { name: "Crumbl Cookies", logo: resolveLogo(donorLogoFiles, "crumbl.png") },
  { name: "Billy Bricks Wood Fired Pizza", logo: resolveLogo(donorLogoFiles, "billy-bricks.png") },
  { name: "Andy's Frozen Custard", logo: resolveLogo(donorLogoFiles, "andys.png") },
  { name: "Chicago Wolves", logo: resolveLogo(donorLogoFiles, "chicago-wolves.png") },
  { name: "Egg Harbor Cafe", logo: resolveLogo(donorLogoFiles, "egg-harbor.png") },
  { name: "Central Dental Associates", logo: resolveLogo(donorLogoFiles, "central-dental.png") },
  { name: "Shake Shack", logo: resolveLogo(donorLogoFiles, "shake-shack.png") },
  { name: "Noodles & Company", logo: resolveLogo(donorLogoFiles, "noodles.png") },
  { name: "Illinois State Redbirds", logo: resolveLogo(donorLogoFiles, "illinois-state.png") },
  { name: "The White Sheep", logo: resolveLogo(donorLogoFiles, "white-sheep.png") },
  { name: "Little Pops NY Pizzeria", logo: resolveLogo(donorLogoFiles, "little-pops.png") },
  { name: "Subway", logo: resolveLogo(donorLogoFiles, "subway.png") },
  { name: "Area 51 Cupcakery", logo: resolveLogo(donorLogoFiles, "area-51-cupcakery.png") },
  { name: "Blackberry Market", logo: resolveLogo(donorLogoFiles, "blackberry-market.png") },
];

// Two audiences, kept separate so a parent never wades through partner logistics
// and vice versa. The second group is deliberately NOT "school/teacher" — community
// organizations host us too, and the subtitle says so up front.
// Real quotes from Spring and Summer 2026 feedback. Attribution is intentionally
// limited to "HHE Parent" or "HHE Student": no names, schools, or other
// identifying detail, since these come from children and their families.
// Parent and student quotes are interleaved so the carousel alternates voices.
// Real quotes from Spring and Summer 2026 feedback. Attribution is intentionally
// limited to "HHE Parent" or "HHE Student": no names, schools, or other
// identifying detail, since these come from children and their families.
// `season` lets each camp page show only its own quotes; the homepage shows all.
export const testimonials = [
  { season: "summer", source: "HHE Parent", quote: "My children loved learning new facts about science and their bodies. They loved making friends with other kids. They enjoyed the games and the prizes and want to do this class next summer." },
  { season: "summer", source: "HHE Student", quote: "The fact that you teach me what's bad and how to avoid it such as how cancerous tumors never stop dividing and what are the best macro-nutrients." },
  { season: "spring", source: "HHE Student", quote: "I liked how the instructors encourage us to share our thoughts." },
  { season: "summer", source: "HHE Parent", quote: "Very interesting topics and really fun!" },
  { season: "summer", source: "HHE Student", quote: "I enjoyed meeting new friends, things done as a group and the chance to win prizes!" },
  { season: "spring", source: "HHE Student", quote: "How the instructors explained the details about all the things that we've been learning." },
  { season: "spring", source: "HHE Student", quote: "I liked that there were no right or wrong answers." },
  { season: "spring", source: "HHE Student", quote: "Having in person coaching with leaders one on one." },
  { season: "spring", source: "HHE Student", quote: "Very informative; I learned a lot." },
  { season: "spring", source: "HHE Student", quote: "I like how I learned about the human body." },
];

/** Quotes for one camp page, by slug. Returns [] for camps with no feedback yet. */
export function testimonialsForCamp(slug = "") {
  const season = slug.split("-")[0];
  return testimonials.filter((t) => t.season === season);
}

export const faqGroups = [
  {
    title: "Parent FAQ",
    faqs: [
      {
        q: "Is HHE really free?",
        a: "Yes, completely free, always, no cost to families for any session or program.",
      },
      {
        q: "What ages does HHE work with?",
        a: "Depends on the program. Our main camp is built for incoming 5th through 9th graders, while community workshops like our Ray Chinese School partnership serve a younger range, roughly ages 5 to 12.",
      },
      {
        q: "Can my child bring a friend or sibling?",
        a: "Yes, friends and siblings are always welcome.",
      },
      {
        q: "What does a session actually look like?",
        a: "Hands-on, not a lecture. Every session is built around real experiments, team challenges, and games, not worksheets or sitting and listening.",
      },
      {
        q: "Who supervises the sessions?",
        a: "Our programs are run entirely by our trained team of high school students.",
      },
      {
        q: "How do I sign up?",
        a: "Through the interest form on the relevant program page.",
      },
    ],
  },
  {
    title: "Workshop Partner FAQ",
    subtitle: "(schools, teachers, community organizations)",
    faqs: [
      {
        q: "Is this free for us?",
        a: "Yes, completely free, no cost to your school, program, or students.",
      },
      {
        q: "How much prep does our staff need to do?",
        a: "None. We bring the curriculum, materials, and facilitation, you just give us the room and the time.",
      },
      {
        q: "How long is a workshop?",
        a: "Around 45 minutes, but flexible, anywhere from a single class period to a full-day event if you want more.",
      },
      {
        q: "What age groups do you work with?",
        a: "We adapt content to fit whatever group you bring us. We've run workshops from elementary through 8th grade.",
      },
      {
        q: "Does this have to happen at a school?",
        a: "No. We've also brought HHE into community programs. If you run a tutoring center, library program, or something similar, we'd love to talk.",
      },
      {
        q: "Can this happen during the school day?",
        a: "Yes, our Madison Junior High workshop ran during two regular class periods.",
      },
      {
        q: "Do you have references?",
        a: "Yes, happy to share a letter of reference and connect you with past partners directly.",
      },
      {
        q: "How do we get started?",
        a: "Email us with your group's age range, preferred time slot, and rough size, and we'll build around it.",
      },
    ],
  },
];
