import dayjs, { type Dayjs, extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

extend(relativeTime);

export const timeFromNow = (date: string | Dayjs | Date): string => dayjs(date).fromNow();
export const monthDay = (date: string | Dayjs | Date): string => dayjs(date).format("MMM D");
export const monthDayYear = (date: string | Dayjs | Date): string =>
  dayjs(date).format("MMM D, YYYY");

// TODO: replace with parseIsoDate
export const isIsoDate = (date: string): boolean => {
  const parsed = Date.parse(date);
  if (isNaN(parsed)) return false;
  return new Date(parsed).toISOString() === date;
};

export const parseIsoDate = (date: unknown): Date | null => {
  if (date instanceof Date) return date;
  if (typeof date !== "string") return null;
  const parsed = Date.parse(date);
  if (isNaN(parsed)) return null;
  if (new Date(parsed).toISOString() !== date) return null;
  return new Date(parsed);
};

export const formatDate = (date: string | Date): string => dayjs(date).format("YYYY-MM-DD");
