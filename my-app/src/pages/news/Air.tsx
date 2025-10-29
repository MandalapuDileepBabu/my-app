import React from 'react';

const newsItems = [
  {
    title: 'Air Quality Monitoring Stations Deployed',
    date: 'August 12, 2025',
    content:
      'Real-time data collection helps authorities manage pollution and protect public health.',
  },
  {
    title: 'City Promotes Green Transportation to Improve Air',
    date: 'July 30, 2025',
    content:
      'New bike lanes and electric bus fleets reduce emissions and increase air quality.',
  },
  // Add more air quality related news here
];

const Air: React.FC = () => (
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
      Air Quality News
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

export default Air;
