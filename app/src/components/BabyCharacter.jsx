/**
 * BabyCharacter — The Dumpling Baby
 * The emotional narrator of BumpBuddy.
 * Always floats gently. Never leaves the tummy window.
 */

import { getBabyExpression, BABY_MASTER } from '../utils/assets';
import '../styles/animations.css';

export default function BabyCharacter({
  expression = 'happy',
  size = 80,
  animate = 'float',   // 'float' | 'bounce' | 'breathe' | 'wave' | 'none'
  className = '',
  style = {},
}) {
  const src = expression === 'master' ? BABY_MASTER : getBabyExpression(expression);

  const animClass = {
    float:   'animate-float',
    bounce:  'animate-bounce',
    breathe: 'animate-breathe',
    wave:    'animate-wave',
    none:    '',
  }[animate] || 'animate-float';

  return (
    <img
      src={src}
      alt={`Dumpling Baby — ${expression}`}
      width={size}
      height={size}
      className={`${animClass} ${className}`}
      style={{
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 12px rgba(244, 147, 122, 0.25))',
        ...style,
      }}
      draggable={false}
    />
  );
}
