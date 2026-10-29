import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

/**
 * Client-side Firebase configuration for Dermverse.
 * Reads public configuration parameters from Next.js environment variables.
 */
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDOl8JVU0bMlrDCkpHpJR0EFEHy_uYeysQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dermverse-website.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dermverse-website",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dermverse-website.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "122100457772",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:122100457772:web:0f074daa09b1ac2ff58c89",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-J4X7HZJDQ9",
};

/**
 * Returns true if the required Firebase client environment variables are set.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  );
}

// Fallback configuration to prevent build-time crashes
const fallbackConfig: FirebaseOptions = firebaseConfig;

/**
 * Single-instance Firebase App initialization.
 */
const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(isFirebaseConfigured() ? firebaseConfig : fallbackConfig);

/**
 * Single-instance Firebase Auth.
 */
const auth: Auth = getAuth(app);

/**
 * Single-instance Cloud Firestore (used for appointment collections and subscriptions).
 */
const db: Firestore = getFirestore(app);

/**
 * Browser-only Firebase Analytics (initialized only on the client side when supported).
 */
let analytics: Analytics | null = null;
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics unsupported in this browser environment
    });
}

export { app, auth, db, analytics };
