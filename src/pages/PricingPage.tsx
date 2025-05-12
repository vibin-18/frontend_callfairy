import React from 'react';
import {
  Box, Card, CardContent, CardActions, Typography, Button, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import { Check } from '@mui/icons-material';

const plans = [
  {
    id: 'base',
    name: 'Base',
    price: 7999,
    features: [
      '100 minutes of calls per month',
      'Basic voice models',
      'Email support',
      'Call recording',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 13999,
    features: [
      '500 minutes of calls per month',
      'Premium voice models',
      'Priority support',
      'Advanced analytics',
      'Custom voice training',
    ],
    recommended: true,
  },
  {
    id: 'plat',
    name: 'Plat',
    price: 17999,
    features: [
      'Unlimited calls',
      'Custom voice models',
      '24/7 support',
      'Advanced analytics',
      'API access',
      'Custom integrations',
    ],
  },
];

const PricingPage: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Pricing Plans
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {plans.map((plan) => (
        <Card
          key={plan.id}
          sx={{
            flex: '1 1 300px',
            minWidth: 280,
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            ...(plan.recommended && {
              border: '2px solid',
              borderColor: 'primary.main',
            }),
          }}
        >
          {plan.recommended && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                bgcolor: 'primary.main',
                color: 'white',
                px: 2,
                py: 0.5,
                borderBottomLeftRadius: 8,
              }}
            >
              Recommended
            </Box>
          )}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              {plan.name}
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              ₹{plan.price.toLocaleString()}
              <Typography
                component="span"
                variant="subtitle1"
                color="textSecondary"
              >
                /month
              </Typography>
            </Typography>
            <List>
              {plan.features.map((feature) => (
                <ListItem key={feature} disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <Button fullWidth variant="contained" color="secondary" disabled>
              Pay
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  </Box>
);

export default PricingPage; 