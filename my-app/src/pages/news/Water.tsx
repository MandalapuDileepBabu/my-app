import React from 'react';
import BackButton from '../../components/BackButton';
 // Adjust path based on your folders

const newsItems = [
  {
    title: 'City Works to Improve River Water Quality',
    date: 'August 15, 2025',
    content: 'New filters and cleanup drives are helping the river regain its purity.',
  },
  // ... more news items
];

const Water: React.FC = () => (
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
    <BackButton />
    <h1
      style={{
        color: '#235',
        marginBottom: 32,
        textAlign: 'center',
        fontWeight: 800,
      }}
    >
      Water Pollution News
    </h1>
    {newsItems.map((news, idx) => (
      <article
        key={idx}
        style={{ marginBottom: 24, borderBottom: '1px solid #e5e5e5', paddingBottom: 16 }}
      >
        <h3 style={{ color: '#223', fontWeight: 700 }}>{news.title}</h3>
        <time style={{ display: 'block', fontSize: '0.96rem', color: '#666' }}>{news.date}</time>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, marginTop: 10 }}>{news.content}</p>
      </article>
    ))}
  </section>
);

export default Water;
