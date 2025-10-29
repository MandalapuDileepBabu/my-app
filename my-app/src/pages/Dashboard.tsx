import React from "react";

interface DashboardProps {
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  return (
    <main style={{ maxWidth: 960, margin: "40px auto", padding: 20 }}>
      <h2>Welcome, {username}</h2>
      <section style={{ marginBottom: 24 }}>
        <h3>Your Contribution Points</h3>
        <p>Points earned from your feedback will show here.</p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h3>City Cleanliness Overview</h3>
        <p>Pie chart placeholder</p>
        <p>Bar graph placeholder</p>
      </section>
      <section>
        <h3>Improvement Level</h3>
        <p>Summary of city cleanliness improvement will show here.</p>
      </section>
    </main>
  );
};

export default Dashboard;
