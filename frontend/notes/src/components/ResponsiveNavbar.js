import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import { Link } from 'react-router-dom';

export default function ResponsiveNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { text: 'Search', to: '/' },
    { text: 'Add', to: '/add' },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Floating AppBar */}
      <AppBar
        position="fixed"
        color="default"
        elevation={3}
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1000, mx: 'auto', width: '100%' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="text.primary"
            sx={{
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1, // spacing between icon and text
            }}
          >
            <TipsAndUpdatesTwoToneIcon fontSize="medium" color='primary'/>
            Keep
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.to}
                  color="inherit"
                  sx={{ textTransform: 'none', fontWeight: 500, mx: 1 }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Toolbar spacer */}
      <Toolbar />

      {/* Drawer for mobile nav */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 200 }}>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.to}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      
    </>
  );
}
