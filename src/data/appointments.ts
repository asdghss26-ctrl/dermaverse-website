/** Sample appointment data for the doctor dashboard.
 *  Kept entirely client-side; no backend or Firebase connection yet.
 *  Covers all three time slots and all three statuses.
 */

export type AppointmentStatus = "Pending" | "Accepted" | "Rejected";

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  concern: string;
  timeSlot: "Morning" | "Evening" | "Night";
  status: AppointmentStatus;
  message?: string;
}

/** Sample requests covering every combination we need. */
export const sampleAppointments: Appointment[] = [
  // Morning — 3 pending, 1 accepted, 1 rejected
  {
    id: "m1",
    patientName: "Anita Raghavan",
    phone: "073580 12345",
    concern: "Acne Treatment",
    timeSlot: "Morning",
    status: "Pending",
  },
  {
    id: "m2",
    patientName: "Brinda Suresh",
    phone: "073580 67890",
    concern: "Pigmentation & Chemical Peels",
    timeSlot: "Morning",
    status: "Accepted",
  },
  {
    id: "m3",
    patientName: "Chitra Kannan",
    phone: "073580 11223",
    concern: "Hair Fall & Scalp Care",
    timeSlot: "Morning",
    status: "Rejected",
  },
  {
    id: "m4",
    patientName: "Kavitha Ramesh",
    phone: "098451 22331",
    concern: "Mole Removal Consultation",
    timeSlot: "Morning",
    status: "Pending",
  },
  {
    id: "m5",
    patientName: "Lavanya Murthy",
    phone: "094432 78901",
    concern: "Skin Allergy Assessment",
    timeSlot: "Morning",
    status: "Pending",
  },
  // Evening — 2 pending, 1 accepted, 1 rejected
  {
    id: "e1",
    patientName: "Deepa Murugan",
    phone: "073580 22334",
    concern: "Laser Treatments",
    timeSlot: "Evening",
    status: "Pending",
  },
  {
    id: "e2",
    patientName: "Esha Prasad",
    phone: "073580 33445",
    concern: "Anti-Ageing & Fine Lines",
    timeSlot: "Evening",
    status: "Accepted",
  },
  {
    id: "e3",
    patientName: "Fiona Ashwin",
    phone: "073580 44556",
    concern: "Dermatosurgery",
    timeSlot: "Evening",
    status: "Rejected",
  },
  {
    id: "e4",
    patientName: "Priya Subramanian",
    phone: "087653 99210",
    concern: "Eczema Follow-up",
    timeSlot: "Evening",
    status: "Pending",
  },
  // Night — 2 pending, 1 accepted, 1 rejected
  {
    id: "n1",
    patientName: "Ganesh Venkatesh",
    phone: "073580 55667",
    concern: "Cosmetic & Aesthetic Dermatology",
    timeSlot: "Night",
    status: "Pending",
  },
  {
    id: "n2",
    patientName: "Hema Rangarajan",
    phone: "073580 66778",
    concern: "Paediatric Skin Care",
    timeSlot: "Night",
    status: "Accepted",
  },
  {
    id: "n3",
    patientName: "Irfan Patel",
    phone: "073580 77889",
    concern: "General Consultation",
    timeSlot: "Night",
    status: "Rejected",
  },
  {
    id: "n4",
    patientName: "Meenakshi Sundaram",
    phone: "096774 11234",
    concern: "Psoriasis Management",
    timeSlot: "Night",
    status: "Pending",
  },
];