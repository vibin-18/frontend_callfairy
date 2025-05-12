import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Mic,
  Speed,
  Security,
  Language,
  AutoAwesome,
} from '@mui/icons-material';

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <Mic sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Natural Voice Conversations',
      description: 'Engage in fluid, natural conversations with our advanced AI voice models.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-time Processing',
      description: 'Experience minimal latency with our optimized voice processing pipeline.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and security measures for your voice data.',
    },
    {
      icon: <Language sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Multi-language Support',
      description: 'Communicate in multiple languages with accurate translations.',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Custom Voice Models',
      description: 'Train and deploy custom voice models for your specific needs.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                AI Voice Calling
                <br />
                <Box component="span" sx={{ display: 'inline-block' }}>
                  <GradientText>
                    Reimagined
                  </GradientText>
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Experience the future of voice communication with our advanced AI technology.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: { xs: 'none', md: 'block' },
              }}
            >
              <Box
                component="img"
                src="/Voice AI assistant.jpg"
                alt="AI Voice Calling"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 8, fontWeight: 700 }}
        >
          Powerful Features
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h5" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </FeatureCard>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Ready to Transform Your Voice Communication?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 6, opacity: 0.9 }}
          >
            Join thousands of businesses already using our AI voice calling platform.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Start Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 