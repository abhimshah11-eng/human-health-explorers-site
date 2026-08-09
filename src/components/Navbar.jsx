import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import badge from "../assets/hhe-badge.png";
import { camps, campOrder } from "../data/content";
import "./Navbar.css";

const links = [
  { to: "/workshops", label: "Workshops" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About Us" },
  { to: "/partners", label: "Partners" },
];

const seasonDot = {
  "spring-2026": "var(--teal)",
  "summer-2026": "var(--cyan)",
  "fall-2026": "var(--blue)",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [campsOpen, setCampsOpen] = useState(false);
  const { pathname } = useLocation();
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCampsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openCamps = () => {
    clearTimeout(closeTimer.current);
    setCampsOpen(true);
  };
  const closeCamps = () => {
    closeTimer.current = setTimeout(() => setCampsOpen(false), 140);
  };

  const campsActive = pathname.startsWith("/camps");

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container container-wide navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="Human Health Explorers home">
          <img src={badge} alt="" className="navbar-badge" width="44" height="44" />
          <span className="navbar-wordmark">
            <span>Human Health</span>
            <span className="navbar-wordmark-accent">Explorers</span>
          </span>
        </Link>

        <nav className="navbar-links" aria-label="Primary">
          <div className="navbar-dropdown" onMouseEnter={openCamps} onMouseLeave={closeCamps}>
            <button
              type="button"
              className={`navbar-link navbar-dropdown-trigger ${campsActive ? "is-active" : ""}`}
              aria-expanded={campsOpen}
              onClick={() => setCampsOpen((v) => !v)}
            >
              Camps
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={`navbar-menu ${campsOpen ? "is-open" : ""}`}>
              {campOrder.map((slug) => (
                <Link key={slug} to={`/camps/${slug}`} className="navbar-menu-item">
                  <span className="navbar-menu-dot" style={{ background: seasonDot[slug] }} />
                  <span className="navbar-menu-text">
                    {camps[slug].season}
                    {camps[slug].status === "upcoming" && (
                      <em className="navbar-menu-tag">Upcoming</em>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-link ${isActive ? "is-active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/get-involved" className="btn btn-primary navbar-cta">
            Get Involved
          </Link>
          <button
            type="button"
            className="navbar-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={mobileOpen ? "is-x" : ""} />
            <span className={mobileOpen ? "is-x" : ""} />
          </button>
        </div>
      </div>

      <div className={`navbar-mobile ${mobileOpen ? "is-open" : ""}`}>
        <div className="navbar-mobile-inner">
          <p className="navbar-mobile-label">Camps</p>
          {campOrder.map((slug) => (
            <Link key={slug} to={`/camps/${slug}`} className="navbar-mobile-link is-sub">
              {camps[slug].season}
              {camps[slug].status === "upcoming" && <em className="navbar-menu-tag">Upcoming</em>}
            </Link>
          ))}
          <p className="navbar-mobile-label">Explore</p>
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="navbar-mobile-link">
              {link.label}
            </Link>
          ))}
          <Link to="/get-involved" className="btn btn-primary btn-lg navbar-mobile-cta">
            Get Involved
          </Link>
        </div>
      </div>
    </header>
  );
}
