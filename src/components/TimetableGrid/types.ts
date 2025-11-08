export interface TimetableEvent {
  id: string;
  day: number;
  start: string;
  end: string;
  title: string;
  confidence?: number;
  originalCropUrl?: string;
  duration?: number;
}

export interface DragItem {
  type: 'event';
  id: string;
  day: number;
  start: string;
  end: string;
  duration: number;
}

export interface TimeGridConfig {
  dayStart: number;
  dayEnd: number;
  slotMinutes: number;
}

export interface TimetableGridProps {
  readonly events?: ReadonlyArray<TimetableEvent>;
  readonly onEventChange?: (id: string, changes: Partial<TimetableEvent>) => void;
}

export interface DraggableEventProps {
  event: TimetableEvent;
  rowStart: number;
  rowSpan: number;
  onEventChange?: (id: string, update: Partial<TimetableEvent>) => void;
}

export interface ColumnDropTargetProps {
  dayIdx: number;
  config: TimeGridConfig;
  onEventChange?: (id: string, changes: Partial<TimetableEvent>) => void;
}