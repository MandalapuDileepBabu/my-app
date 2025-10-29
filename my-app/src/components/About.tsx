import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        padding: "60px 20px",
        backgroundColor: "#e8f5e9",
        color: "#1b5e20",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#2e7d32",
          }}
        >
          About Civic Review Portal
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "15px",
          }}
        >
          <strong>Civic Review Portal</strong> is a community-driven platform
          dedicated to creating a cleaner, greener, and more transparent society.
          We empower citizens to share reviews, report civic issues, and track
          improvements in their neighborhoods.
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "15px",
          }}
        >
          Our focus is to bridge the gap between the public and civic bodies,
          making it easier to report road repairs, sanitation needs, and
          environmental concerns, while promoting accountability from local
          authorities.
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          With collective effort, we aim to leave a clean and sustainable
          environment for future generations.
        </p>
      </div>
    </section>
  );
};

export default About;
