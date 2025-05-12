import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Chip,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import {
  Mic,
  MicOff,
  CallEnd,
  VolumeUp,
  VolumeOff,
  Settings,
} from '@mui/icons-material';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const CallPage: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    // TODO: Implement actual call initialization
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    // TODO: Implement actual call termination
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement actual mute functionality
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual recording functionality
  };

  const handleSendMessage = () => {
    if (currentTranscript.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: currentTranscript,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setCurrentTranscript('');
      // TODO: Implement actual message sending
    }
  };

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">
            {isCallActive ? 'Active Call' : 'New Call'}
          </Typography>
          <Box>
            <IconButton>
              <Settings />
            </IconButton>
          </Box>
        </Box>

        {isCallActive ? (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h3" color="primary">
                {formatDuration(callDuration)}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  icon={isMuted ? <VolumeOff /> : <VolumeUp />}
                  label={isMuted ? 'Muted' : 'Unmuted'}
                  color={isMuted ? 'error' : 'success'}
                  sx={{ mr: 1 }}
                />
                <Chip
                  icon={isRecording ? <Mic /> : <MicOff />}
                  label={isRecording ? 'Recording' : 'Not Recording'}
                  color={isRecording ? 'error' : 'default'}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 1,
                  }}
                >
                  <Paper
                    sx={{
                      p: 1,
                      maxWidth: '70%',
                      bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {format(message.timestamp, 'HH:mm:ss')}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={currentTranscript}
                onChange={(e) => setCurrentTranscript(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={!currentTranscript.trim()}
              >
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              Ready to start a new call
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 3,
          }}
        >
          {isCallActive ? (
            <>
              <IconButton
                color={isMuted ? 'error' : 'primary'}
                onClick={handleToggleMute}
                size="large"
              >
                {isMuted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <IconButton
                color="error"
                onClick={handleEndCall}
                size="large"
              >
                <CallEnd />
              </IconButton>
              <IconButton
                color={isRecording ? 'error' : 'primary'}
                onClick={handleToggleRecording}
                size="large"
              >
                {isRecording ? <MicOff /> : <Mic />}
              </IconButton>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleStartCall}
              startIcon={<Mic />}
            >
              Start Call
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CallPage; 