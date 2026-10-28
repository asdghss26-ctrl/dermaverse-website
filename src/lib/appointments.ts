import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Appointment, sampleAppointments } from "@/data/appointments";

const APPOINTMENTS_COLLECTION = "appointments";
const LOCAL_STORAGE_KEY = "dermverse-dashboard-apps";

/**
 * Creates a new appointment request in Cloud Firestore.
 * Falls back to local storage if Firebase is not yet reachable.
 */
export async function createAppointment(
  data: Omit<Appointment, "id">
): Promise<string> {
  const newAppointmentData = {
    patientName: data.patientName.trim(),
    phone: data.phone.trim(),
    concern: data.concern,
    timeSlot: data.timeSlot,
    status: data.status || "Pending",
    createdAt: serverTimestamp(),
  };

  // If Firebase is configured, attempt Firestore write
  if (isFirebaseConfigured()) {
    try {
      const docRef = await addDoc(
        collection(db, APPOINTMENTS_COLLECTION),
        newAppointmentData
      );
      return docRef.id;
    } catch (err) {
      console.warn("Firestore write failed, falling back to local storage:", err);
    }
  }

  // Local storage fallback for offline / development testing
  const fallbackId = `appt-${Date.now()}`;
  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: Appointment[] = existing ? JSON.parse(existing) : [];
    const record: Appointment = {
      ...data,
      id: fallbackId,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([record, ...list]));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(
      new CustomEvent("dermverse:appointment-added", { detail: record })
    );
  } catch {
    // Ignore storage errors
  }

  return fallbackId;
}

/**
 * Subscribes to real-time appointment updates from Cloud Firestore.
 * Automatically handles snapshot mapping and falls back gracefully to local data if needed.
 */
export function subscribeAppointments(
  onUpdate: (appointments: Appointment[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!isFirebaseConfigured()) {
    // Return sample or cached appointments if Firebase is not active
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        onUpdate(JSON.parse(stored));
      } else {
        onUpdate(sampleAppointments.map((a) => ({ ...a })));
      }
    } catch {
      onUpdate(sampleAppointments.map((a) => ({ ...a })));
    }
    return () => {};
  }

  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore collection has no documents yet, check local storage or sample data
          try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
              const parsed = JSON.parse(stored);
              if (Array.isArray(parsed) && parsed.length > 0) {
                onUpdate(parsed);
                return;
              }
            }
          } catch {
            // Ignore
          }
          onUpdate(sampleAppointments.map((a) => ({ ...a })));
          return;
        }

        const items: Appointment[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            patientName: d.patientName || "Anonymous",
            phone: d.phone || "",
            concern: d.concern || "General Consultation",
            timeSlot: d.timeSlot || "Morning",
            status: d.status || "Pending",
          };
        });

        onUpdate(items);

        // Also sync local cache
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
        } catch {
          // Ignore
        }
      },
      (err) => {
        console.warn("Firestore subscription error:", err);
        if (onError) onError(err);

        // Fallback to local storage on permission or network error
        try {
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (stored) {
            onUpdate(JSON.parse(stored));
          } else {
            onUpdate(sampleAppointments.map((a) => ({ ...a })));
          }
        } catch {
          onUpdate(sampleAppointments.map((a) => ({ ...a })));
        }
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Failed to subscribe to Firestore:", err);
    if (onError && err instanceof Error) onError(err);
    return () => {};
  }
}

/**
 * Updates an appointment's status (Accepted, Rejected, Pending) in Cloud Firestore.
 */
export async function updateAppointmentStatus(
  id: string,
  status: Appointment["status"]
): Promise<void> {
  if (isFirebaseConfigured() && !id.startsWith("appt-") && !id.startsWith("m") && !id.startsWith("e") && !id.startsWith("n")) {
    try {
      const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp(),
      });
      return;
    } catch (err) {
      console.warn("Failed to update Firestore doc, updating local cache:", err);
    }
  }

  // Update local storage for demo or fallback items
  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (existing) {
      const list: Appointment[] = JSON.parse(existing);
      const updated = list.map((a) => (a.id === id ? { ...a, status } : a));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }
}

/**
 * Deletes an appointment from Cloud Firestore.
 */
export async function deleteAppointment(id: string): Promise<void> {
  if (isFirebaseConfigured() && !id.startsWith("appt-") && !id.startsWith("m") && !id.startsWith("e") && !id.startsWith("n")) {
    try {
      const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
      await deleteDoc(docRef);
      return;
    } catch (err) {
      console.warn("Failed to delete Firestore doc, updating local cache:", err);
    }
  }

  // Update local storage
  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (existing) {
      const list: Appointment[] = JSON.parse(existing);
      const filtered = list.filter((a) => a.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch {
    // Ignore
  }
}
