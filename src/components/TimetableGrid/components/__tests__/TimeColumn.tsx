import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatTime } from '../utils.js';

interface TimeColumnProps {
  dayStart: number;
  totalSlots: number;
  slotMinutes: number;
  slotHeight: number;
}

export const TimeColumn: React.FC<TimeColumnProps> = ({ 
  dayStart, 
  totalSlots, 
  slotMinutes, 
  slotHeight 
}) => {
  return (
    <Box sx={{ pr: 1 }}>
      {/* header spacing */}
      <Box sx={{ height: 32 }} />
      {Array.from({ length: totalSlots }).map((_, i) => (
        <Box 
          key={`time-slot-${dayStart + i * slotMinutes}`} 
          sx={{ height: slotHeight, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 1 }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            {formatTime(dayStart + i * slotMinutes)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};