/**
 * Supporter Requests Screen
 * Live subscription to requests — works in both Firebase and local BroadcastChannel mode.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BabyCharacter from '../components/BabyCharacter';
import { subscribeToRequests, formatTime } from '../firebase/requests';
import '../styles/animations.css';

const isFirebaseMode = () => {
  const p = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return p && p !== 'REPLACE_ME' && p !== 'your_project_id_here';
};

export default function SupporterRequests() {
  const navigate  = useNavigate();
  const [requests, setRequests] = useState([]);
  const firebase  = isFirebaseMode();

  useEffect(() => {
    const unsub = subscribeToRequests((data) => {
      setRequests(data.filter((r) => r.status !== 'completed'));
    });
    return () => unsub?.();
  }, []);

  const pending  = requests.filter((r) => r.status === 'pending');
  const accepted = requests.filter((r) => r.status === 'accepted');

  return (
    <div className="screen" style={styles.screen}>

      {/* Decorative blob */}
      <div className="blob blob-lav" style={{ top: -60, right: -40, opacity: 0.35 }} />

      {/* Header */}
      <header className="animate-slide-up" style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Care Requests</h1>
          <p style={styles.subtitle}>Mom needs you 💛</p>
        </div>
        <BabyCharacter expression="asking" size={56} animate="float" />
      </header>

      {/* Mode badge */}
      <div className="animate-fade-in delay-200" style={firebase ? styles.liveBadge : styles.demoBadge}>
        {firebase
          ? '🟢 Live — Firebase connected'
          : '🔵 Local sync — two windows share requests instantly'}
      </div>

      {/* Requests list */}
      <div className="animate-slide-up delay-300" style={styles.listWrap}>

        {requests.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {pending.length > 0 && (
              <Section label="Waiting for you ✨" items={pending} navigate={navigate} />
            )}
            {accepted.length > 0 && (
              <Section label="In progress 💪" items={accepted} navigate={navigate} accent />
            )}
          </>
        )}

      </div>

      {/* Role switch */}
      <div style={styles.footer}>
        <button style={styles.switchRole} onClick={() => navigate('/role')}>
          Switch role
        </button>
      </div>

    </div>
  );
}

function Section({ label, items, navigate, accent }) {
  return (
    <div style={styles.section}>
      <p style={{ ...styles.sectionLabel, color: accent ? 'var(--color-coral)' : 'var(--color-text-soft)' }}>
        {label}
      </p>
      {items.map((req, i) => (
        <RequestItem
          key={req.id}
          request={req}
          index={i}
          onTap={() => navigate(`/supporter/details/${req.id}/${req.storyId}`)}
        />
      ))}
    </div>
  );
}

function RequestItem({ request, index, onTap }) {
  return (
    <button
      id={`request-${request.id}`}
      className="animate-slide-up"
      style={{ ...styles.requestCard, animationDelay: `${index * 80}ms` }}
      onClick={onTap}
      aria-label={`Request: ${request.situation}`}
    >
      {/* Pulse dot for pending */}
      {request.status === 'pending' && <div style={styles.pulseDot} />}

      <div style={styles.reqEmoji}>{request.emoji}</div>
      <div style={styles.reqInfo}>
        <p style={styles.reqTitle}>{request.situation}</p>
        <p style={styles.reqTime}>{formatTime(request.createdAt)}</p>
      </div>
      <div style={styles.reqStatus}>
        {request.status === 'accepted' ? (
          <span style={{ ...styles.statusBadge, background: '#C8EDD0', color: '#1A5A28' }}>
            In progress
          </span>
        ) : (
          <span style={{ ...styles.statusBadge, background: '#FFE5C0', color: '#7A4A00' }}>
            Needs help
          </span>
        )}
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div style={styles.emptyState}>
      <BabyCharacter expression="happy" size={88} animate="breathe" />
      <p style={styles.emptyTitle}>All good! 🌸</p>
      <p style={styles.emptySubtitle}>
        Waiting for Mom to send a request.
        <br />Open the Mom view in another tab!
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
    padding: 'var(--space-xl) var(--space-lg) var(--space-lg)',
    gap: 'var(--space-md)',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  headerLeft: {},
  title: {
    fontSize: 'var(--text-2xl)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
  },
  subtitle: {
    fontSize: 'var(--text-md)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
    marginTop: 4,
  },
  liveBadge: {
    background: 'rgba(200, 237, 200, 0.8)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px var(--space-md)',
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: '#1A5A28',
    textAlign: 'center',
    zIndex: 1,
  },
  demoBadge: {
    background: 'rgba(200, 220, 255, 0.8)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px var(--space-md)',
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: '#1A2A6A',
    textAlign: 'center',
    zIndex: 1,
  },
  listWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
    zIndex: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  sectionLabel: {
    fontSize: 'var(--text-sm)',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 4,
  },
  requestCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(8px)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-main)',
    boxShadow: 'var(--shadow-soft)',
    transition: 'transform var(--transition-bounce), box-shadow var(--transition-base)',
    width: '100%',
    textAlign: 'left',
    position: 'relative',
  },
  pulseDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--color-coral)',
    boxShadow: '0 0 0 0 rgba(244,147,122,0.6)',
    animation: 'ripple 1.5s ease-out infinite',
  },
  reqEmoji: {
    fontSize: 32,
    lineHeight: 1,
    flexShrink: 0,
  },
  reqInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  reqTitle: {
    fontSize: 'var(--text-md)',
    fontWeight: 800,
    color: 'var(--color-text-primary)',
  },
  reqTime: {
    fontSize: 'var(--text-xs)',
    color: 'var(--color-text-muted)',
    fontWeight: 600,
  },
  reqStatus: { flexShrink: 0 },
  statusBadge: {
    fontSize: 'var(--text-xs)',
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: 'var(--radius-full)',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-3xl) var(--space-lg)',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 'var(--text-xl)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
  },
  emptySubtitle: {
    fontSize: 'var(--text-md)',
    color: 'var(--color-text-soft)',
    fontWeight: 600,
    lineHeight: 1.6,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 'var(--space-sm)',
  },
  switchRole: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-main)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    fontWeight: 700,
    cursor: 'pointer',
    padding: '8px 16px',
  },
};
