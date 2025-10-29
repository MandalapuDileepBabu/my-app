import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import demoBg from "../assets/cleaning-forest.png";

const heroSectionStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "60vh",
  paddingTop: "50px",
  paddingBottom: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#111",
  background: `linear-gradient(rgba(38,61,46,0.40), rgba(38,61,46,0.37)), url(${demoBg}) center/cover no-repeat`,
};

const textContainerStyle: React.CSSProperties = {
  textAlign: "center",
  zIndex: 2,
};

const headlineStyle: React.CSSProperties = {
  fontSize: "3rem",
  fontWeight: 900,
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  justifyContent: "center",
  alignItems: "center",
  lineHeight: 1.1,
};

const animateBase: React.CSSProperties = {
  transition: "transform 1.1s cubic-bezier(.85,0,.38,1), opacity 0.76s",
  opacity: 1,
};

const initialLeftStyle: React.CSSProperties = {
  ...animateBase,
  transform: "translateX(-64%)",
  opacity: 0,
};

const initialRightStyle: React.CSSProperties = {
  ...animateBase,
  transform: "translateX(64%)",
  opacity: 0,
};

const finalStyle: React.CSSProperties = {
  ...animateBase,
  transform: "translateX(0)",
  opacity: 1,
};

const highlight: React.CSSProperties = { color: "#29b430" };

const subheadingStyles: React.CSSProperties = {
  fontSize: "1.2rem",
  maxWidth: 800,
  margin: "28px auto 32px auto",
  color: "#333",
  fontWeight: 400,
  opacity: 0.96,
};

const buttonsRow: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginBottom: "3vh",
};

const statsRow: React.CSSProperties = {
  display: "flex",
  gap: "52px",
  justifyContent: "center",
  marginTop: "40px",
};

const statStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  fontWeight: 700,
  color: "#29b430",
  textAlign: "center",
};

const Hero: React.FC = () => {
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimateLeft(true), 280);
    setTimeout(() => setAnimateRight(true), 600);
  }, []);

  const handleStartReviewing = () => {
    // Navigate to login or dashboard based on auth status
    navigate("/login");
  };

  const handleLearnMore = () => {
    // Scroll or navigate to About section content - now within the homepage or a separate page
    navigate("/#about"); // This assumes About section is on homepage or implement scroll logic
  };

  return (
    <section style={heroSectionStyle}>
      <div style={textContainerStyle}>
        <div style={headlineStyle}>
          <span style={animateRight ? finalStyle : initialRightStyle}>
            Let&apos;s Create a
          </span>
          <span style={{ ...(animateLeft ? finalStyle : initialLeftStyle), ...highlight }}>
            Pollution-Free World
          </span>
          <span style={animateRight ? finalStyle : initialRightStyle}>
            for Future Generations
          </span>
        </div>
        <div style={subheadingStyles}>
          Join our community-driven platform to review, report, and improve civic conditions.
          <br />
          Together, we can build cleaner, healthier communities for our children and their children.
        </div>
        <div style={buttonsRow}>
          <button
            onClick={handleStartReviewing}
            style={{
              background: "#29b430",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 36px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(30,80,30,0.12)",
            }}
          >
            Start Reviewing →
          </button>
          <button
            onClick={handleLearnMore}
            style={{
              background: "#fff",
              color: "#29b430",
              border: "2px solid #29b430",
              borderRadius: 6,
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 36px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(30,80,30,0.06)",
            }}
          >
            Learn More
          </button>
        </div>
        <div style={statsRow}>
          <div style={statStyle}>10K+</div>
          <div style={statStyle}>5K+</div>
          <div style={statStyle}>50+</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
