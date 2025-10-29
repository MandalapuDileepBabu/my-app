import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NewsTopic {
  id: string;
  title: string;
  description: string;
  image: string;
  newsUrl: string;
}

const newsTopics: NewsTopic[] = [
  {
    id: 'water',
    title: 'Water Pollution',
    description: 'Efforts to keep water bodies clean and safe.',
    image:
      'https://static.wixstatic.com/media/c2bed181787047f0854890bb489c9662.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/c2bed181787047f0854890bb489c9662.jpg',
    newsUrl: '/news/water',
  },
  {
    id: 'roads',
    title: 'Road Cleaning',
    description: 'Community working together for safer, cleaner roads.',
    image: 'https://dlsdc.com/wp-content/uploads/2019/04/Earth_Day_Blog-scaled.jpg',
    newsUrl: '/news/roads',
  },
  {
    id: 'electricity',
    title: 'Electricity Supply',
    description: 'Reliable and sustainable power solutions.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    newsUrl: '/news/electricity',
  },
  {
    id: 'air',
    title: 'Air Quality',
    description: 'Monitoring and improving the air we breathe.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    newsUrl: '/news/air',
  },
  {
    id: 'cleanliness',
    title: 'Municipal Cleanliness',
    description: 'Keeping our neighborhoods clean and healthy.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80',
    newsUrl: '/news/cleanliness',
  },
];

const News: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  return (
    <section
      id="news"
      style={{
        padding: '80px 100px',
        maxWidth: 1280,
        margin: '0 auto',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        boxShadow: 'none',
      }}
    >
      <h2 style={{ color: '#333', marginBottom: 40, textAlign: 'center' }}>
        Explore News by Topic
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(320px, 1fr))',
          gap: '36px',
          justifyItems: 'center',
        }}
      >
        {newsTopics.map((topic) => (
          <Link
            to={topic.newsUrl}
            key={topic.id}
            onMouseEnter={() => setFlippedCard(topic.id)}
            onMouseLeave={() => setFlippedCard(null)}
            onFocus={() => setFlippedCard(topic.id)}
            onBlur={() => setFlippedCard(null)}
            aria-label={`View latest news about ${topic.title}`}
            style={{
              perspective: 1000,
              cursor: 'pointer',
              textDecoration: 'none',
              outline: 'none',
              display: 'block',
              borderRadius: 12,
              width: '100%',
              maxWidth: '400px',
              position: 'relative',
              paddingTop: '114.29%', // 4 / 3.5 ratio
            }}
            tabIndex={0}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 12,
                boxShadow:
                  flippedCard === topic.id
                    ? '0 6px 18px rgba(0,0,0,0.25)'
                    : '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 1s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease',
                transformStyle: 'preserve-3d',
                transform:
                  flippedCard === topic.id ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front Side */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                  backfaceVisibility: 'hidden',
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5',
                  color: '#222',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <img
                  src={topic.image}
                  alt={topic.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
                <h3
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 0,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '8px 4px',
                    borderRadius: '0 0 12px 12px',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    textAlign: 'center',
                  }}
                >
                  {topic.title}
                </h3>
              </div>

              {/* Back Side */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: 12,
                  backgroundColor: '#fafafa',
                  color: '#444',
                  padding: 20,
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                <p style={{ fontSize: '1rem', marginBottom: 'auto' }}>
                  {topic.description}
                </p>
                <p
                  style={{
                    marginTop: 12,
                    fontWeight: 600,
                    color: '#555',
                    textDecoration: 'underline',
                  }}
                >
                  Click to read latest news
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default News;
