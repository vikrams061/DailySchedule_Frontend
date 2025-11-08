import React, { useState } from 'react'
import TimetableGrid from '../components/TimetableGrid/TimetableGrid'
import sampleData from '../sample-data/timetable.json'
import { TimetableEvent } from '../components/TimetableGrid/types'
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material'

const BACKEND_BASE = 'http://localhost:3000'

export default function DevTest() {
  const sample = (sampleData as unknown) as TimetableEvent[]
  const [events, setEvents] = useState<TimetableEvent[] | undefined>(sample)
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [weekStartDate, setWeekStartDate] = useState('2025-11-03')
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)
    if (!file) return

    // preview
    const url = URL.createObjectURL(file)
    setFilePreviewUrl(url)

    // upload to backend
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('week_start_date', weekStartDate)

      const res = await fetch(`${BACKEND_BASE}/api/v1/parse-timetable`, {
        method: 'POST',
        body: fd,
        headers: {
          // Accept: 'application/json' // don't set Content-Type; browser will set multipart boundary
        }
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Upload failed: ${res.status} ${txt}`)
      }

      const json = await res.json()

      // If backend returns upload_id, poll the OCR endpoint
      if (json.upload_id) {
        setUploadId(json.upload_id)
        await pollOcr(json.upload_id)
      } else if (Array.isArray(json)) {
        // assume array of events returned directly
        setEvents(json as TimetableEvent[])
      } else if (json.events && Array.isArray(json.events)) {
        setEvents(json.events as TimetableEvent[])
      } else {
        throw new Error('Unexpected response shape from parse-timetable')
      }
    } catch (err: any) {
      setError(err?.message ?? String(err))
    } finally {
      setUploading(false)
    }
  }

  async function pollOcr(id: string, attempts = 0): Promise<void> {
    try {
      const res = await fetch(`${BACKEND_BASE}/api/v1/uploads/${id}/ocr`)
      if (res.status === 204 || res.status === 202) {
        // not ready yet
        if (attempts < 10) {
          await new Promise(r => setTimeout(r, 1000))
          return pollOcr(id, attempts + 1)
        }
        throw new Error('OCR timed out')
      }
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`OCR fetch failed: ${res.status} ${txt}`)
      }
      const json = await res.json()
      if (Array.isArray(json)) {
        setEvents(json as TimetableEvent[])
      } else if (json.events && Array.isArray(json.events)) {
        setEvents(json.events as TimetableEvent[])
      } else {
        throw new Error('Unexpected OCR JSON shape')
      }
    } catch (err: any) {
      setError(err?.message ?? String(err))
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Dev Test — Timetable with sample data
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
        <label htmlFor="file-input">
          <input id="file-input" type="file" accept="application/pdf,image/*" onChange={handleFile} style={{ display: 'none' }} />
          <Button variant="contained" component="span">Upload timetable (PDF / image)</Button>
        </label>

        <TextField label="Week start" size="small" value={weekStartDate} onChange={e => setWeekStartDate(e.target.value)} />

        {uploading && <CircularProgress size={20} />}
        {uploadId && <Typography variant="caption">upload_id: {uploadId}</Typography>}
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}

      {filePreviewUrl && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Preview</Typography>
          <Box sx={{ border: '1px solid rgba(0,0,0,0.06)', mt: 1 }}>
            <iframe title="preview" src={filePreviewUrl} style={{ width: '100%', height: 400, border: 'none' }} />
          </Box>
        </Box>
      )}

      <TimetableGrid events={events} />
    </Box>
  )
}
