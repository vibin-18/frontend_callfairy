import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import { PlayArrow, Download, Delete } from '@mui/icons-material';
import { format } from 'date-fns';

interface CallRecord {
  id: string;
  date: Date;
  duration: number;
  status: 'completed' | 'missed' | 'failed';
  transcript: string;
}

const CallHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  const calls: CallRecord[] = [
    {
      id: '1',
      date: new Date('2024-03-15T10:30:00'),
      duration: 300,
      status: 'completed',
      transcript: 'Sample conversation transcript...',
    },
    // Add more mock data as needed
  ];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: CallRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'missed':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Call History
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search calls..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>
                  {format(call.date, 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell>{formatDuration(call.duration)}</TableCell>
                <TableCell>
                  <Chip
                    label={call.status}
                    color={getStatusColor(call.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" title="Play Recording">
                    <PlayArrow />
                  </IconButton>
                  <IconButton size="small" title="Download Transcript">
                    <Download />
                  </IconButton>
                  <IconButton size="small" title="Delete">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CallHistoryPage; 