import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Camp from "./pages/Camp";
import Workshops from "./pages/Workshops";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Partners from "./pages/Partners";
import GetInvolved from "./pages/GetInvolved";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camps" element={<Navigate to="/camps/fall-2026" replace />} />
          <Route path="/camps/:slug" element={<Camp />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          {/* old URL kept alive so any shared link still lands somewhere */}
          <Route path="/sponsors" element={<Navigate to="/partners" replace />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
