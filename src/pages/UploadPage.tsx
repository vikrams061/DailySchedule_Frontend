import React from 'react';
import Uploader from '../components/Uploader/Uploader';
import { TimetableGrid } from '../components/TimetableGrid/TimetableGrid';
import { TimetableEvent } from '../components/TimetableGrid/types';
import { Container, Box, Typography } from '@mui/material';

interface UploadPageProps {
  events: TimetableEvent[];
  setEvents: (events: TimetableEvent[]) => void;
}

export default function UploadPage({ events, setEvents }: UploadPageProps) {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Timetable Image
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Uploader onParsed={setEvents} />
      </Box>

      {
      events.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Parsed Timetable
          </Typography>
          <TimetableGrid events={events} />
        </>
      )
      }
    </Container>
  );
}