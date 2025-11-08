import React from 'react'
import { Typography, Box } from '@mui/material'
import TimetableGrid from '../components/TimetableGrid/TimetableGrid'

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Timetable
      </Typography>
      <TimetableGrid />
    </Box>
  )
}
