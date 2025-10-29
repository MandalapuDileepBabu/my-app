import React from 'react';

const newsItems = [
  {
    title: 'Earth Day City Road Cleaning Drive',
    date: 'April 22, 2025',
    content:
      'Hundreds of volunteers participated in a city-wide effort to clean and rehabilitate major urban roads.',
  },
  {
    title: 'Major Road Repair Work Completed Downtown',
    date: 'August 5, 2025',
    content:
      'Significant repairs have been finished to improve traffic flow and safety for citizens.',
  },
  // Add more roads-related news here
];

const Roads: React.FC = () => (
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
      Road Cleaning News
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

export default Roads;
