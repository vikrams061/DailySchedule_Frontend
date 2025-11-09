import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { TimetableEvent } from '../TimetableGrid/types';

interface UploaderProps {
  onParsed: (events: TimetableEvent[]) => void;
}

export default function Uploader({ onParsed }: UploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<TimetableEvent[] | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('File selected:', file);
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file); // ✅ matches backend expectation
      const response = await fetch('http://localhost:3000/api/v1/parse-timetable', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('OCR failed');

     const raw = await response.text();
console.log('Raw response:', raw);

      try {
        const result = JSON.parse(raw);
        console.log('Parsed OCR response:', result);
        setOcrResult(result.timetable);
        console.log('OCR response:', result);
        onParsed(result.timetable);
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        setError('Invalid response format');
      }

    } catch (err: any) {
       console.error('Failed to parse JSON:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload an image of the timetable
      </Typography>

      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
      <label htmlFor="file">
        <Button variant="contained" component="span" sx={{ mt: 2 }}>
          Choose File
        </Button>
      </label>

      {loading && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {previewUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption">Preview:</Typography>
          <Box
            component="img"
            src={previewUrl}
            alt="Preview"
            sx={{ maxWidth: '100%', maxHeight: 300, borderRadius: 1, boxShadow: 1 }}
          />
        </Box>
      )}

      {ocrResult && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">OCR Parsed Data:</Typography>
          <pre style={{ fontSize: 12, background: '#f5f5f5', padding: 8 }}>
            {JSON.stringify(ocrResult, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
}
