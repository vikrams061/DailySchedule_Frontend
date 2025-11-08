import React from 'react';
import { Box, Typography, Theme } from '@mui/material';
import { useDrag } from 'react-dnd';
import { DraggableEventProps, DragItem } from '../types';
import { toMinutes } from '../utils';

const HEADER_HEIGHT = 32;
const SLOT_HEIGHT = 40;

export const DraggableEvent = React.memo<DraggableEventProps>((props) => {
  const { event, rowStart, rowSpan, onEventChange } = props;

  // Calculate layout values
  const duration = React.useMemo(
    () => event.duration ?? toMinutes(event.end) - toMinutes(event.start), 
    [event]
  );

  const [{ isDragging }, dragRef] = useDrag<DragItem, void, { isDragging: boolean }>(() => ({
    type: 'event',
    item: {
      type: 'event',
      id: event.id,
      day: event.day,
      start: event.start,
      end: event.end,
      duration
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [event, duration]);

  const top = `calc(${(rowStart - 1) * SLOT_HEIGHT}px + ${HEADER_HEIGHT}px)`;
  const height = `calc(${rowSpan * SLOT_HEIGHT}px - 6px)`;
  const lowConfidence = event.confidence !== undefined && event.confidence < 0.7;

  return (
    <Box
      ref={dragRef}
      component="button"
      type="button"
      tabIndex={0}
      sx={{
        position: 'absolute',
        left: 8,
        right: 8,
        top,
        height,
        display: 'flex',
        alignItems: 'stretch',
        p: 0,
        border: 'none',
        bgcolor: 'transparent',
        cursor: 'move',
        opacity: isDragging ? 0.7 : 1,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Card container: white card with stronger shadow and colored top stripe + left badge */}
      <Box sx={{
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 1.25,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <Box sx={{ height: 8, bgcolor: (theme: Theme) => lowConfidence ? 'warning.main' : theme.palette.primary.main }} />

        <Box sx={{ p: 1, display: 'flex', gap: 1, alignItems: 'flex-start', flex: 1 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: (theme: Theme) => lowConfidence ? 'rgba(255,140,0,0.12)' : 'rgba(25,118,210,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: (theme: Theme) => lowConfidence ? 'warning.main' : theme.palette.primary.main }}>{event.title?.charAt(0) ?? '?'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, flex: 1 }}>
            <Typography variant="body2" fontWeight={700} noWrap sx={{ color: 'text.primary' }}>
              {event.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {event.start} — {event.end}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
              {Math.max(15, Math.round((toMinutes(event.end) - toMinutes(event.start))))} min
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});