import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';

interface Settings {
  voiceEnabled: boolean;
  autoRecord: boolean;
  defaultLanguage: string;
  voiceModel: string;
  callTimeout: number;
  transcriptionEnabled: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    voiceEnabled: true,
    autoRecord: true,
    defaultLanguage: 'en-US',
    voiceModel: 'default',
    callTimeout: 30,
    transcriptionEnabled: true,
  });

  const handleChange = (field: keyof Settings) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement settings save logic
    console.log('Saving settings:', settings);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Voice Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.voiceEnabled}
                  onChange={handleChange('voiceEnabled')}
                />
              }
              label="Enable Voice"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoRecord}
                  onChange={handleChange('autoRecord')}
                />
              }
              label="Auto Record Calls"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Default Language</InputLabel>
              <Select
                value={settings.defaultLanguage}
                onChange={handleChange('defaultLanguage')}
                label="Default Language"
              >
                <MenuItem value="en-US">English (US)</MenuItem>
                <MenuItem value="es-ES">Spanish</MenuItem>
                <MenuItem value="fr-FR">French</MenuItem>
                <MenuItem value="de-DE">German</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Voice Model</InputLabel>
              <Select
                value={settings.voiceModel}
                onChange={handleChange('voiceModel')}
                label="Voice Model"
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Call Timeout (seconds)"
              value={settings.callTimeout}
              onChange={handleChange('callTimeout')}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.transcriptionEnabled}
                  onChange={handleChange('transcriptionEnabled')}
                />
              }
              label="Enable Call Transcription"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save Settings
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SettingsPage; 