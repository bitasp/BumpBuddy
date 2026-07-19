/**
 * BumpBuddy Request API
 *
 * Automatically uses Firebase Firestore when credentials are configured,
 * or falls back to BroadcastChannel + localStorage for two-window local testing.
 */

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import {
  createLocalRequest,
  acceptLocalRequest,
  completeLocalRequest,
  subscribeLocalRequests,
  formatLocalTime,
} from './localSync';

const REQUESTS_COLLECTION = 'requests';

// Detect if Firebase is configured (not placeholder values)
const isFirebaseConfigured = () => {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return projectId && projectId !== 'REPLACE_ME' && projectId !== 'your_project_id_here';
};

/**
 * Create a new support request
 * Uses Firebase if configured, otherwise BroadcastChannel local sync
 */
export const createRequest = async (story) => {
  if (!isFirebaseConfigured()) {
    console.info('🔔 Demo mode: using local BroadcastChannel sync');
    return createLocalRequest(story);
  }

  const ref = await addDoc(collection(db, REQUESTS_COLLECTION), {
    storyId:     story.id,
    situation:   story.label,
    emoji:       story.emoji,
    babyLine:    story.babyLine,
    status:      'pending',
    createdAt:   serverTimestamp(),
    acceptedAt:  null,
    completedAt: null,
  });
  return ref.id;
};

/**
 * Supporter accepts a request
 */
export const acceptRequest = async (requestId) => {
  if (!isFirebaseConfigured()) {
    acceptLocalRequest(requestId);
    return;
  }
  await updateDoc(doc(db, REQUESTS_COLLECTION, requestId), {
    status:     'accepted',
    acceptedAt: serverTimestamp(),
  });
};

/**
 * Supporter completes a request
 */
export const completeRequest = async (requestId) => {
  if (!isFirebaseConfigured()) {
    completeLocalRequest(requestId);
    return;
  }
  await updateDoc(doc(db, REQUESTS_COLLECTION, requestId), {
    status:      'completed',
    completedAt: serverTimestamp(),
  });
};

/**
 * Subscribe to all active requests (pending + accepted)
 * Returns an unsubscribe function
 */
export const subscribeToRequests = (callback) => {
  if (!isFirebaseConfigured()) {
    console.info('🔔 Demo mode: subscribing via BroadcastChannel');
    return subscribeLocalRequests(callback);
  }

  const q = query(
    collection(db, REQUESTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(requests);
  });
};

/**
 * Format a timestamp to a relative time string
 * Works for both Firestore Timestamps and local ms timestamps
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return 'just now';

  // Firestore Timestamp
  if (typeof timestamp?.toDate === 'function') {
    const diff = Math.floor((Date.now() - timestamp.toDate().getTime()) / 1000);
    if (diff < 60)   return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return `${Math.floor(diff / 3600)} hr ago`;
  }

  // Local ms timestamp
  return formatLocalTime(timestamp);
};
