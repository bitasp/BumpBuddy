/**
 * BumpBuddy Local Sync — BroadcastChannel fallback
 * When Firebase isn't configured, this lets two browser windows/tabs
 * on the same machine sync requests in real-time via BroadcastChannel API.
 *
 * This is ONLY used when Firebase credentials aren't set (demo mode).
 */

const CHANNEL_NAME = 'bumpbuddy_requests';
const STORAGE_KEY  = 'bb_requests';

// Get all requests from localStorage
const getLocalRequests = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

// Save requests to localStorage
const saveLocalRequests = (requests) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

// Generate a simple ID
const genId = () => `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/**
 * Create a request (local)
 */
export const createLocalRequest = (story) => {
  const request = {
    id:          genId(),
    storyId:     story.id,
    situation:   story.label,
    emoji:       story.emoji,
    babyLine:    story.babyLine,
    status:      'pending',
    createdAt:   Date.now(),
    acceptedAt:  null,
    completedAt: null,
  };

  const all = getLocalRequests();
  all.unshift(request);
  saveLocalRequests(all);

  // Broadcast to other windows
  try {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ type: 'NEW_REQUEST', request });
    channel.close();
  } catch {}

  return request.id;
};

/**
 * Accept a request (local)
 */
export const acceptLocalRequest = (requestId) => {
  const all = getLocalRequests();
  const idx = all.findIndex((r) => r.id === requestId);
  if (idx !== -1) {
    all[idx].status     = 'accepted';
    all[idx].acceptedAt = Date.now();
    saveLocalRequests(all);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'REQUEST_ACCEPTED', requestId });
      channel.close();
    } catch {}
  }
};

/**
 * Complete a request (local)
 */
export const completeLocalRequest = (requestId) => {
  const all = getLocalRequests();
  const idx = all.findIndex((r) => r.id === requestId);
  if (idx !== -1) {
    all[idx].status      = 'completed';
    all[idx].completedAt = Date.now();
    saveLocalRequests(all);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'REQUEST_COMPLETED', requestId });
      channel.close();
    } catch {}
  }
};

/**
 * Subscribe to requests (local) — uses BroadcastChannel + localStorage polling
 * Returns an unsubscribe function.
 */
export const subscribeLocalRequests = (callback) => {
  // Initial load
  callback(getLocalRequests());

  // Listen for broadcasts from other windows
  let channel;
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = () => {
      callback(getLocalRequests());
    };
  } catch {}

  // Also poll every 2s as a safety net (for Safari / older browsers)
  const interval = setInterval(() => {
    callback(getLocalRequests());
  }, 2000);

  return () => {
    channel?.close();
    clearInterval(interval);
  };
};

/**
 * Format a local timestamp (ms) to relative time string
 */
export const formatLocalTime = (timestamp) => {
  if (!timestamp) return 'just now';
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60)   return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)} hr ago`;
};
