/**
 * Splash Screen
 * First impression — emotional, warm, simple.
 * Baby floats in. Logo fades. Auto-advances after 2.8s.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import '../styles/animations.css';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/role'), 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="screen" style={styles.screen} onClick={() => navigate('/role')}>
      {/* Decorative blobs */}
      <div className="blob blob-coral" style={{ top: -60, right: -40 }} />
      <div className="blob blob-lav"   style={{ bottom: -40, left: -30 }} />

      {/* Stars */}
      <Star style={{ top: '15%', left: '12%', animationDelay: '0s' }} />
      <Star style={{ top: '20%', right: '18%', animationDelay: '0.4s', fontSize: 12 }} />
      <Star style={{ top: '72%', left: '20%', animationDelay: '0.7s', fontSize: 10 }} />
      <Star style={{ top: '65%', right: '15%', animationDelay: '0.3s' }} />

      {/* Center content */}
      <div style={styles.center}>

        {/* Baby in tummy window */}
        <div className="animate-logo delay-200" style={styles.babyWrapper}>
          <div style={styles.glow} />
          <BabyCharacter expression="happy" size={110} animate="float" />
        </div>

        {/* Wordmark */}
        <div className="animate-fade-in delay-400" style={styles.wordmark}>
          <span style={styles.wordmarkMain}>BumpBuddy</span>
          <span style={styles.wordmarkEmoji}>🌼</span>
        </div>

        {/* Tagline */}
        <p className="animate-fade-in delay-600" style={styles.tagline}>
          One tiny story at a time.
        </p>

      </div>

      {/* Tap hint */}
      <p className="animate-fade-in delay-700" style={styles.tapHint}>
        Tap to begin
      </p>
    </div>
  );
}

function Star({ style }) {
  return (
    <span
      aria-hidden="true"
      className="animate-sparkle"
      style={{
        position: 'absolute',
        fontSize: 16,
        animation: `starTwinkle 2s ease-in-out infinite`,
        ...style,
      }}
    >
      ✦
    </span>
  );
}

const styles = {
  screen: {
    background: 'var(--gradient-warm)',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 'var(--space-xl)',
    position: 'relative',
    overflow: 'hidden',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    zIndex: 1,
  },
  babyWrapper: {
    position: 'relative',
    width: 140,
    height: 140,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    inset: -20,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,203,164,0.5) 0%, transparent 70%)',
    animation: 'glowPulse 2.5s ease-in-out infinite',
  },
  wordmark: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  wordmarkMain: {
    fontSize: 'var(--text-3xl)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
    letterSpacing: '-0.02em',
  },
  wordmarkEmoji: {
    fontSize: 'var(--text-3xl)',
  },
  tagline: {
    fontSize: 'var(--text-md)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  tapHint: {
    position: 'absolute',
    bottom: 48,
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
};
