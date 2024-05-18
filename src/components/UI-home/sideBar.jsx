import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const drawerWidth = 240;

function Sidebar() {
  const menuItems = ['Inicio','Mis puntos', 'Prestaciones', 'Configuraciones'];
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'top', height: '100%', background: '#E0E0E0' }}>
        <List sx={{mt: 7}}>
          {menuItems.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {(() => {
                    switch (index) {
                      case 0:
                        return <HomeIcon />;
                      case 1:
                        return <CardGiftcardIcon />;
                      case 2:
                        return <SelfImprovementIcon />;
                      case 3:
                        return <SettingsIcon />;
                        default:
                        return null;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
