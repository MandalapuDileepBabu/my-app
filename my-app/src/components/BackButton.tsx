import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/news')}
      style={{
        background: 'none',
        border: 'none',
        color: '#000000cc',
        cursor: 'pointer',
        marginBottom: 20,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        userSelect: 'none',
        fontSize: '1.25rem',
      }}
      aria-label="Go back to news topics"
    >
      <span
        style={{
          fontWeight: 900,
          fontSize: '1.5rem',
          lineHeight: 1,
          marginRight: 8,
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        ←
      </span>
      <span>Back</span>
    </button>
  );
};

export default BackButton;
