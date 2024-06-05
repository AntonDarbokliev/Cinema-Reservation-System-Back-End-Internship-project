export interface Time {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: Date;
  date: Date;
  time: number;
  timeZone: 'string';
  dayOfWeek: 'string';
  dstActive: boolean;
}

export const getCurrentDateTime = async (): Promise<Time> => {
  const response = await fetch(
    'https://timeapi.io/api/Time/current/zone?timeZone=Europe/Sofia',
  );
  if (!response.ok) {
    throw new Error('Failed to fetch current date and time');
  }
  const timeObj = await response.json();
  return timeObj;
};
