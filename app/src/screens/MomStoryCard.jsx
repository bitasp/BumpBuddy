/**
 * Mom Story Card Screen
 * The heart of BumpBuddy.
 * Uses mom expression images. Bubble is a cute water-drop style.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import { getStory } from '../data/stories';
import { getProp, getMomExpression } from '../utils/assets';
import { createRequest } from '../firebase/requests';
import '../styles/animations.css';

export default function MomStoryCard() {
  const { storyId } = useParams();
  const navigate    = useNavigate();
  const story       = getStory(storyId);
  const [loading, setLoading] = useState(false);

  if (!story) {
    navigate('/mom/home');
    return null;
  }

  const propSrc  = getProp(story.propCategory, story.propFile);
  const momSrc   = getMomExpression(story.momExpression || 'relaxed');
  const isNight  = story.night;

  const handleNotify = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const requestId = await createRequest(story);
      navigate(`/mom/sent/${requestId}/${story.id}`);
    } catch (err) {
      console.warn('Firebase not configured, running in demo mode:', err.message);
      navigate(`/mom/sent/demo/${story.id}`);
    }
  };

  const screenBg = isNight
    ? 'var(--gradient-night)'
    : `linear-gradient(160deg, ${story.gradientFrom} 0%, ${story.gradientTo} 100%)`;

  const textColor = isNight ? '#EEE8FF' : 'var(--color-text-primary)';
  const softColor = isNight ? '#B8A8D4' : 'var(--color-text-soft)';

  return (
    <div className="screen" style={{ ...styles.screen, background: screenBg }}>

      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: -60, right: -40, width: 180, height: 180,
        borderRadius: '50%', background: 'rgba(255,255,255,0.12)',
        filter: 'blur(30px)', pointerEvents: 'none',
      }} />

      {/* Back button */}
      <button
        id="back-btn"
        style={{ ...styles.backBtn, color: softColor }}
        onClick={() => navigate('/mom/home')}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* Illustration Area */}
      <div className="animate-slide-up" style={styles.illustrationArea}>

        {/* Mom with expression */}
        <div style={styles.momWrap}>
          <img
            src={momSrc}
            alt={`Mom — ${story.momExpression}`}
            style={styles.momImage}
            draggable={false}
          />

          {/* Tummy window with baby */}
          <div style={styles.tummyWindow}>
            <BabyCharacter
              expression={story.babyExpression}
              size={58}
              animate="float"
            />
          </div>
        </div>

        {/* Prop */}
        {propSrc && (
          <div className="animate-bounce delay-300" style={styles.propWrap}>
            <img
              src={propSrc}
              alt={story.cta}
              style={styles.propImage}
              draggable={false}
            />
          </div>
        )}

      </div>

      {/* ── Water Bubble Speech Bubble ── */}
      <div className="animate-slide-up delay-200" style={styles.content}>

        <WaterBubble story={story} isNight={isNight} />

        {/* Story label */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ ...styles.storyLabel, color: textColor }}>{story.label}</h2>
          <p style={{ ...styles.storyAction, color: softColor }}>{story.supporterAction}</p>
        </div>

      </div>

      {/* CTA */}
      <div className="animate-slide-up delay-400" style={styles.ctaArea}>
        <button
          id="notify-support-btn"
          className="btn btn-primary"
          style={{ opacity: loading ? 0.8 : 1 }}
          onClick={handleNotify}
          disabled={loading}
          aria-label={`Notify support: ${story.cta}`}
        >
          {loading ? '✨ Sending...' : `${story.cta} ❤️`}
        </button>
      </div>

    </div>
  );
}

/** 
 * WaterBubble — a wobbly, fluid, cute speech bubble
 * Uses layered SVG blob + backdrop blur for the water-bubble feel
 */
