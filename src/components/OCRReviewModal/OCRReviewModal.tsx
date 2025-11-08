import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

interface Props {
  open: boolean
  onClose: () => void
  originalCropUrl?: string
}

export default function OCRReviewModal({ open, onClose, originalCropUrl }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Review OCR result</DialogTitle>
      <DialogContent>
        {/* optionally show originalCropUrl image and editable fields */}
        <TextField label="Title" fullWidth sx={{ mt: 2 }} />
        <TextField label="Notes" fullWidth multiline rows={3} sx={{ mt: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
