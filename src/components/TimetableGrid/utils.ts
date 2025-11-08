export const toMinutes = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export const formatTime = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h < 12 ? 'am' : 'pm';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
};