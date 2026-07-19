/**
 * Asset path helpers — maps story data to real file paths
 * All assets live in /assets/ at the project root
 * Vite serves them via the public alias configured in vite.config.js
 */

// Baby expressions
export const getBabyExpression = (expression) => {
  const map = {
    asking:   '/characters/baby/expressions/baby_asking_v1.png',
    eating:   '/characters/baby/expressions/baby_eating_v1.png',
    excited:  '/characters/baby/expressions/baby_excited_v1.png',
    happy:    '/characters/baby/expressions/baby_happy_v1.png',
    sleepy:   '/characters/baby/expressions/baby_sleepy_v1.png',
    thankful: '/characters/baby/expressions/baby_thankful_v1.png',
  };
  return map[expression] || map['happy'];
};

// Baby master
export const BABY_MASTER = '/characters/baby/master/baby_master_v1.png';

// Mom master (fallback)
export const MOM_MASTER = '/characters/mom/master/mom_master_v1.png';

// Mom expressions — all 6 real files
export const getMomExpression = (expression) => {
  const map = {
    happy:     '/characters/mom/expressions/mom_happy_v1.png',
    relaxed:   '/characters/mom/expressions/mom_relaxed_v1.png',
    sleepy:    '/characters/mom/expressions/mom_sleepy_v1.png',
    tired:     '/characters/mom/expressions/mom_tired_v1.png',
    emotional: '/characters/mom/expressions/mom_emotional_v1.png',
    surprised: '/characters/mom/expressions/mom_surprised_v1.png',
    // aliases
    thirsty:   '/characters/mom/expressions/mom_tired_v1.png',
    hungry:    '/characters/mom/expressions/mom_relaxed_v1.png',
    rest:      '/characters/mom/expressions/mom_sleepy_v1.png',
    walk:      '/characters/mom/expressions/mom_happy_v1.png',
    medicine:  '/characters/mom/expressions/mom_relaxed_v1.png',
    hug:       '/characters/mom/expressions/mom_emotional_v1.png',
    music:     '/characters/mom/expressions/mom_happy_v1.png',
    reading:   '/characters/mom/expressions/mom_relaxed_v1.png',
    sleep:     '/characters/mom/expressions/mom_sleepy_v1.png',
    doctor:    '/characters/mom/expressions/mom_surprised_v1.png',
    kick:      '/characters/mom/expressions/mom_surprised_v1.png',
    celebrate: '/characters/mom/expressions/mom_happy_v1.png',
  };
  return map[expression] || map['relaxed'];
};

// Partner master
export const PARTNER_MASTER = '/characters/partner/master/partner_master_v1.png';

// Partner expressions
export const getPartnerExpression = (expression) => {
  const map = {
    calm:      '/characters/partner/expressions/partner_calm_v1.png',
    concerned: '/characters/partner/expressions/partner_concerned_v1.png',
    happy:     '/characters/partner/expressions/partner_happy_v1.png',
    laughing:  '/characters/partner/expressions/partner_laughing_v1.png',
    proud:     '/characters/partner/expressions/partner_proud_v1.png',
    surprised: '/characters/partner/expressions/partner_surprised_v1.png',
  };
  return map[expression] || map['happy'];
};

// Props
export const getProp = (category, file) => {
  if (!category || !file) return null;
  const categoryMap = {
    water:      'water',
    food:       'food',
    comfort:    'comfort',
    health:     'health',
    activities: 'activities',
  };
  const folder = categoryMap[category];
  if (!folder) return null;
  return `/props/${folder}/${file}.png`;
};
