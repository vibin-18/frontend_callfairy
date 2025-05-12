import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Documentation', path: '/docs' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const NavButtons = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => handleNavigation(item.path)}
          sx={{
            mx: 1,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: isActive(item.path) ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
              width: '100%',
              height: 2,
              backgroundColor: 'white',
              transition: 'transform 0.3s ease',
            },
            '&:hover::after': {
              transform: 'translateX(-50%) scaleX(1)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleNavigation('/get-started')}
        sx={{ ml: 2 }}
      >
        Get Started
      </Button>
    </>
  );

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/logo.jpg"
            alt="Logo"
            sx={{
              height: 40,
              mr: 2,
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation('/')}
          />

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250, pt: 2 }}>
                  <List>
                    {navItems.map((item) => (
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton
                          onClick={() => handleNavigation(item.path)}
                          selected={isActive(item.path)}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => handleNavigation('/get-started')}>
                        <ListItemText
                          primary="Get Started"
                          primaryTypographyProps={{
                            color: 'primary',
                            fontWeight: 'bold',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <NavButtons />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation; 