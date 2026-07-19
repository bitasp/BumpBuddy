/**
 * EffectsOverlay — Floating hearts, sparkles, and confetti
 * Triggered on completion/celebration events.
 * Uses pure CSS animations — no JS dependencies.
 */

import { useEffect, useState } from 'react';

const HEART_COLORS = ['#F4937A', '#FFB4A8', '#FF8FAB', '#FFD6D6', '#FFCBA4'];
const SPARKLE_COLORS = ['#FFE5A0', '#D4C5F9', '#B8D4BE', '#F4937A', '#FFCBA4'];
const CONFETTI_COLORS = ['#F4937A', '#D4C5F9', '#B8D4BE', '#FFE5A0', '#FFCBA4', '#FFD6D6', '#B8D0E8'];

function FloatingHeart({ color, left, delay, duration }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `${left}%`,
        bottom: '20%',
        fontSize: '24px',
        animation: `heartFloat ${duration}s ease-out ${delay}s both`,
        opacity: 0,
        pointerEvents: 'none',
        color,
        filter: 'drop-shadow(0 2px 6px rgba(244,147,122,0.4))',
      }}
    >
      ❤️
    </div>
  );
}

function Sparkle({ color, left, top, delay, size }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        animation: `sparkleBurst 1s ease-out ${delay}s both`,
        pointerEvents: 'none',
        opacity: 0,
      }}
    />
  );
}

function ConfettiPiece({ color, left, delay, duration, size }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: '-20px',
        width: size,
        height: size * 0.6,
        borderRadius: '2px',
        background: color,
        animation: `confettiFall ${duration}s ease-in ${delay}s both`,
        pointerEvents: 'none',
        opacity: 0,
      }}
    />
  );
}

export default function EffectsOverlay({ type = 'hearts', trigger = false }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const count = type === 'confetti' ? 24 : 12;
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 10 + Math.random() * 60,
      delay: Math.random() * 0.8,
      duration: 1.2 + Math.random() * 1.2,
      size: type === 'confetti' ? 8 + Math.random() * 8 : 6 + Math.random() * 10,
      color:
        type === 'confetti'
          ? CONFETTI_COLORS[i % CONFETTI_COLORS.length]
          : type === 'sparkles'
          ? SPARKLE_COLORS[i % SPARKLE_COLORS.length]
          : HEART_COLORS[i % HEART_COLORS.length],
    }));
    setItems(generated);

    const timer = setTimeout(() => setItems([]), 3000);
    return () => clearTimeout(timer);
  }, [trigger, type]);

  if (!items.length) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {items.map((item) =>
        type === 'hearts' ? (
          <FloatingHeart key={item.id} {...item} />
        ) : type === 'confetti' ? (
          <ConfettiPiece key={item.id} {...item} />
        ) : (
          <Sparkle key={item.id} {...item} />
        )
      )}
    </div>
  );
}
