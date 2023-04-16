import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {useContext} from 'react';
import {SearchContext} from '../contexts/SearchContext';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';

export default function MyFavourites({drawerWidth}) {
  const {favouriteList, doRemoveFavourite, doRemoveAllFavourite} =
    useContext(SearchContext);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
      }}
    >
      <Toolbar />
      <Typography variant="h6" noWrap component="div" sx={{margin: 2}}>
        My Favorites
      </Typography>
      <Divider />
      <Box sx={{overflow: 'auto'}}>
        {favouriteList && favouriteList.length > 0 ? (
          <List dense>
            {favouriteList.map((news, index) => (
              <ListItem
                key={`favourite-${index}`}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => doRemoveFavourite(news.title)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  LinkComponent={Link}
                  to={news.url}
                  target="_blank"
                >
                  <ListItemText primary={news.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="p" noWrap component="div" sx={{margin: 2}}>
            No Favourite yet
          </Typography>
        )}
      </Box>
      <Divider />
      <Button
        size="small"
        color="secondary"
        variant="outlined"
        sx={{margin: 2}}
        onClick={() => doRemoveAllFavourite()}
      >
        Delete all favourites
      </Button>
    </Drawer>
  );
}
