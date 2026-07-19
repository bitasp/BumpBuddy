/**
 * Firebase Configuration — BumpBuddy
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project (e.g. "bumpbuddy-mvp")
 * 3. Add a Web App to the project
 * 4. Copy the config values below
 * 5. Enable Firestore Database (start in test mode for MVP)
 *
 * Data Model:
 * requests/{docId}: {
 *   storyId: string,        // e.g. "001"
 *   situation: string,      // e.g. "I'm Thirsty"
 *   emoji: string,          // e.g. "💧"
 *   status: "pending" | "accepted" | "completed",
 *   createdAt: Timestamp,
 *   acceptedAt: Timestamp | null,
 *   completedAt: Timestamp | null,
 * }
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ⚠️ Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "REPLACE_ME",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "REPLACE_ME",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "REPLACE_ME",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "REPLACE_ME",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| "REPLACE_ME",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "REPLACE_ME",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
