import React, { useMemo } from 'react';
import { Box, Paper, Typography, useMediaQuery, Theme } from '@mui/material';
import { TimeRow } from './components/TimeRow';
import { DayRow } from './components/DayRow';
import { toMinutes } from './utils';
import type { TimetableEvent, TimeGridConfig } from './types';

const SLOT_WIDTH = 80;
const HEADER_HEIGHT = 40;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;

const CONFIG: TimeGridConfig = {
  dayStart: 8 * 60 + 30, // 8:30 AM
  dayEnd: 15 * 60,       // 3:00 PM
  slotMinutes: 30
};

const SCHOOL_TIMETABLE_EVENTS: TimetableEvent[] = [
{ id: 'm1', day: 0, start: '08:00', end: '09:00', title: 'Maths' },
  { id: 'm3', day: 0, start: '09:30', end: '10:30', title: 'Writing' },
  { id: 'm4', day: 0, start: '10:30', end: '11:00', title: 'PE' },
  { id: 'm5', day: 0, start: '11:00', end: '12:00', title: 'Play' },
  { id: 'm6', day: 0, start: '12:00', end: '13:00', title: 'Lunch' },
  { id: 'm7', day: 0, start: '13:00', end: '14:00', title: 'Writing' },
  { id: 'm8', day: 0, start: '14:00', end: '14:30', title: 'HWB' },

  // Tuesday
  { id: 't1', day: 1, start: '08:00', end: '09:00', title: 'Maths' },
  { id: 't3', day: 1, start: '09:30', end: '10:30', title: 'PE' },
  { id: 't4', day: 1, start: '10:30', end: '11:00', title: 'Play' },
  { id: 't5', day: 1, start: '11:00', end: '12:00', title: 'Writing' },
  { id: 't6', day: 1, start: '12:00', end: '13:00', title: 'Lunch' },
  { id: 't7', day: 1, start: '13:00', end: '14:00', title: 'Numeracy' },
  { id: 't8', day: 1, start: '14:00', end: '14:30', title: 'Literacy' },

  // Wednesday
  { id: 'w1', day: 2, start: '08:00', end: '09:00', title: 'Maths' },
  { id: 'w3', day: 2, start: '09:30', end: '10:30', title: 'Writing' },
  { id: 'w4', day: 2, start: '10:30', end: '11:00', title: 'HWB' },
  { id: 'w5', day: 2, start: '11:00', end: '12:00', title: 'PE' },
  { id: 'w6', day: 2, start: '12:00', end: '13:00', title: 'Lunch' },
  { id: 'w7', day: 2, start: '13:00', end: '14:00', title: 'Writing' },
  { id: 'w8', day: 2, start: '14:00', end: '14:30', title: 'Music' },

  // Thursday
  { id: 'th1', day: 3, start: '08:00', end: '09:00', title: 'Assembly' },
  { id: 'th3', day: 3, start: '09:30', end: '10:30', title: 'French' },
  { id: 'th4', day: 3, start: '10:30', end: '11:00', title: 'PE' },
  { id: 'th5', day: 3, start: '11:00', end: '12:00', title: 'Play' },
  { id: 'th6', day: 3, start: '12:00', end: '13:00', title: 'Lunch' },
  { id: 'th7', day: 3, start: '13:00', end: '14:00', title: 'Maths' },
  { id: 'th8', day: 3, start: '14:00', end: '14:30', title: 'Buddy' },

  // Friday
  { id: 'f1', day: 4, start: '08:00', end: '09:00', title: 'Maths' },
  { id: 'f3', day: 4, start: '09:30', end: '10:30', title: 'Writing' },
  { id: 'f4', day: 4, start: '10:30', end: '11:00', title: 'PE' },
  { id: 'f5', day: 4, start: '11:00', end: '12:00', title: 'Music' },
  { id: 'f6', day: 4, start: '12:00', end: '13:00', title: 'Lunch' },
  { id: 'f7', day: 4, start: '13:00', end: '14:00', title: 'Literacy' },
  { id: 'f8', day: 4, start: '14:00', end: '14:30', title: 'Personal Plan' }
  // Add more days as needed
];

export const TimetableGrid: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const slotWidth = isMobile ? 60 : SLOT_WIDTH;

  const totalSlots = Math.ceil((CONFIG.dayEnd - CONFIG.dayStart) / CONFIG.slotMinutes);

  const positioned = useMemo(() =>
    SCHOOL_TIMETABLE_EVENTS.map(ev => {
      const startMin = toMinutes(ev.start);
      const endMin = toMinutes(ev.end);
      const offset = Math.max(0, startMin - CONFIG.dayStart);
      const duration = Math.max(15, endMin - startMin);
      const colStart = Math.floor(offset / CONFIG.slotMinutes) + 1;
      const colSpan = Math.max(1, Math.ceil(duration / CONFIG.slotMinutes));
      return { ev: { ...ev, duration }, colStart, colSpan };
    }), [SCHOOL_TIMETABLE_EVENTS]
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Weekly Timetable</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <TimeRow
          dayStart={CONFIG.dayStart}
          totalSlots={totalSlots}
          slotMinutes={CONFIG.slotMinutes}
          slotWidth={slotWidth}
          headerHeight={HEADER_HEIGHT}
        />
        {DAYS.map((day, idx) => (
          <DayRow
            key={day}
            day={day}
            dayIdx={idx}
            events={positioned}
            totalSlots={totalSlots}
            slotWidth={slotWidth}
            config={CONFIG}
          />
        ))}
      </Box>
    </Paper>
  );
};export default TimetableGrid;