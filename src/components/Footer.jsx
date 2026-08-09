import { Link } from "react-router-dom";
import badge from "../assets/hhe-badge.png";
import { org, camps, campOrder } from "../data/content";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container container-wide footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="Human Health Explorers home">
            <img src={badge} alt="" width="52" height="52" />
            <span>
              Human Health
              <em>Explorers</em>
            </span>
          </Link>
          <p className="footer-blurb">
            A free, 100% student-run health science program for Naperville-area
            elementary and middle schoolers. Built and taught entirely by local high
            schoolers.
          </p>
          <p className="footer-slogan">{org.slogan}</p>
        </div>

        <div className="footer-col">
          <h4>Camps</h4>
          <ul>
            {campOrder.map((slug) => (
              <li key={slug}>
                <Link to={`/camps/${slug}`}>{camps[slug].season}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/workshops">Workshops</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/partners">Partners</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href={`mailto:${org.email}`}>{org.email}</a>
            </li>
            <li>
              <a href={org.instagram} target="_blank" rel="noreferrer">
                {org.instagramHandle}
              </a>
            </li>
            <li>
              <Link to="/get-involved">Get Involved</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container container-wide footer-bottom">
        <p>© {new Date().getFullYear()} Human Health Explorers. All rights reserved.</p>
        <p>Naperville, Illinois · Fiscally sponsored by Hack Club</p>
      </div>
    </footer>
  );
}
