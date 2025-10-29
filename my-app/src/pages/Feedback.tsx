import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [sanitization, setSanitization] = useState("");
  const [electricity, setElectricity] = useState("");
  const [water, setWater] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with API call or data handling logic
    alert("Feedback submitted. Thank you!");
    setSanitization("");
    setElectricity("");
    setWater("");
    setComments("");
  };

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Locality Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Sanitization:
          <select
            value={sanitization}
            onChange={(e) => setSanitization(e.target.value)}
            required
          >
            <option value="">Select rating</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Electricity:
          <select
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            required
          >
            <option value="">Select rating</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Water:
          <select
            value={water}
            onChange={(e) => setWater(e.target.value)}
            required
          >
            <option value="">Select rating</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Additional Comments:
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </label>
        <br />
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#29b430",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </form>
    </main>
  );
};

export default Feedback;
