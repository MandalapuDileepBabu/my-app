import React from 'react';

const newsItems = [
  {
    title: 'Solar Panels Installed in Public Spaces',
    date: 'August 13, 2025',
    content:
      'Harnessing clean energy to reduce carbon footprint and promote sustainability.',
  },
  {
    title: 'City Upgrades Electrical Grid for Efficiency',
    date: 'July 28, 2025',
    content:
      'State-of-the-art technology implemented to ensure reliable and efficient electricity supply.',
  },
  // Add more electricity-related news as needed
];

const Electricity: React.FC = () => (
  <section
    style={{
      maxWidth: 800,
      margin: '40px auto',
      padding: '0 20px',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
    }}
  >
    <h1
      style={{
        color: '#235',
        marginBottom: 32,
        textAlign: 'center',
        fontWeight: 800,
      }}
    >
      Electricity Supply News
    </h1>
    {newsItems.map((news, idx) => (
      <article
        key={idx}
        style={{
          marginBottom: 24,
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: 16,
        }}
      >
        <h3 style={{ color: '#223', fontWeight: 700 }}>{news.title}</h3>
        <time style={{ display: 'block', fontSize: '0.96rem', color: '#666' }}>
          {news.date}
        </time>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, marginTop: 10 }}>
          {news.content}
        </p>
      </article>
    ))}
  </section>
);

export default Electricity;
