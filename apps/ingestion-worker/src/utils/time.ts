import dayjs from "dayjs";

export function toISO(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  const d = dayjs(dateStr);
  return d.isValid() ? d.toISOString() : null;
}
