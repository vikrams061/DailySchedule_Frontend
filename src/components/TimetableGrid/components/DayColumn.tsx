import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { ColumnDropTarget } from './ColumnDropTarget';
import { DraggableEvent } from './DraggableEvent';
import { TimeGridConfig, TimetableEvent } from '../types';

interface DayColumnProps {
  day: string;
  dayIdx: number;
  totalSlots: number;
  slotHeight: number;
  config: TimeGridConfig;
  events: Array<{
    ev: TimetableEvent;
    rowStart: number;
    rowSpan: number;
  }>;
  isMobile: boolean;
  onEventChange?: (id: string, changes: Partial<TimetableEvent>) => void;
}

export const DayColumn: React.FC<DayColumnProps> = ({
  day,
  dayIdx,
  totalSlots,
  slotHeight,
  config,
  events,
  isMobile,
  onEventChange,
}) => {
  return (
    <Box sx={{ borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
      <Box sx={{ 
        height: 32, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottom: '1px solid rgba(0,0,0,0.06)' 
      }}>
        <Typography variant="subtitle2">{day}</Typography>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'grid', gridTemplateRows: `repeat(${totalSlots}, ${slotHeight}px)` }}>
          {Array.from({ length: totalSlots }).map((_, i) => (
            <Box 
              key={`grid-line-${config.dayStart + i * config.slotMinutes}`} 
              sx={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }} 
            />
          ))}
        </Box>

        {!isMobile && (
          <ColumnDropTarget 
            config={config} 
            dayIdx={dayIdx} 
            onEventChange={onEventChange}
          />
        )}

        {events
          .filter((p) => p.ev.day === dayIdx)
          .map((p) => (
            <Tooltip 
              key={p.ev.id} 
              title={`Click to edit • ${Math.round((p.ev.confidence ?? 0) * 100)}% confidence`}
            >
              <DraggableEvent 
                event={p.ev}
                rowStart={p.rowStart}
                rowSpan={p.rowSpan}
                onEventChange={onEventChange}
              />
            </Tooltip>
          ))}
      </Box>
    </Box>
  );
};