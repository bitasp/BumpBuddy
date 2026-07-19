/**
 * Mom Home Screen
 * 7 situation tiles. One tap sends you to the story card.
 * Baby floats in the header. Warm, calm, simple.
 */

import { useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import { stories } from '../data/stories';
import '../styles/animations.css';

// The 7 home situations (first 6 stories + "I'm Okay")
const HOME_SITUATIONS = [
  ...stories.slice(0, 6).map((s) => ({ id: s.id, emoji: s.emoji, label: s.label, color: s.gradientFrom })),
  { id: null, emoji: '😊', label: "I'm Okay", color: '#E8FFE8', special: true },
];

export default function MomHome() {
  const navigate = useNavigate();

  const handleTile = (situation) => {
    if (situation.special) {
      // "I'm Okay" — just celebrate, no request needed
      navigate('/mom/story/012');
      return;
    }
    navigate(`/mom/story/${situation.id}`);
  };

  return (
    <div className="screen" style={styles.screen}>

      {/* Header */}
      <header style={styles.header}>
        <div className="animate-slide-up" style={styles.headerTop}>
          <div>
            <h1 style={styles.greeting}>Hi, Mom 🤰</h1>
            <p style={styles.subGreeting}>How are you feeling right now?</p>
          </div>
          <div style={styles.babyHeaderWrap}>
            <BabyCharacter expression="happy" size={64} animate="float" />
          </div>
        </div>
      </header>

      {/* Situation Grid */}
      <div className="animate-slide-up delay-200" style={styles.grid}>
        {HOME_SITUATIONS.map((situation, index) => (
          <SituationTile
            key={situation.id || 'okay'}
            situation={situation}
            index={index}
            onTap={() => handleTile(situation)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="animate-fade-in delay-500" style={styles.footer}>
        <p style={styles.footerText}>🌼 BumpBuddy is here for you.</p>
      </div>

    </div>
  );
}

function SituationTile({ situation, index, onTap }) {
  return (
    <button
      id={`tile-${situation.id || 'okay'}`}
      className="animate-slide-up"
      style={{
        ...styles.tile,
        background: situation.color,
        animationDelay: `${index * 60}ms`,
      }}
      onClick={onTap}
      aria-label={situation.label}
    >
      <span style={styles.tileEmoji}>{situation.emoji}</span>
      <span style={styles.tileLabel}>{situation.label}</span>
    </button>
  );
}

const styles = {
  screen: {
    background: 'var(--gradient-warm)',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-xl) var(--space-lg) var(--space-lg)',
    gap: 'var(--space-lg)',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    zIndex: 1,
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--space-md)',
  },
  greeting: {
    fontSize: 'var(--text-2xl)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
  },
  subGreeting: {
    fontSize: 'var(--text-md)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
    marginTop: 4,
  },
  babyHeaderWrap: {
    flexShrink: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-md)',
    flex: 1,
    zIndex: 1,
  },
  tile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-xl) var(--space-md)',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-main)',
    boxShadow: 'var(--shadow-card)',
    transition: 'transform var(--transition-bounce), box-shadow var(--transition-base)',
    minHeight: 110,
    WebkitTapHighlightColor: 'transparent',
  },
  tileEmoji: {
    fontSize: 36,
    lineHeight: 1,
  },
  tileLabel: {
    fontSize: 'var(--text-sm)',
    fontWeight: 800,
    color: 'var(--color-text-primary)',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  footer: {
    textAlign: 'center',
    paddingBottom: 'var(--space-md)',
  },
  footerText: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    fontWeight: 600,
  },
};
