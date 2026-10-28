"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Appointment } from "@/data/appointments";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  subscribeAppointments,
  updateAppointmentStatus,
  deleteAppointment as deleteFirestoreAppointment,
  createAppointment as createFirestoreAppointment,
} from "@/lib/appointments";
import {
  Search,
  LayoutDashboard,
  CalendarCheck,
  LogOut,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  Sun,
  Sunset,
  Moon,
  User,
  Phone,
  Menu,
  X,
  Plus,
  Trash2,
  RotateCcw,
  ExternalLink,
  RefreshCw,
  Columns3,
  ListFilter,
  Check,
  Lock,
  Loader2,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const T = {
  bg: "#F3F6FA",
  sidebar: "#14283F",
  sidebarHover: "#1B3550",
  sidebarActive: "#0F766E",
  surface: "#FFFFFF",
  heading: "#172B42",
  body: "#43556B",
  secondary: "#63758A",
  border: "#D9E2EC",
  accent: "#0F766E",
  accentLight: "#E6F4F3",
  white: "#FFFFFF",
  pending: { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  accepted: { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  rejected: { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
} as const;

type TimeSlot = "Morning" | "Evening" | "Night";
type StatusFilter = "All" | "Pending" | "Accepted" | "Rejected";
type ViewMode = "kanban" | "table";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function countByStatus(appointments: Appointment[]) {
  const counts = { total: 0, pending: 0, accepted: 0, rejected: 0 };
  for (const a of appointments) {
    counts.total++;
    if (a.status === "Pending") counts.pending++;
    else if (a.status === "Accepted") counts.accepted++;
    else if (a.status === "Rejected") counts.rejected++;
  }
  return counts;
}

const COMMON_CONCERNS = [
  "Acne Treatment",
  "Pigmentation & Chemical Peels",
  "Cosmetic & Aesthetic Dermatology",
  "Paediatric Skin Care",
  "Dermatosurgery",
  "Anti-Ageing & Fine Lines",
  "Hair Fall & Scalp Care",
  "Non-Surgical Hair Loss Care",
  "Laser Treatments",
  "Mole Removal Consultation",
  "Skin Allergy Assessment",
  "Eczema Follow-up",
  "Psoriasis Management",
  "General Consultation",
];

/* ------------------------------------------------------------------ */
/*  Doctor Login Screen                                                */
/* ------------------------------------------------------------------ */

interface DoctorLoginViewProps {
  onSuccess: (user: FirebaseUser) => void;
}

function DoctorLoginView({ onSuccess }: DoctorLoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      onSuccess(userCredential.user);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Invalid email or password. Please verify credentials.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: T.bg }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Brand Header */}
        <div
          className="p-8 text-center text-white"
          style={{ backgroundColor: T.sidebar }}
        >
          <div
            className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center font-bold text-lg mb-3 shadow-md"
            style={{ backgroundColor: T.accent, color: T.white }}
          >
            D
          </div>
          <h1 className="text-xl font-bold tracking-tight">Dermverse Clinic</h1>
          <p className="text-xs text-slate-300 mt-1 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Doctor & Administration Portal
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5" autoComplete="off">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
              <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Doctor Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@dermverse.com"
                autoComplete="off"
                className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-white font-semibold text-sm cursor-pointer shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            style={{ backgroundColor: T.accent }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Sign In to Dashboard
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              Return to Public Clinic Website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onLogout: () => void;
}

function Sidebar({
  open,
  onClose,
  activeView,
  onSelectView,
  onLogout,
}: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        style={{ backgroundColor: T.sidebar }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col",
          "transition-transform duration-200 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Branding */}
        <div className="flex h-[56px] items-center gap-2.5 px-5 shrink-0 border-b border-[#1E3A5A]">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
            style={{ backgroundColor: T.accent, color: T.white }}
          >
            D
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-[11px] font-medium uppercase tracking-widest"
              style={{ color: "#94A3B8" }}
            >
              Dermverse
            </span>
            <span
              className="text-[13px] font-semibold"
              style={{ color: T.white }}
            >
              Doctor Admin
            </span>
          </div>

          <button
            className="ml-auto lg:hidden p-1 rounded"
            style={{ color: "#94A3B8" }}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mt-4 flex-1 px-3 space-y-1">
          <button
            onClick={() => {
              onSelectView("kanban");
              onClose();
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors cursor-pointer text-left",
              activeView === "kanban" ? "shadow-sm" : ""
            )}
            style={{
              backgroundColor: activeView === "kanban" ? T.sidebarActive : "transparent",
              color: activeView === "kanban" ? T.white : "#94A3B8",
            }}
          >
            <Columns3 className="h-[18px] w-[18px] shrink-0" />
            Time Slot Columns
          </button>

          <button
            onClick={() => {
              onSelectView("table");
              onClose();
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors cursor-pointer text-left",
              activeView === "table" ? "shadow-sm" : ""
            )}
            style={{
              backgroundColor: activeView === "table" ? T.sidebarActive : "transparent",
              color: activeView === "table" ? T.white : "#94A3B8",
            }}
          >
            <ListFilter className="h-[18px] w-[18px] shrink-0" />
            All Appointments Table
          </button>

          <div className="pt-4 pb-2 px-3 text-[10px] font-semibold tracking-wider text-[#64748B] uppercase">
            Quick Links
          </div>

          <Link
            href="/appointment"
            target="_blank"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium text-[#94A3B8] hover:text-white hover:bg-[#1B3550] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <CalendarCheck className="h-4 w-4" />
              Patient Booking Form
            </span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium text-[#94A3B8] hover:text-white hover:bg-[#1B3550] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <LayoutDashboard className="h-4 w-4" />
              Public Website
            </span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </nav>

        {/* Doctor Info & Logout */}
        <div className="p-3 border-t border-[#1E3A5A] space-y-1">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-[#1B3550] transition-colors cursor-pointer text-left"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-[#94A3B8] hover:text-white hover:bg-[#1B3550] transition-colors"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Exit Dashboard
          </Link>
        </div>
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Top bar                                                            */
/* ------------------------------------------------------------------ */

interface TopBarProps {
  onMenuClick: () => void;
  onOpenAddModal: () => void;
  onResetData: () => void;
  userEmail?: string | null;
}

function TopBar({
  onMenuClick,
  onOpenAddModal,
  onResetData,
  userEmail,
}: TopBarProps) {
  return (
    <header
      className="flex h-[56px] items-center justify-between shrink-0 px-4 lg:px-6 border-b"
      style={{
        backgroundColor: T.surface,
        borderColor: T.border,
      }}
    >
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-1.5 rounded-md cursor-pointer hover:bg-slate-100"
          style={{ color: T.body }}
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1
            className="text-base font-semibold leading-tight"
            style={{
              color: T.heading,
              fontFamily:
                'var(--font-jost), "Inter", system-ui, -apple-system, sans-serif',
            }}
          >
            Doctor Dashboard
          </h1>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Dr. Jansi&apos;s Dermverse Clinic &bull; Live Cloud Database
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onResetData}
          title="Restore sample demo appointments"
          className="flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px] font-medium transition-colors hover:bg-slate-50 cursor-pointer"
          style={{ borderColor: T.border, color: T.secondary }}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Refresh</span>
        </button>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold text-white cursor-pointer shadow-sm hover:opacity-95 transition-opacity"
          style={{ backgroundColor: T.accent }}
        >
          <Plus className="h-4 w-4" />
          <span>New Appointment</span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
            style={{ backgroundColor: T.accent, color: T.white }}
            title={userEmail || "Dr. Jansi"}
          >
            <User className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
            {userEmail ? userEmail.split("@")[0] : "Dr. Jansi"}
          </span>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Summary card (Interactive)                                         */
/* ------------------------------------------------------------------ */

interface SummaryCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  accentColor?: string;
  isActive: boolean;
  onClick: () => void;
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  accentColor,
  isActive,
  onClick,
}: SummaryCardProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "rounded-lg border px-4 py-3 flex items-center gap-3.5 transition-all cursor-pointer text-left w-full",
        isActive
          ? "ring-2 ring-offset-1 shadow-sm"
          : "hover:border-slate-400 hover:shadow-xs"
      )}
      style={{
        backgroundColor: T.surface,
        borderColor: isActive ? accentColor || T.accent : T.border,
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg shrink-0"
        style={{
          backgroundColor: accentColor ? `${accentColor}18` : T.accentLight,
          color: accentColor || T.accent,
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p
          className="text-[11px] font-medium uppercase tracking-wider"
          style={{ color: T.secondary }}
        >
          {label}
        </p>
        <p
          className="text-2xl font-bold leading-tight"
          style={{ color: accentColor || T.heading }}
        >
          {value}
        </p>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const styles = {
    Pending: { bg: T.pending.bg, color: T.pending.text, border: T.pending.border },
    Accepted: { bg: T.accepted.bg, color: T.accepted.text, border: T.accepted.border },
    Rejected: { bg: T.rejected.bg, color: T.rejected.text, border: T.rejected.border },
  };
  const s = styles[status] || styles.Pending;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold shrink-0"
      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Appointment card (Kanban)                                          */
/* ------------------------------------------------------------------ */

interface AppointmentCardProps {
  appointment: Appointment;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onRevert: (id: string) => void;
  onDelete: (id: string) => void;
}

function AppointmentCard({
  appointment,
  onAccept,
  onReject,
  onRevert,
  onDelete,
}: AppointmentCardProps) {
  return (
    <div
      className="rounded-lg border p-3.5 transition-shadow hover:shadow-md bg-white flex flex-col justify-between"
      style={{ borderColor: T.border }}
    >
      <div>
        {/* Row 1: Name + Status */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <p
            className="text-[14px] font-semibold leading-snug break-words min-w-0"
            style={{ color: T.heading }}
          >
            {appointment.patientName}
          </p>
          <StatusBadge status={appointment.status} />
        </div>

        {/* Row 2: Concern */}
        <p
          className="text-[13px] leading-relaxed break-words mb-2 font-medium"
          style={{ color: T.body }}
        >
          {appointment.concern}
        </p>

        {/* Row 3: Phone */}
        <div className="flex items-center justify-between text-[12px] mb-3">
          <div className="flex items-center gap-1.5" style={{ color: T.secondary }}>
            <Phone className="h-3 w-3 shrink-0" />
            <a
              href={`tel:${appointment.phone.replace(/\s+/g, "")}`}
              className="hover:underline"
            >
              {appointment.phone}
            </a>
          </div>

          <button
            onClick={() => onDelete(appointment.id)}
            className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
            title="Delete request"
            aria-label="Delete appointment"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Row 4: Actions based on status */}
      <div className="pt-2 border-t border-slate-100">
        {appointment.status === "Pending" && (
          <div className="flex gap-2">
            <button
              onClick={() => onAccept(appointment.id)}
              className="flex-1 rounded-md py-1.5 text-[12px] font-semibold cursor-pointer transition-opacity hover:opacity-90 flex items-center justify-center gap-1 text-white shadow-xs"
              style={{ backgroundColor: "#059669" }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Accept
            </button>
            <button
              onClick={() => onReject(appointment.id)}
              className="flex-1 rounded-md py-1.5 text-[12px] font-semibold cursor-pointer transition-opacity hover:opacity-90 flex items-center justify-center gap-1 text-white shadow-xs"
              style={{ backgroundColor: "#DC2626" }}
            >
              <XCircle className="h-3.5 w-3.5" />
              Reject
            </button>
          </div>
        )}

        {appointment.status === "Accepted" && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <Check className="h-3.5 w-3.5" /> Confirmed
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => onRevert(appointment.id)}
                className="text-[11px] font-semibold px-2 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                title="Move back to pending"
              >
                Revert
              </button>
              <button
                onClick={() => onReject(appointment.id)}
                className="text-[11px] font-semibold px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                title="Cancel or reject"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {appointment.status === "Rejected" && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-red-700 font-medium flex items-center gap-1">
              <X className="h-3.5 w-3.5" /> Declined
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => onRevert(appointment.id)}
                className="text-[11px] font-semibold px-2 py-1 rounded border border-amber-200 text-amber-700 hover:bg-amber-50 cursor-pointer flex items-center gap-1"
                title="Re-open request"
              >
                <RotateCcw className="h-3 w-3" /> Re-open
              </button>
              <button
                onClick={() => onAccept(appointment.id)}
                className="text-[11px] font-semibold px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Time-slot column                                                   */
/* ------------------------------------------------------------------ */

const SLOT_META: Record<TimeSlot, { icon: React.ElementType; label: string }> = {
  Morning: { icon: Sun, label: "Morning" },
  Evening: { icon: Sunset, label: "Evening" },
  Night: { icon: Moon, label: "Night" },
};

interface SlotColumnProps {
  slot: TimeSlot;
  appointments: Appointment[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onRevert: (id: string) => void;
  onDelete: (id: string) => void;
}

function SlotColumn({
  slot,
  appointments,
  onAccept,
  onReject,
  onRevert,
  onDelete,
}: SlotColumnProps) {
  const { icon: SlotIcon, label } = SLOT_META[slot];

  return (
    <div
      className="rounded-lg border flex flex-col min-h-0 bg-slate-50/60"
      style={{ borderColor: T.border }}
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0 bg-white rounded-t-lg"
        style={{ borderColor: T.border }}
      >
        <div className="flex items-center gap-2">
          <SlotIcon className="h-4 w-4" style={{ color: T.accent }} />
          <span
            className="text-[13px] font-semibold"
            style={{ color: T.heading }}
          >
            {label}
          </span>
        </div>
        <span
          className="flex h-5 min-w-5 items-center justify-center rounded-full px-2 text-[11px] font-bold"
          style={{ backgroundColor: T.accentLight, color: T.accent }}
        >
          {appointments.length}
        </span>
      </div>

      {/* Cards list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-[220px]">
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <SlotIcon className="h-8 w-8 mb-2 opacity-30" style={{ color: T.secondary }} />
            <p className="text-[13px] font-medium text-slate-500">
              No {label.toLowerCase()} appointments
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Requests matching current filter will appear here
            </p>
          </div>
        ) : (
          appointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onAccept={onAccept}
              onReject={onReject}
              onRevert={onRevert}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Add Appointment Modal                                              */
/* ------------------------------------------------------------------ */

interface AddAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (appt: Omit<Appointment, "id">) => void;
}

function AddAppointmentModal({ open, onClose, onAdd }: AddAppointmentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState(COMMON_CONCERNS[0]);
  const [timeSlot, setTimeSlot] = useState<TimeSlot>("Morning");
  const [status, setStatus] = useState<Appointment["status"]>("Pending");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide patient name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please provide phone number.");
      return;
    }

    onAdd({
      patientName: name.trim(),
      phone: phone.trim(),
      concern,
      timeSlot,
      status,
    });

    setName("");
    setPhone("");
    setConcern(COMMON_CONCERNS[0]);
    setTimeSlot("Morning");
    setStatus("Pending");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl border max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-3.5 border-b bg-slate-50">
          <h3 className="font-semibold text-slate-900 text-sm">Add New Appointment</h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-sm">
          {error && (
            <div className="p-2.5 rounded bg-red-50 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Patient Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 098401 23456"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Concern / Treatment *
            </label>
            <select
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 bg-white"
            >
              {COMMON_CONCERNS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value as TimeSlot)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 bg-white"
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Appointment["status"])}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-teal-700 text-white hover:bg-teal-800 cursor-pointer font-semibold shadow-xs"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main dashboard                                                     */
/* ------------------------------------------------------------------ */

export default function AdminDashboard() {
  /* -- Auth State --------------------------------------------------- */
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(() => isFirebaseConfigured());

  /* -- Dashboard State ---------------------------------------------- */
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show transient toast feedback
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // Real-time Firestore subscription when logged in
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeAppointments(
      (items) => {
        setAppointments(items);
      },
      (err) => {
        console.warn("Firestore subscription error:", err);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  /* -- Actions ------------------------------------------------------ */
  const handleAccept = useCallback(
    async (id: string) => {
      setAppointments((cur) => {
        const target = cur.find((a) => a.id === id);
        if (target) showToast(`Accepted: ${target.patientName}`);
        return cur.map((a) =>
          a.id === id ? { ...a, status: "Accepted" as const } : a
        );
      });
      await updateAppointmentStatus(id, "Accepted");
    },
    [showToast]
  );

  const handleReject = useCallback(
    async (id: string) => {
      setAppointments((cur) => {
        const target = cur.find((a) => a.id === id);
        if (target) showToast(`Declined: ${target.patientName}`);
        return cur.map((a) =>
          a.id === id ? { ...a, status: "Rejected" as const } : a
        );
      });
      await updateAppointmentStatus(id, "Rejected");
    },
    [showToast]
  );

  const handleRevert = useCallback(
    async (id: string) => {
      setAppointments((cur) => {
        const target = cur.find((a) => a.id === id);
        if (target) showToast(`Reverted ${target.patientName} to Pending`);
        return cur.map((a) =>
          a.id === id ? { ...a, status: "Pending" as const } : a
        );
      });
      await updateAppointmentStatus(id, "Pending");
    },
    [showToast]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      setAppointments((cur) => {
        const target = cur.find((a) => a.id === id);
        if (target) showToast(`Deleted: ${target.patientName}`);
        return cur.filter((a) => a.id !== id);
      });
      await deleteFirestoreAppointment(id);
    },
    [showToast]
  );

  const handleAddAppointment = useCallback(
    async (newApptData: Omit<Appointment, "id">) => {
      const generatedId = await createFirestoreAppointment(newApptData);
      const newAppt: Appointment = {
        ...newApptData,
        id: generatedId,
      };
      setAppointments((cur) => [newAppt, ...cur]);
      showToast(`Added appointment for ${newAppt.patientName}`);
    },
    [showToast]
  );

  const handleResetData = useCallback(() => {
    setAppointments([]);
    showToast("All local appointments cleared");
  }, [showToast]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      showToast("Signed out of Doctor Dashboard");
    } catch {
      // ignore
    }
  }, [showToast]);

  /* -- Derived data ------------------------------------------------- */
  const summary = useMemo(() => countByStatus(appointments), [appointments]);

  const filteredAppointments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let list = appointments;

    // Status filter
    if (statusFilter !== "All") {
      list = list.filter((a) => a.status === statusFilter);
    }

    // Search filter across name, phone, concern
    if (q) {
      list = list.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.phone.toLowerCase().includes(q) ||
          a.concern.toLowerCase().includes(q)
      );
    }

    return list;
  }, [appointments, statusFilter, searchQuery]);

  const displayGroups = useMemo(() => {
    const groups: Record<TimeSlot, Appointment[]> = {
      Morning: [],
      Evening: [],
      Night: [],
    };

    for (const a of filteredAppointments) {
      if (groups[a.timeSlot]) {
        groups[a.timeSlot].push(a);
      }
    }

    return groups;
  }, [filteredAppointments]);

  /* -- Filter button options ---------------------------------------- */
  const STATUS_OPTIONS: StatusFilter[] = ["All", "Pending", "Accepted", "Rejected"];

  /* -- Render Loading State ----------------------------------------- */
  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: T.bg }}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Loading Doctor Portal...
          </p>
        </div>
      </div>
    );
  }

  /* -- Render Login State if Unauthenticated ------------------------- */
  if (!currentUser && isFirebaseConfigured()) {
    return <DoctorLoginView onSuccess={(user) => setCurrentUser(user)} />;
  }

  /* -- Render Authenticated Dashboard -------------------------------- */
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        backgroundColor: T.bg,
        fontFamily:
          'var(--font-jost), "Inter", system-ui, -apple-system, sans-serif',
        color: T.body,
        lineHeight: "1.5",
        fontSize: "14px",
      }}
    >
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2.5 shadow-lg text-xs font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Add Appointment Modal */}
      <AddAppointmentModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddAppointment}
      />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={viewMode}
        onSelectView={setViewMode}
        onLogout={handleLogout}
      />

      {/* Main viewport */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          onOpenAddModal={() => setAddModalOpen(true)}
          onResetData={handleResetData}
          userEmail={currentUser?.email}
        />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 lg:px-6 py-4 space-y-4 max-w-7xl mx-auto w-full">
            {/* Interactive Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SummaryCard
                label="Total Requests"
                value={summary.total}
                icon={ClipboardList}
                isActive={statusFilter === "All"}
                onClick={() => setStatusFilter("All")}
              />
              <SummaryCard
                label="Pending"
                value={summary.pending}
                icon={Clock}
                accentColor="#D97706"
                isActive={statusFilter === "Pending"}
                onClick={() => setStatusFilter("Pending")}
              />
              <SummaryCard
                label="Accepted"
                value={summary.accepted}
                icon={CheckCircle2}
                accentColor="#059669"
                isActive={statusFilter === "Accepted"}
                onClick={() => setStatusFilter("Accepted")}
              />
              <SummaryCard
                label="Rejected"
                value={summary.rejected}
                icon={XCircle}
                accentColor="#DC2626"
                isActive={statusFilter === "Rejected"}
                onClick={() => setStatusFilter("Rejected")}
              />
            </div>

            {/* Toolbar: View toggle + Search + Status filters */}
            <div
              className="rounded-lg border px-4 py-3 bg-white"
              style={{ borderColor: T.border }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                {/* Left: View toggle & title */}
                <div className="flex items-center gap-3">
                  <h2
                    className="text-[15px] font-semibold"
                    style={{ color: T.heading }}
                  >
                    Appointments
                  </h2>

                  <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
                    <button
                      onClick={() => setViewMode("kanban")}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors",
                        viewMode === "kanban"
                          ? "bg-white text-slate-800 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      <Columns3 className="h-3.5 w-3.5" />
                      Columns
                    </button>
                    <button
                      onClick={() => setViewMode("table")}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors",
                        viewMode === "table"
                          ? "bg-white text-slate-800 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      Table
                    </button>
                  </div>
                </div>

                {/* Right: Search & Status Pills */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none"
                      style={{ color: T.secondary }}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, phone, concern..."
                      className="w-full sm:w-[220px] rounded-md border py-1.5 pl-8 pr-3 text-[13px] outline-none transition-colors"
                      style={{
                        borderColor: T.border,
                        color: T.heading,
                        backgroundColor: T.bg,
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = T.accent)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = T.border)
                      }
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Status filter pills */}
                  <div className="flex gap-1.5 flex-wrap">
                    {STATUS_OPTIONS.map((s) => {
                      const active = statusFilter === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={cn(
                            "rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer",
                            "border"
                          )}
                          style={{
                            backgroundColor: active ? T.accent : "transparent",
                            color: active ? T.white : T.secondary,
                            borderColor: active ? T.accent : T.border,
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main View Area */}
            {viewMode === "kanban" ? (
              /* Three time-slot columns */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-6">
                <SlotColumn
                  slot="Morning"
                  appointments={displayGroups.Morning}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onRevert={handleRevert}
                  onDelete={handleDelete}
                />
                <SlotColumn
                  slot="Evening"
                  appointments={displayGroups.Evening}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onRevert={handleRevert}
                  onDelete={handleDelete}
                />
                <SlotColumn
                  slot="Night"
                  appointments={displayGroups.Night}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onRevert={handleRevert}
                  onDelete={handleDelete}
                />
              </div>
            ) : (
              /* Table View */
              <div
                className="rounded-lg border bg-white overflow-hidden shadow-xs pb-2"
                style={{ borderColor: T.border }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Patient</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Concern</th>
                        <th className="py-3 px-4">Slot</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No appointments found matching your search or filter.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((appt) => (
                          <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-semibold text-slate-800">
                              {appt.patientName}
                            </td>
                            <td className="py-3 px-4 text-slate-600 text-xs">
                              {appt.phone}
                            </td>
                            <td className="py-3 px-4 text-slate-700">
                              {appt.concern}
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                                {appt.timeSlot === "Morning" && <Sun className="h-3.5 w-3.5 text-amber-500" />}
                                {appt.timeSlot === "Evening" && <Sunset className="h-3.5 w-3.5 text-orange-500" />}
                                {appt.timeSlot === "Night" && <Moon className="h-3.5 w-3.5 text-indigo-500" />}
                                {appt.timeSlot}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <StatusBadge status={appt.status} />
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {appt.status === "Pending" && (
                                  <>
                                    <button
                                      onClick={() => handleAccept(appt.id)}
                                      className="px-2 py-1 rounded bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => handleReject(appt.id)}
                                      className="px-2 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                {appt.status === "Accepted" && (
                                  <>
                                    <button
                                      onClick={() => handleRevert(appt.id)}
                                      className="px-2 py-1 rounded border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                                    >
                                      Revert
                                    </button>
                                    <button
                                      onClick={() => handleReject(appt.id)}
                                      className="px-2 py-1 rounded border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                                {appt.status === "Rejected" && (
                                  <>
                                    <button
                                      onClick={() => handleRevert(appt.id)}
                                      className="px-2 py-1 rounded border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-50 cursor-pointer"
                                    >
                                      Re-open
                                    </button>
                                    <button
                                      onClick={() => handleAccept(appt.id)}
                                      className="px-2 py-1 rounded bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                                    >
                                      Accept
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleDelete(appt.id)}
                                  className="p-1 rounded text-slate-400 hover:text-red-600 cursor-pointer ml-1"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}