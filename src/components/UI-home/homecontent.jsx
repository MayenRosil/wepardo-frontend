import * as React from 'react';
import Box from '@mui/material/Box';
import MediaCard from './mediaCard';




function MainContent() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'transparent',
        padding: "1em",
        height: "85vh",
        marginTop: 3,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}
    >
    < MediaCard />
      
    </Box>
  );
}

export default MainContent;
