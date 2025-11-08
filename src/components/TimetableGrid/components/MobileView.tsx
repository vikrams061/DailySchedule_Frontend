import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { TimetableEvent } from '../types';

interface MobileViewProps {
  days: readonly string[];
  events: Array<{
    ev: TimetableEvent;
    rowStart: number;
    rowSpan: number;
  }>;
  onEventSelect: (event: TimetableEvent) => void;
}

export const MobileView: React.FC<MobileViewProps> = ({ days, events, onEventSelect }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {days.map((day, idx) => {
        const dayEvents = events.filter((p) => p.ev.day === idx);
        return (
          <Box key={day} sx={{ mb: 2 }}>
            <Typography variant="subtitle2">{day}</Typography>
            <Box sx={{ mt: 1 }}>
              {dayEvents.length === 0 ? (
                <Typography color="text.secondary">No events</Typography>
              ) : (
                dayEvents.map((p) => (
                  <Tooltip key={p.ev.id} title={`Confidence: ${Math.round((p.ev.confidence ?? 0) * 100)}%`}>
                    <Box
                      component="button"
                      onClick={() => onEventSelect(p.ev)}
                      sx={{
                        p: 1,
                        mb: 1,
                        borderRadius: 1,
                        bgcolor: (theme) => 
                          p.ev.confidence !== undefined && p.ev.confidence < 0.7 
                            ? 'rgba(255,165,0,0.12)' 
                            : 'rgba(25,118,210,0.06)',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        {p.ev.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {p.ev.start} — {p.ev.end}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};