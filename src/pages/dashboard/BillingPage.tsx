import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Check,
  CreditCard,
  Download,
} from '@mui/icons-material';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

const BillingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
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

  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      date: new Date('2024-03-01'),
      amount: 13999,
      status: 'paid',
      description: 'Gold Plan - March 2024',
    },
    {
      id: 'INV-002',
      date: new Date('2024-02-01'),
      amount: 13999,
      status: 'paid',
      description: 'Gold Plan - February 2024',
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePaymentMethod = () => {
    // TODO: Implement payment method management
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Billing & Subscription
      </Typography>

      {/* Current Plan Section */}
      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Current Plan: Gold
            </Typography>
            <Button
              variant="outlined"
              startIcon={<CreditCard />}
              onClick={handlePaymentMethod}
            >
              Manage Payment Method
            </Button>
          </Box>
          <Typography color="textSecondary">
            Next billing date: April 1, 2024
          </Typography>
        </Paper>
      </Box>

      {/* Available Plans Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Available Plans
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
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
                <Button
                  fullWidth
                  variant={selectedPlan === plan.id ? 'contained' : 'outlined'}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled
                >
                  Pay
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Payment History Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Payment History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>
                    {invoice.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell align="right">
                    ₹{invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={
                        invoice.status === 'paid'
                          ? 'success.main'
                          : invoice.status === 'pending'
                          ? 'warning.main'
                          : 'error.main'
                      }
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      startIcon={<Download />}
                      size="small"
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BillingPage; 