function WaterBubble({ story, isNight }) {
  const bubbleBg   = isNight ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.82)';
  const textClr    = isNight ? '#EEE8FF' : 'var(--color-text-primary)';

  return (
    <div style={styles.bubbleOuter}>
      {/* Floating mini-bubbles for decoration */}
      <MiniBubble size={8}  style={{ top: -4, left: '20%',  animationDelay: '0s' }} />
      <MiniBubble size={5}  style={{ top: -2, left: '38%',  animationDelay: '0.4s' }} />
      <MiniBubble size={10} style={{ top: -6, left: '58%',  animationDelay: '0.8s' }} />
      <MiniBubble size={6}  style={{ top: -3, left: '75%',  animationDelay: '0.2s' }} />

      {/* Main bubble body */}
      <div style={{
        ...styles.bubble,
        background: bubbleBg,
      }}>
        {/* Inner shimmer ring */}
        <div style={styles.bubbleShimmer} />

        {/* Content */}
        <span style={styles.bubbleEmoji}>{story.emoji}</span>
        <p style={{ ...styles.bubbleText, color: textClr }}>{story.babyLine}</p>

        {/* Bottom tail drip */}
        <div style={styles.bubbleDrip} />
        <div style={styles.bubbleDripSmall} />
      </div>
    </div>
  );
}

function MiniBubble({ size, style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.7)',
        border: '1.5px solid rgba(255,255,255,0.5)',
        animation: `babyFloat ${2 + size * 0.2}s ease-in-out infinite`,
        backdropFilter: 'blur(2px)',
        ...style,
      }}
    />
  );
}

const styles = {
  screen: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-lg)',
    gap: 'var(--space-md)',
    position: 'relative',
    overflow: 'hidden',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-main)',
    fontSize: 'var(--text-md)',
    fontWeight: 700,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    padding: '4px 0',
    zIndex: 2,
  },
  illustrationArea: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    minHeight: 240,
  },
  momWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  momImage: {
    width: 200,
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 24px rgba(61,44,44,0.12))',
  },
  tummyWindow: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 80,
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    background: 'rgba(255, 240, 220, 0.5)',
    border: '2.5px solid rgba(255, 203, 164, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 2px 8px rgba(244,147,122,0.1), 0 0 20px rgba(255,203,164,0.2)',
    backdropFilter: 'blur(2px)',
  },
  propWrap: {
    position: 'absolute',
    bottom: 8,
    right: '6%',
  },
  propImage: {
    width: 78,
    height: 78,
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(61,44,44,0.14))',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    zIndex: 1,
  },
  /* ── Water bubble styles ── */
  bubbleOuter: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  bubble: {
    position: 'relative',
    borderRadius: '60% 60% 55% 55% / 65% 65% 50% 50%',
    padding: '24px 28px 28px',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: `
      0 2px 0 rgba(255,255,255,0.6) inset,
      0 -2px 0 rgba(255,255,255,0.2) inset,
      2px 0 0 rgba(255,255,255,0.3) inset,
      0 8px 32px rgba(100,140,200,0.15),
      0 2px 8px rgba(100,140,200,0.1)
    `,
    border: '1.5px solid rgba(255,255,255,0.6)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    width: '100%',
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
  bubbleEmoji: {
    fontSize: 32,
    lineHeight: 1,
    position: 'relative',
    zIndex: 1,
  },
  bubbleText: {
    fontSize: 'var(--text-lg)',
    fontWeight: 800,
    lineHeight: 1.45,
    position: 'relative',
    zIndex: 1,
  },
  /* Drip droplets at the bottom of the bubble */
  bubbleDrip: {
    position: 'absolute',
    bottom: -14,
    left: '44%',
    width: 16,
    height: 20,
    background: 'rgba(255,255,255,0.75)',
    borderRadius: '50% 50% 60% 60% / 40% 40% 60% 60%',
    border: '1.5px solid rgba(255,255,255,0.5)',
    backdropFilter: 'blur(6px)',
    animation: 'babyFloat 3.5s ease-in-out infinite',
  },
  bubbleDripSmall: {
    position: 'absolute',
    bottom: -22,
    left: '50%',
    width: 9,
    height: 12,
    background: 'rgba(255,255,255,0.55)',
    borderRadius: '50% 50% 60% 60% / 40% 40% 60% 60%',
    border: '1px solid rgba(255,255,255,0.4)',
    backdropFilter: 'blur(4px)',
    animation: 'babyFloat 4s ease-in-out 0.5s infinite',
  },
  storyLabel: {
    fontSize: 'var(--text-2xl)',
    fontWeight: 900,
    marginBottom: 4,
  },
  storyAction: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  ctaArea: {
    paddingBottom: 'var(--space-lg)',
    zIndex: 1,
  },
};
