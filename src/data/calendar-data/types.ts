export interface CalendarData {
  transfers: {from: string, to: string}[];
  holidays: string[];
  preholidays: string[];
  extraWorkdays: string[];
}
