import React from 'react';

const newsItems = [
  {
    title: 'Community Clean-Up Drives Organized Weekly',
    date: 'August 11, 2025',
    content: 'Residents actively participate in local cleanliness efforts.',
  },
  {
    title: 'City Installs More Public Waste Bins',
    date: 'July 25, 2025',
    content: 'Improving access to waste disposal and encouraging responsible habits.',
  },
  // Add more cleanliness-related news here
];

const Cleanliness: React.FC = () => (
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
      Municipal Cleanliness News
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

export default Cleanliness;
