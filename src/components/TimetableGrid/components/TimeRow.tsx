import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatTime } from '../utils';

export const TimeRow = ({ dayStart, totalSlots, slotMinutes, slotWidth, headerHeight }: any) => (
  <Box sx={{
    display: 'flex',
    height: headerHeight,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
  }}>
    <Box sx={{ width: 80 }} />
    {Array.from({ length: totalSlots }).map((_, i) => (
      <Box key={i} sx={{
        width: slotWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeft: '1px solid #ddd'
      }}>
        <Typography variant="caption">{formatTime(dayStart + i * slotMinutes)}</Typography>
      </Box>
    ))}
  </Box>
);