import React from 'react'
import { Box, Button, Typography } from '@mui/material'

export default function Uploader() {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: send file to OCR backend or preview image
      console.log('Selected file', file.name)
    }
  }

  return (
    <Box>
      <Typography>Upload an image of the timetable</Typography>
      <input id="file" type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      <label htmlFor="file">
        <Button variant="contained" component="span" sx={{ mt: 2 }}>
          Choose file
        </Button>
      </label>
    </Box>
  )
}
