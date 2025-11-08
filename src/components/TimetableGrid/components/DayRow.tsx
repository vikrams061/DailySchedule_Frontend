import React from 'react';
import { Box, Typography } from '@mui/material';
import { TimetableEvent, TimeGridConfig } from '../types';
import { getColor } from '../utils';

interface PositionedEvent {
  ev: TimetableEvent;
  colStart: number;
  colSpan: number;
}

interface DayRowProps {
  day: string;
  dayIdx: number;
  events: PositionedEvent[];
  totalSlots: number;
  slotWidth: number;
  config: TimeGridConfig;
}

export const DayRow: React.FC<DayRowProps> = ({
  day,
  dayIdx,
  events,
  totalSlots,
  slotWidth
}) => {
  const dayEvents = events.filter((e) => e.ev.day === dayIdx);

  return (
    <Box sx={{ display: 'flex', height: 40 }}>
      <Box
        sx={{
          width: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          backgroundColor: '#e3f2fd',
          borderRight: '1px solid #ddd'
        }}
      >
        <Typography variant="body2">{day}</Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${totalSlots}, ${slotWidth}px)`,
          width: '100%'
        }}
      >
        {dayEvents.map(({ ev, colStart, colSpan }) => (
          <Box
            key={ev.id}
            sx={{
              gridColumnStart: colStart,
              gridColumnEnd: colStart + colSpan,
              backgroundColor: getColor(ev.title),
              borderRadius: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 500,
              color: '#333',
              px: 1,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
              }
            }}
          >
            {ev.title}
          </Box>
        ))}
      </Box>
    </Box>
  );
};