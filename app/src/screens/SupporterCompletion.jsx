/**
 * Supporter Completion Screen
 * Baby celebrates with confetti and hearts.
 * Big warm thank you. Returns to Requests.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import EffectsOverlay from '../components/EffectsOverlay';
import { getStory } from '../data/stories';
import { completeRequest } from '../firebase/requests';
import '../styles/animations.css';

export default function SupporterCompletion() {
  const { requestId, storyId } = useParams();
  const navigate = useNavigate();
  const story    = getStory(storyId);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts,   setShowHearts]   = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Fire effects in sequence
    const t1 = setTimeout(() => setShowConfetti(true), 300);
    const t2 = setTimeout(() => setShowHearts(true),   900);

    // Mark request complete in Firestore
    if (requestId !== 'demo') {
      completeRequest(requestId).catch((e) =>
        console.warn('Could not complete request:', e.message)
      );
    }

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [requestId]);

  const handleDone = () => {
    setDone(true);
    setTimeout(() => navigate('/supporter/requests'), 300);
  };

  return (
    <div className="screen" style={styles.screen}>

      {/* Effects */}
      <EffectsOverlay type="confetti" trigger={showConfetti} />
      <EffectsOverlay type="hearts"   trigger={showHearts} />

      {/* Center */}
      <div style={styles.center}>

        {/* Baby celebrating */}
        <div style={styles.babyWrap}>
          <div className="animate-glow" style={styles.glowRing} />
          <BabyCharacter
            expression="thankful"
            size={130}
            animate="bounce"
            className="animate-bounce"
          />
        </div>

        {/* Checkmark */}
        <div className="animate-bounce delay-200" style={styles.checkmark}>
          ✅
        </div>

        {/* Thank you text */}
        <div className="animate-slide-up delay-300" style={styles.textGroup}>
          <h1 style={styles.title}>You did it! 🎉</h1>
          <p style={styles.subtitle}>
            {story?.completionLine || 'Thank you for taking care of Mom!'}
          </p>
        </div>

        {/* Story recap */}
        {story && (
          <div className="animate-fade-in delay-400" style={styles.recap}>
            <span style={styles.recapEmoji}>{story.emoji}</span>
            <span style={styles.recapText}>{story.label}</span>
            <span style={styles.recapCheck}>✓</span>
          </div>
        )}

        {/* Baby success line */}
        <div className="animate-slide-up delay-500" style={styles.bubble}>
          <p style={styles.bubbleText}>{story?.successBabyLine || 'We did great today!'}</p>
        </div>

      </div>

      {/* Done button */}
      <div className="animate-slide-up delay-600" style={styles.ctaArea}>
        <button
          id="completion-done-btn"
          className="btn btn-primary"
          style={{ opacity: done ? 0.7 : 1 }}
          onClick={handleDone}
        >
          Back to Requests 🌼
        </button>
      </div>

    </div>
  );
}

const styles = {
  screen: {
    background: 'linear-gradient(160deg, #FFF8F0 0%, #FFE8D6 50%, #FFD4BA 100%)',
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
    gap: 'var(--space-lg)',
    zIndex: 1,
  },
  babyWrap: {
    position: 'relative',
    width: 170,
    height: 170,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    inset: -20,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,203,164,0.65) 0%, transparent 70%)',
  },
  checkmark: {
    fontSize: 40,
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
    maxWidth: 280,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  recap: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    background: 'rgba(255,255,255,0.75)',
    padding: '10px 20px',
    borderRadius: 'var(--radius-full)',
    boxShadow: 'var(--shadow-soft)',
  },
  recapEmoji: { fontSize: 22 },
  recapText: {
    fontSize: 'var(--text-md)',
    fontWeight: 800,
    color: 'var(--color-text-primary)',
    flex: 1,
  },
  recapCheck: {
    fontSize: 18,
  },
  bubble: {
    background: 'white',
    borderRadius: 20,
    padding: 'var(--space-md) var(--space-xl)',
    boxShadow: 'var(--shadow-soft)',
    textAlign: 'center',
  },
  bubbleText: {
    fontSize: 'var(--text-lg)',
    fontWeight: 800,
    color: 'var(--color-text-primary)',
  },
  ctaArea: {
    paddingBottom: 'var(--space-lg)',
    zIndex: 1,
  },
};
