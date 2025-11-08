import React from 'react'
import { Box, Typography } from '@mui/material'
import Uploader from '../components/Uploader/Uploader'

export default function Upload() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Upload Timetable
      </Typography>
      <Uploader />
    </Box>
  )
}
