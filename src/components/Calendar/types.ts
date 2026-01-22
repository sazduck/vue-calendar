export interface WorkingHours {
  year: number;
  months: WorkingMonthHours[];
}
export interface WorkingMonthHours {
  month: number;
  hours: number;
  days: {
    day: number;
    hours: number;
  }[];
}
export type DayHours = { date: string; hours: number };
