import React from 'react';
import { Box } from '@mui/material';
import { useDrop } from 'react-dnd';
import { DragItem, ColumnDropTargetProps } from '../types';
import { formatTime } from '../utils';

const HEADER_HEIGHT = 32;
const SLOT_HEIGHT = 40;

export const ColumnDropTarget = React.memo<ColumnDropTargetProps>((props) => {
  const { dayIdx, config, onEventChange } = props;
  const dropTargetRef = React.useRef<HTMLDivElement | null>(null);
  
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: 'event',
    canDrop: () => true,
    drop: (item, monitor) => {
      const dropPos = monitor.getClientOffset();
      if (!dropPos || !dropTargetRef.current) return;

      // Get drop target bounds
      const bounds = dropTargetRef.current.getBoundingClientRect();

      // Calculate new position relative to the drop zone
      const relativeY = dropPos.y - bounds.top - HEADER_HEIGHT;
      const newSlot = Math.floor(relativeY / SLOT_HEIGHT);
      const newStartMins = config.dayStart + newSlot * config.slotMinutes;
      const newEndMins = newStartMins + item.duration;

      // Update event position
      onEventChange?.(item.id, {
        day: dayIdx,
        start: formatTime(newStartMins),
        end: formatTime(newEndMins)
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [dayIdx, config, onEventChange]);

  // Combine drop ref with our ref to access the element
  const combinedRef = (element: HTMLDivElement | null) => {
    dropTargetRef.current = element;
    drop(element);
  };

  return (
    <Box
      ref={combinedRef}
      sx={{
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.01,
        backgroundColor: isOver ? 'rgba(0,0,0,0.05)' : 'transparent',
        transition: 'background-color 0.2s',
        zIndex: 1
      }}
    />
  );
});