export const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

export const formatTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

export const getColor = (title: string): string => {
  const palette: Record<string, string> = {
    PE: '#ffcc80',
    Play: '#ffe082',
    Writing: '#90caf9',
    HWB: '#a5d6a7',
    Lunch: '#ffab91',
    Break: '#ce93d8',
    Music: '#f48fb1',
    French: '#b39ddb',
    Numeracy: '#81d4fa',
    Literacy: '#aed581',
    Maths: '#ff8a65',
    Buddy: '#bcaaa4',
    Assembly: '#fff59d',
    'Personal Plan': '#c5e1a5'
  };
  return palette[title] || '#eeeeee';
};
