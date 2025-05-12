import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Phone, History, Settings, Analytics } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Start New Call',
      icon: <Phone sx={{ fontSize: 40 }} />,
      description: 'Initiate a new AI voice call',
      path: '/call',
    },
    {
      title: 'Call History',
      icon: <History sx={{ fontSize: 40 }} />,
      description: 'View past conversations',
      path: '/dashboard/history',
    },
    {
      title: 'Settings',
      icon: <Settings sx={{ fontSize: 40 }} />,
      description: 'Configure your preferences',
      path: '/dashboard/settings',
    },
    {
      title: 'Analytics',
      icon: <Analytics sx={{ fontSize: 40 }} />,
      description: 'View call statistics',
      path: '/dashboard/analytics',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <DashboardCard
              elevation={2}
              onClick={() => navigate(item.path)}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {item.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {item.description}
              </Typography>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" color="text.secondary">
            No recent calls. Start a new call to begin your conversation.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage; 