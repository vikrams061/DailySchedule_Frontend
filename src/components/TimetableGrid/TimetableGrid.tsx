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
 { id: 'm1', day: 0, start: '08:30', end: '09:00', title: 'Personal Plan' },
  { id: 'm2', day: 0, start: '09:00', end: '09:30', title: 'PE' },
  { id: 'm3', day: 0, start: '09:30', end: '10:00', title: 'Play' },
  { id: 'm4', day: 0, start: '10:00', end: '10:30', title: 'Writing' },
  { id: 'm5', day: 0, start: '10:30', end: '11:00', title: 'Break + Writing' },
  { id: 'm6', day: 0, start: '11:00', end: '11:30', title: 'Writing' },
  { id: 'm7', day: 0, start: '11:30', end: '12:00', title: 'HWB' },
  { id: 'm8', day: 0, start: '12:00', end: '12:30', title: 'PE' },
  { id: 'm9', day: 0, start: '12:30', end: '13:00', title: 'Lunch' },
  { id: 'm10', day: 0, start: '13:00', end: '13:30', title: 'Writing' },
  { id: 'm11', day: 0, start: '13:30', end: '14:00', title: 'HWB' },
  { id: 'm12', day: 0, start: '14:00', end: '14:30', title: 'PE' },

  // Tuesday
  { id: 't1', day: 1, start: '08:30', end: '09:00', title: 'Personal Plan' },
  { id: 't2', day: 1, start: '09:00', end: '09:30', title: 'PE' },
  { id: 't3', day: 1, start: '09:30', end: '10:00', title: 'Play' },
  { id: 't4', day: 1, start: '10:00', end: '10:30', title: 'Writing' },
  { id: 't5a', day: 1, start: '10:30', end: '11:00', title: 'Break + Writing' },
  { id: 't6', day: 1, start: '11:00', end: '11:30', title: 'Writing' },
  { id: 't7', day: 1, start: '11:30', end: '12:00', title: 'HWB' },
  { id: 't8', day: 1, start: '12:00', end: '12:30', title: 'PE' },
  { id: 't9', day: 1, start: '12:30', end: '13:00', title: 'Lunch' },
  { id: 't10', day: 1, start: '13:00', end: '13:30', title: 'Writing' },
  { id: 't11', day: 1, start: '13:30', end: '14:00', title: 'HWB' },
  { id: 't12', day: 1, start: '14:00', end: '14:30', title: 'PE' },

  // Wednesday
  { id: 'w1', day: 2, start: '08:30', end: '09:00', title: 'Personal Plan' },
  { id: 'w2', day: 2, start: '09:00', end: '09:30', title: 'PE' },
  { id: 'w3', day: 2, start: '09:30', end: '10:00', title: 'Play' },
  { id: 'w4', day: 2, start: '10:00', end: '10:30', title: 'Writing' },
  { id: 'w5a', day: 2, start: '10:30', end: '11:00', title: 'Break + Writing' },
  { id: 'w6', day: 2, start: '11:00', end: '11:30', title: 'Writing' },
  { id: 'w7', day: 2, start: '11:30', end: '12:00', title: 'HWB' },
  { id: 'w8', day: 2, start: '12:00', end: '12:30', title: 'PE' },
  { id: 'w9', day: 2, start: '12:30', end: '13:00', title: 'Lunch' },
  { id: 'w10', day: 2, start: '13:00', end: '13:30', title: 'Writing' },
  { id: 'w11', day: 2, start: '13:30', end: '14:00', title: 'HWB' },
  { id: 'w12', day: 2, start: '14:00', end: '14:30', title: 'PE' },

  // Thursday
  { id: 'th1', day: 3, start: '08:30', end: '09:00', title: 'Assembly' },
  { id: 'th2', day: 3, start: '09:00', end: '09:30', title: 'PE' },
  { id: 'th3', day: 3, start: '09:30', end: '10:00', title: 'Play' },
  { id: 'th4', day: 3, start: '10:00', end: '10:30', title: 'French' },
  { id: 'th5a', day: 3, start: '10:30', end: '11:00', title: 'Break + Writing' },
  { id: 'th6', day: 3, start: '11:00', end: '11:30', title: 'Writing' },
  { id: 'th7', day: 3, start: '11:30', end: '12:00', title: 'HWB' },
  { id: 'th8', day: 3, start: '12:00', end: '12:30', title: 'PE' },
  { id: 'th9', day: 3, start: '12:30', end: '13:00', title: 'Lunch' },
  { id: 'th10', day: 3, start: '13:00', end: '13:30', title: 'Music' },
  { id: 'th11', day: 3, start: '13:30', end: '14:00', title: 'HWB' },
  { id: 'th12', day: 3, start: '14:00', end: '14:30', title: 'PE' },

  // Friday
  { id: 'f1', day: 4, start: '08:30', end: '09:00', title: 'PE' },
  { id: 'f2', day: 4, start: '09:00', end: '09:30', title: 'Play' },
  { id: 'f3', day: 4, start: '09:30', end: '10:00', title: 'Writing' },
  { id: 'f4', day: 4, start: '10:00', end: '10:30', title: 'Numeracy' },
  { id: 'f5a', day: 4, start: '10:30', end: '11:00', title: 'Break + Literacy' },
  { id: 'f6', day: 4, start: '11:00', end: '11:30', title: 'Literacy' },
  { id: 'f7', day: 4, start: '11:30', end: '12:00', title: 'Numeracy' },
  { id: 'f8', day: 4, start: '12:00', end: '12:30', title: 'PE' },
  { id: 'f9', day: 4, start: '12:30', end: '13:00', title: 'Lunch Club'},
  { id: 'f10', day: 3, start: '13:00', end: '13:30', title: 'Music' },
  { id: 'f11', day: 3, start: '13:30', end: '14:00', title: 'HWB' },
  { id: 'f12', day: 3, start: '14:00', end: '14:30', title: 'PE' },

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