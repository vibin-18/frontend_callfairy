import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Mic,
  Speed,
  Security,
  Language,
  AutoAwesome,
  Psychology,
  Cloud,
  Devices,
} from '@mui/icons-material';

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px)',
      },
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ color: 'primary.main', mb: 2 }}>{icon}</Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const FeaturesPage: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Mic sx={{ fontSize: 40 }} />,
      title: 'Natural Voice Conversations',
      description: 'Experience fluid, human-like conversations with our advanced AI voice models. Our technology understands context, emotions, and nuances in speech.',
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Real-time Processing',
      description: 'Minimal latency with our optimized voice processing pipeline. Experience instant responses and seamless conversations.',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and security measures for your voice data. Your conversations are protected with state-of-the-art security protocols.',
    },
    {
      icon: <Language sx={{ fontSize: 40 }} />,
      title: 'Multi-language Support',
      description: 'Communicate in multiple languages with accurate translations. Our AI understands and speaks over 50 languages fluently.',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40 }} />,
      title: 'Custom Voice Models',
      description: 'Train and deploy custom voice models for your specific needs. Create unique voice personas that match your brand identity.',
    },
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: 'Advanced AI',
      description: 'Powered by state-of-the-art machine learning models. Our AI continuously learns and improves from interactions.',
    },
    {
      icon: <Cloud sx={{ fontSize: 40 }} />,
      title: 'Cloud Infrastructure',
      description: 'Scalable and reliable cloud infrastructure ensures high availability and performance for your voice applications.',
    },
    {
      icon: <Devices sx={{ fontSize: 40 }} />,
      title: 'Cross-platform Support',
      description: 'Access your AI voice calling solution from any device. Seamless experience across web, mobile, and desktop platforms.',
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
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Powerful Features
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}
          >
            Discover the advanced capabilities of our AI voice calling platform
          </Typography>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
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
            <FeatureCard key={index} {...feature} />
          ))}
        </Box>
      </Container>

      {/* Integration Section */}
      <Box
        sx={{
          bgcolor: 'grey.50',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
              },
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h3" gutterBottom>
                Easy Integration
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Integrate our AI voice calling solution into your existing applications with our comprehensive API and SDK.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                • RESTful API for seamless integration
                <br />
                • SDKs for popular programming languages
                <br />
                • Detailed documentation and examples
                <br />
                • Dedicated support team
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                src="/integration.png"
                alt="API Integration"
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
    </Box>
  );
};

export default FeaturesPage; 