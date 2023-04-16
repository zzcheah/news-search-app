import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {useNavigate} from 'react-router-dom';
import {SearchContext} from '../contexts/SearchContext';
import {Button} from '@mui/material';

const menuId = 'account-menu';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [localKeyword, setLocalKeyword] = React.useState('');

  const {doSearch} = React.useContext(SearchContext);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const doLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={doLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="fixed" sx={{zIndex: theme => theme.zIndex.drawer + 1}}>
      <Toolbar>
        <Typography variant="h5" noWrap component="header">
          News Search App
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={localKeyword}
            onChange={e => setLocalKeyword(e.target.value)}
            // inputProps={{'aria-label': 'search'}}
          />
        </Search>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => doSearch(localKeyword)}
        >
          Search
        </Button>
        <Box sx={{flexGrow: 1}} />
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
}
