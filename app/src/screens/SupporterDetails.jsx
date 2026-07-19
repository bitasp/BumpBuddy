/**
 * Supporter Details Screen
 * Full story view. One illustration, baby asking, clear action.
 * "I'm On It" → updates Firestore, navigates to Completion.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import { getStory } from '../data/stories';
import { getProp, getMomExpression } from '../utils/assets';
import { acceptRequest } from '../firebase/requests';
import '../styles/animations.css';

export default function SupporterDetails() {
  const { requestId, storyId } = useParams();
  const navigate = useNavigate();
  const story    = getStory(storyId);
  const [loading, setLoading] = useState(false);

  if (!story) {
    navigate('/supporter/requests');
    return null;
  }

  const propSrc = getProp(story.propCategory, story.propFile);
  const momSrc  = getMomExpression(story.momExpression || 'relaxed');

  const handleAccept = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (requestId !== 'demo') {
        await acceptRequest(requestId);
      }
      navigate(`/supporter/complete/${requestId}/${storyId}`);
    } catch (err) {
      console.warn('Firebase error, navigating anyway:', err.message);
      navigate(`/supporter/complete/${requestId}/${storyId}`);
    }
  };

  return (
    <div className="screen" style={styles.screen}>

      {/* Back */}
      <button
        id="back-btn"
        style={styles.backBtn}
        onClick={() => navigate('/supporter/requests')}
      >
        ← Requests
      </button>

      {/* Illustration */}
      <div className="animate-slide-up" style={styles.illustrationArea}>
        <div style={styles.momWrap}>
          <img src={momSrc} alt={`Mom — ${story.momExpression}`} style={styles.momImage} draggable={false} />
          <div style={styles.tummyWindow}>
            <BabyCharacter expression={story.babyExpression} size={60} animate="float" />
          </div>
        </div>
        {propSrc && (
          <div className="animate-bounce delay-300" style={styles.propWrap}>
            <img src={propSrc} alt="" style={styles.propImage} draggable={false} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="animate-slide-up delay-200" style={styles.content}>

        <div style={styles.bubbleWater}>
          <div style={styles.bubbleShimmer} />
          <span style={styles.bubbleEmoji}>{story.emoji}</span>
          <p style={styles.bubbleText}>{story.babyLine}</p>
          <div style={styles.bubbleDrip} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={styles.title}>Mom needs help!</h2>
          <p style={styles.action}>{story.supporterAction}</p>
        </div>

      </div>

      {/* CTA */}
      <div className="animate-slide-up delay-400" style={styles.ctaArea}>
        <button
          id="imonit-btn"
          className="btn btn-primary"
          style={{ opacity: loading ? 0.8 : 1 }}
          onClick={handleAccept}
          disabled={loading}
        >
          {loading ? '✨ On the way...' : story.supporterCta}
        </button>
        <button
          style={styles.skipBtn}
          onClick={() => navigate('/supporter/requests')}
        >
          Not right now
        </button>
      </div>

    </div>
  );
}

const styles = {
  screen: {
    background: 'var(--gradient-warm)',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-lg)',
    gap: 'var(--space-lg)',
    position: 'relative',
    overflow: 'hidden',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-main)',
    fontSize: 'var(--text-md)',
    fontWeight: 700,
    color: 'var(--color-text-soft)',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    padding: '4px 0',
  },
  illustrationArea: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    minHeight: 220,
  },
  momWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  momImage: {
    width: 165,
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 24px rgba(61,44,44,0.12))',
  },
  tummyWindow: {
    position: 'absolute',
    top: '28%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 76,
    height: 76,
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    background: 'rgba(255, 240, 220, 0.55)',
    border: '2.5px solid rgba(255, 203, 164, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propWrap: {
    position: 'absolute',
    bottom: 12,
    right: '8%',
  },
  propImage: {
    width: 72,
    height: 72,
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(61,44,44,0.12))',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
  },
  bubbleWater: {
    position: 'relative',
    borderRadius: '60% 60% 55% 55% / 65% 65% 50% 50%',
    padding: '22px 28px 26px',
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: `
      0 2px 0 rgba(255,255,255,0.6) inset,
      0 -2px 0 rgba(255,255,255,0.2) inset,
      0 8px 32px rgba(100,140,200,0.15)
    `,
    border: '1.5px solid rgba(255,255,255,0.6)',
    maxWidth: 280,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    overflow: 'visible',
  },
  bubbleShimmer: {
    position: 'absolute',
    top: 8,
    left: '15%',
    width: '35%',
    height: '28%',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.45)',
    filter: 'blur(4px)',
    pointerEvents: 'none',
  },
  bubbleDrip: {
    position: 'absolute',
    bottom: -13,
    left: '44%',
    width: 15,
    height: 18,
    background: 'rgba(255,255,255,0.75)',
    borderRadius: '50% 50% 60% 60% / 40% 40% 60% 60%',
    border: '1.5px solid rgba(255,255,255,0.5)',
    backdropFilter: 'blur(4px)',
    animation: 'babyFloat 3.5s ease-in-out infinite',
  },
  bubbleEmoji: { fontSize: 28, position: 'relative', zIndex: 1 },
  bubbleText: {
    fontSize: 'var(--text-lg)',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    lineHeight: 1.4,
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontSize: 'var(--text-2xl)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
    marginBottom: 6,
  },
  action: {
    fontSize: 'var(--text-md)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  ctaArea: {
    paddingBottom: 'var(--space-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  skipBtn: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-main)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'center',
    padding: '10px',
  },
};
