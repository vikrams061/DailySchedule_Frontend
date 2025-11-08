import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Home from './pages/Home'
import Upload from './pages/Upload'
import DevTest from './pages/DevTest'

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LY Timetable
          </Typography>
          <Button color="inherit" component={Link as any} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link as any} to="/upload">
            Upload
          </Button>
          <Button color="inherit" component={Link as any} to="/dev">
            Dev
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dev" element={<DevTest />} />
        </Routes>
      </Container>
    </>
  )
}
