/**
 * Mom Request Sent Screen
 * Baby celebrates. Warm confirmation. One "Done" button.
 * Hearts and sparkles float.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import EffectsOverlay from '../components/EffectsOverlay';
import { getStory } from '../data/stories';
import '../styles/animations.css';

export default function MomRequestSent() {
  const { storyId } = useParams();
  const navigate    = useNavigate();
  const story       = getStory(storyId);
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowEffects(true), 400);
    return () => clearTimeout(t);
  }, []);

  const label    = story?.label    || 'Your request';
  const success  = story?.successLine || 'Thank you! 💛';

  return (
    <div className="screen" style={styles.screen}>

      {/* Effects */}
      <EffectsOverlay type="hearts" trigger={showEffects} />

      {/* Center content */}
      <div style={styles.center}>

        {/* Success ring */}
        <div style={styles.ringWrap}>
          <div className="animate-glow" style={styles.ring} />
          <BabyCharacter
            expression="thankful"
            size={120}
            animate="bounce"
            className="animate-bounce"
          />
        </div>

        {/* Success text */}
        <div className="animate-slide-up delay-200" style={styles.textGroup}>
          <h1 style={styles.title}>Message sent! ✨</h1>
          <p style={styles.subtitle}>
            Your supporter has been notified.
          </p>
        </div>

        {/* Baby line */}
        <div className="animate-slide-up delay-300" style={styles.bubble}>
          <p style={styles.bubbleText}>{success}</p>
        </div>

        {/* Request summary */}
        <div className="animate-fade-in delay-400" style={styles.summary}>
          <span style={styles.summaryEmoji}>{story?.emoji}</span>
          <span style={styles.summaryText}>{label}</span>
        </div>

      </div>

      {/* Done button */}
      <div className="animate-slide-up delay-500" style={styles.ctaArea}>
        <button
          id="done-btn"
          className="btn btn-primary"
          onClick={() => navigate('/mom/home')}
          aria-label="Done, return to home"
        >
          Done 🌼
        </button>
      </div>

    </div>
  );
}

const styles = {
  screen: {
    background: 'linear-gradient(160deg, #FFF8F0 0%, #FFE8D6 60%, #FFD4C0 100%)',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-xl) var(--space-lg) var(--space-lg)',
    position: 'relative',
    overflow: 'hidden',
  },
  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-xl)',
    zIndex: 1,
  },
  ringWrap: {
    position: 'relative',
    width: 160,
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    inset: -16,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,203,164,0.6) 0%, transparent 70%)',
  },
  textGroup: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontSize: 'var(--text-3xl)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
  },
  subtitle: {
    fontSize: 'var(--text-md)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
  },
  bubble: {
    background: 'white',
    borderRadius: '20px',
    padding: 'var(--space-md) var(--space-xl)',
    boxShadow: 'var(--shadow-soft)',
    textAlign: 'center',
  },
  bubbleText: {
    fontSize: 'var(--text-xl)',
    fontWeight: 800,
    color: 'var(--color-text-primary)',
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    background: 'rgba(255,255,255,0.7)',
    padding: '10px 20px',
    borderRadius: 'var(--radius-full)',
    boxShadow: 'var(--shadow-soft)',
  },
  summaryEmoji: {
    fontSize: 22,
  },
  summaryText: {
    fontSize: 'var(--text-md)',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
  },
  ctaArea: {
    paddingBottom: 'var(--space-lg)',
    zIndex: 1,
  },
};
