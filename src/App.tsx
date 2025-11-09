import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './pages/Home';
import DevTest from './pages/DevTest';
import UploadPage from './pages/UploadPage';
import { TimetableEvent } from './components/TimetableGrid/types';

export default function App() {
  const [events, setEvents] = useState<TimetableEvent[]>([]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LY Timetable
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/upload">Upload</Button>
          <Button color="inherit" component={Link} to="/dev">Dev</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage events={events} setEvents={setEvents} />} />
          <Route path="/dev" element={<DevTest />} />
        </Routes>
      </Container>
    </>
  );
}
