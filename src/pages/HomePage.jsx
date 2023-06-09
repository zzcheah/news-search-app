import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import MyFavourites from '../components/MyFavourites';
import Header from '../components/Header';
import NewsItem from '../components/NewsItems';

const drawerWidth = 240;

function HomePage({setIsLoggedIn}) {
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Header setIsLoggedIn={setIsLoggedIn} />
      <MyFavourites drawerWidth={drawerWidth} />
      <NewsItem />
    </Box>
  );
}

export default HomePage;
