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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

/**
 * Returns true if the required Firebase client environment variables are set.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  );
}

// Fallback configuration to prevent build-time crashes when .env.local is not yet populated
const fallbackConfig: FirebaseOptions = {
  apiKey: "mock-api-key-for-build",
  authDomain: "dermverse-website.firebaseapp.com",
  projectId: "dermverse-website",
  storageBucket: "dermverse-website.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000",
};

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
