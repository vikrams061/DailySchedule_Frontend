import * as React from 'react';
import { useMemo, useState } from 'react';
import { Box, Paper, Typography, useMediaQuery, Theme } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OCRReviewModal from '../OCRReviewModal/OCRReviewModal';
import { TimeColumn } from './components/TimeColumn';
import { DayColumn } from './components/DayColumn';
import { MobileView } from './components/MobileView';
import type { TimetableEvent, TimetableGridProps, TimeGridConfig } from './types';
import { toMinutes } from './utils';

const SLOT_HEIGHT = 40;
const HEADER_HEIGHT = 32;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const DEFAULT_CONFIG: TimeGridConfig = {
  dayStart: 8 * 60, // 8:00
  dayEnd: 20 * 60, // 20:00
  slotMinutes: 30
};

const SAMPLE_EVENTS: TimetableEvent[] = [
  { id: '1', day: 0, start: '09:00', end: '10:30', title: 'Math', confidence: 0.95 },
  { id: '2', day: 1, start: '11:00', end: '12:00', title: 'Physics', confidence: 0.6 },
  { id: '3', day: 2, start: '14:00', end: '15:30', title: 'History', confidence: 0.4 },
  { id: '4', day: 0, start: '13:00', end: '13:45', title: 'Lunch Club', confidence: 0.98 }
];

const TimetableGrid = React.memo<TimetableGridProps>(({ events: externalEvents, onEventChange }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [selected, setSelected] = useState<TimetableEvent | null>(null);
  const events = externalEvents ?? SAMPLE_EVENTS;

  // Calculate event positions
  const positioned = useMemo(() => events.map((ev) => {
    const startMin = toMinutes(ev.start);
    const endMin = toMinutes(ev.end);
    const offset = Math.max(0, startMin - DEFAULT_CONFIG.dayStart);
    const duration = Math.max(15, endMin - startMin);
    const rowStart = Math.floor(offset / DEFAULT_CONFIG.slotMinutes) + 1;
    const rowSpan = Math.max(1, Math.ceil(duration / DEFAULT_CONFIG.slotMinutes));
    return { ev: { ...ev, duration }, rowStart, rowSpan };
  }), [events]);

  const totalSlots = Math.ceil(
    (DEFAULT_CONFIG.dayEnd - DEFAULT_CONFIG.dayStart) / DEFAULT_CONFIG.slotMinutes
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1">Weekly Timetable</Typography>

      <DndProvider backend={HTML5Backend}>
        {isMobile ? (
          <MobileView 
            days={DAYS}
            events={positioned}
            onEventSelect={setSelected}
          />
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', gap: 1, mt: 2 }}>
            <TimeColumn 
              dayStart={DEFAULT_CONFIG.dayStart}
              totalSlots={totalSlots}
              slotMinutes={DEFAULT_CONFIG.slotMinutes}
              slotHeight={SLOT_HEIGHT}
            />

            {DAYS.map((day, idx) => (
              <DayColumn
                key={day}
                day={day}
                dayIdx={idx}
                totalSlots={totalSlots}
                slotHeight={SLOT_HEIGHT}
                config={DEFAULT_CONFIG}
                events={positioned}
                isMobile={isMobile}
                onEventChange={onEventChange}
              />
            ))}
          </Box>
        )}
      </DndProvider>

      <OCRReviewModal 
        open={!!selected} 
        onClose={() => setSelected(null)} 
        originalCropUrl={selected?.originalCropUrl} 
      />
    </Paper>
  );
});

export default TimetableGrid;