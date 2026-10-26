import { site, type DayHours } from "@/data/site";

const DAY_INDEX: Record<number, string> = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miércoles",
  4: "jueves",
  5: "viernes",
  6: "sábado",
};

function parseTime(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatDisplayHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (m === 0) {
    const period = h >= 12 ? "pm" : "am";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12} ${period}`;
  }
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export function getHoursForDay(
  dayName: string,
  hours: DayHours[] = site.hours,
): DayHours | undefined {
  return hours.find((h) => h.day === dayName);
}

export type OpenStatus =
  | { open: true; label: "Abierto ahora" }
  | { open: false; label: string; nextOpen?: string };

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const lima = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Lima" }),
  );
  const dayName = DAY_INDEX[lima.getDay()];
  const today = getHoursForDay(dayName);
  if (!today || today.closed) {
    return { open: false, label: "Cerrado" };
  }

  const minutes = lima.getHours() * 60 + lima.getMinutes();
  const openMin = parseTime(today.open);
  const closeMin = parseTime(today.close);

  if (minutes >= openMin && minutes < closeMin) {
    return { open: true, label: "Abierto ahora" };
  }

  return {
    open: false,
    label: `Cerrado · abre a las ${formatDisplayHour(today.open)}`,
    nextOpen: today.open,
  };
}

export function formatHoursList(hours: DayHours[] = site.hours): string[] {
  return hours.map((h) => {
    if (h.closed) return `${capitalize(h.day)}: Cerrado`;
    return `${capitalize(h.day)}: ${h.open}–${h.close}`;
  });
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Schema.org day names for openingHoursSpecification */
export const SCHEMA_DAYS: Record<string, string> = {
  lunes: "Monday",
  martes: "Tuesday",
  miércoles: "Wednesday",
  jueves: "Thursday",
  viernes: "Friday",
  sábado: "Saturday",
  domingo: "Sunday",
};
