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

export function normalizeTimeSlot(raw: unknown): "Morning" | "Evening" | "Night" {
  if (typeof raw !== "string") return "Morning";
  const s = raw.toLowerCase();
  if (s.includes("slot 1") || s.includes("morning") || s.includes("10")) return "Morning";
  if (s.includes("slot 2") || s.includes("afternoon") || s.includes("2pm") || (s.includes("evening") && !s.includes("8") && !s.includes("5pm"))) return "Evening";
  if (s.includes("slot 3") || s.includes("night") || s.includes("8pm") || s.includes("5pm")) return "Night";
  if (s === "evening") return "Evening";
  if (s === "night") return "Night";
  return "Morning";
}

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
    ...(data.message ? { message: data.message.trim() } : {}),
    status: data.status || "Pending",
    createdAt: serverTimestamp(),
  };

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

/**
 * Fetches all appointments once from Cloud Firestore.
 */
export async function getAppointments(): Promise<Appointment[]> {
  try {
    const snapshot = await getDocs(collection(db, APPOINTMENTS_COLLECTION));
    const items: Appointment[] = snapshot.docs.map((docSnap) => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        patientName: d.patientName || "Anonymous",
        phone: d.phone || "",
        concern: d.concern || "General Consultation",
        timeSlot: normalizeTimeSlot(d.timeSlot),
        status: d.status || "Pending",
        message: d.message || "",
        createdAt: d.createdAt,
      };
    });

    items.sort((a: any, b: any) => {
      const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
      const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
      return tB - tA;
    });

    return items;
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
  try {
    const unsubscribe = onSnapshot(
      collection(db, APPOINTMENTS_COLLECTION),
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
            timeSlot: normalizeTimeSlot(d.timeSlot),
            status: d.status || "Pending",
            message: d.message || "",
            createdAt: d.createdAt,
          };
        });

        items.sort((a: any, b: any) => {
          const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
          const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
          return tB - tA;
        });

        onUpdate(items);
      },
      (err) => {
        console.warn("Firestore subscription error:", err);
        if (onError) onError(err);
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
