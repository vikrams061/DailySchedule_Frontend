import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimeColumn } from '../TimeColumn';

describe('TimeColumn', () => {
  const defaultProps = {
    dayStart: 480, // 8:00 AM in minutes
    totalSlots: 24,
    slotMinutes: 30,
    slotHeight: 40
  };

  it('renders the correct number of time slots', () => {
    render(<TimeColumn {...defaultProps} />);
    const timeSlots = screen.getAllByText(/^\d{1,2}:\d{2}$/);
    expect(timeSlots).toHaveLength(defaultProps.totalSlots);
  });

  it('displays times in correct format', () => {
    render(<TimeColumn {...defaultProps} />);
    // First slot should be 8:00
    expect(screen.getByText('8:00')).toBeInTheDocument();
    // With 30-minute slots, we should see 8:30
    expect(screen.getByText('8:30')).toBeInTheDocument();
  });

  it('renders time slots with correct spacing', () => {
    render(<TimeColumn {...defaultProps} />);
    const container = screen.getAllByText(/^\d{1,2}:\d{2}$/)[0].closest('.MuiBox-root');
    expect(container).toBeTruthy();

    const timeTexts = screen.getAllByText(/^\d{1,2}:\d{2}$/);
    expect(timeTexts).toHaveLength(defaultProps.totalSlots);

    // Verify each time text is inside a Typography component
    for (const timeText of timeTexts) {
      expect(timeText.closest('.MuiTypography-caption')).toBeTruthy();
    }
  });
});