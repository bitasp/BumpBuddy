/**
 * Role Selection Screen
 * Two warm cards: I'm Mom / I'm a Supporter
 * Sets role in localStorage, routes accordingly.
 */

import { useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import '../styles/animations.css';

export default function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem('bb_role', role);
    if (role === 'mom') {
      navigate('/mom/home');
    } else {
      navigate('/supporter/requests');
    }
  };

  return (
    <div className="screen" style={styles.screen}>
      {/* Decorative blobs */}
      <div className="blob blob-coral" style={{ top: -80, right: -60, opacity: 0.4 }} />
      <div className="blob blob-lav"   style={{ bottom: -60, left: -60, opacity: 0.4 }} />

      {/* Header */}
      <div className="animate-slide-up" style={styles.header}>
        <div style={styles.babyContainer}>
          <BabyCharacter expression="happy" size={72} animate="float" />
        </div>
        <h1 style={styles.title}>Who's here?</h1>
        <p style={styles.subtitle}>
          So I know how to help 💛
        </p>
      </div>

      {/* Role Cards */}
      <div style={styles.cardsWrapper}>

        {/* Mom Card */}
        <button
          id="role-mom"
          className="animate-slide-up delay-200"
          style={{ ...styles.roleCard, ...styles.momCard }}
          onClick={() => selectRole('mom')}
          aria-label="I'm Mom"
        >
          <div style={styles.roleEmoji}>🤰</div>
          <div style={styles.roleTextGroup}>
            <span style={styles.roleTitle}>I'm Mom</span>
            <span style={styles.roleDesc}>Send a care request</span>
          </div>
          <div style={styles.roleArrow}>→</div>
        </button>

        {/* Supporter Card */}
        <button
          id="role-supporter"
          className="animate-slide-up delay-300"
          style={{ ...styles.roleCard, ...styles.supporterCard }}
          onClick={() => selectRole('supporter')}
          aria-label="I'm a Supporter"
        >
          <div style={styles.roleEmoji}>❤️</div>
          <div style={styles.roleTextGroup}>
            <span style={styles.roleTitle}>I'm a Supporter</span>
            <span style={styles.roleDesc}>See how to help Mom</span>
          </div>
          <div style={styles.roleArrow}>→</div>
        </button>

      </div>

      {/* Footer */}
      <p className="animate-fade-in delay-500" style={styles.footer}>
        BumpBuddy 🌼
      </p>
    </div>
  );
}

const styles = {
  screen: {
    background: 'var(--gradient-warm)',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--space-2xl) var(--space-lg) var(--space-xl)',
    gap: 'var(--space-2xl)',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    zIndex: 1,
    marginTop: 'var(--space-xl)',
  },
  babyContainer: {
    marginBottom: 'var(--space-sm)',
  },
  title: {
    fontSize: 'var(--text-3xl)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 'var(--text-md)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
    textAlign: 'center',
  },
  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    width: '100%',
    zIndex: 1,
  },
  roleCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'transform var(--transition-bounce), box-shadow var(--transition-base)',
    fontFamily: 'var(--font-main)',
    width: '100%',
  },
  momCard: {
    background: 'linear-gradient(135deg, #FFF0E8 0%, #FFE0CC 100%)',
    boxShadow: '0 8px 32px rgba(244, 147, 122, 0.18)',
  },
  supporterCard: {
    background: 'linear-gradient(135deg, #F0ECFF 0%, #E0D8FF 100%)',
    boxShadow: '0 8px 32px rgba(180, 160, 240, 0.18)',
  },
  roleEmoji: {
    fontSize: 42,
    lineHeight: 1,
    flexShrink: 0,
  },
  roleTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  roleTitle: {
    fontSize: 'var(--text-xl)',
    fontWeight: 800,
    color: 'var(--color-text-primary)',
  },
  roleDesc: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
  },
  roleArrow: {
    fontSize: 'var(--text-xl)',
    color: 'var(--color-text-muted)',
    fontWeight: 700,
    flexShrink: 0,
  },
  footer: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    fontWeight: 600,
    marginTop: 'auto',
  },
};
