import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Appointment } from "@/data/appointments";

const APPOINTMENTS_COLLECTION = "appointments";

/**
 * Creates a new appointment request in Cloud Firestore.
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

  if (isFirebaseConfigured()) {
    try {
      const docRef = await addDoc(
        collection(db, APPOINTMENTS_COLLECTION),
        newAppointmentData
      );
      return docRef.id;
    } catch (err) {
      console.error("Firestore write failed:", err);
      throw err;
    }
  }

  // Fallback ID for offline scenarios
  const fallbackId = `appt-${Date.now()}`;
  return fallbackId;
}

/**
 * Fetches all appointments once from Cloud Firestore.
 */
export async function getAppointments(): Promise<Appointment[]> {
  if (!isFirebaseConfigured()) return [];

  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => {
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
  } catch (err) {
    console.warn("Failed to fetch appointments:", err);
    return [];
  }
}

/**
 * Subscribes to real-time appointment updates from Cloud Firestore.
 * Returns an empty list when no appointments exist.
 */
export function subscribeAppointments(
  onUpdate: (appointments: Appointment[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!isFirebaseConfigured()) {
    onUpdate([]);
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
          onUpdate([]);
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
      },
      (err) => {
        console.warn("Firestore subscription error:", err);
        if (onError) onError(err);
        onUpdate([]);
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
  if (!isFirebaseConfigured()) return;

  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Failed to update Firestore doc:", err);
  }
}

/**
 * Deletes an appointment from Cloud Firestore.
 */
export async function deleteAppointment(id: string): Promise<void> {
  if (!isFirebaseConfigured()) return;

  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Failed to delete Firestore doc:", err);
  }
}
