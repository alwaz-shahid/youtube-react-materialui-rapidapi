import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const navigate = useNavigate();

  // const onhandleSubmit = (e) => {
  //   e.preventDefault();

  //   if (searchTerm) {
  //     navigate(`/search/${searchTerm}`);

  //     // setSearchTerm('');
  //   }
  // };
  const RotatingIconButton = () => {
    return (
      <IconButton
        type='submit'
        sx={{
          p: '5px',
          color: '#fff',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(360deg)',
          },
        }}
        aria-label='search'>
        <SettingsIcon />
      </IconButton>
    );
  };
  return (
    <Stack
      direction='row'
      alignItems='center'
      p={2}
      sx={{
        position: 'sticky',
        background: '#0d1b2a',
        top: 0,
        justifyContent: 'space-between',
      }}
      boxShadow={2}>
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='logo' height={35} />{' '}
      </Link>

      {/* SEATCHBART
      <Paper
        component='form'
        onSubmit={onhandleSubmit}
        sx={{
          borderRadius: 20,
          border: '1px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
        }}>
        <input
          className='search-bar'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          type='submit'
          sx={{ p: '5px', color: '#00272B' }}
          aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper> */}
      <SearchBar />
      <Stack direction='row' alignItems='center'>
        <RotatingIconButton />
        <Avatar
          sx={{
            bgcolor: '#FF5722',
            width: 24,
            height: 24,
            padding: 0.2,
            marginLeft: 0.5,
          }}>
          N
        </Avatar>
        {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> */}
      </Stack>
    </Stack>
  );
};

export default Navbar;
const SearchBar = () => {
  const navigate = useNavigate();
  const [showSearchField, setShowSearchField] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchToggle = () => {
    setShowSearchField(!showSearchField);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search logic here
    console.log('Searching for:', searchTerm);
    navigate(`/search/${searchTerm}`);
  };

  return (
    <Paper
      component='form'
      onSubmit={handleSearchSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: showSearchField ? 'flex-start' : 'center',
      }}>
      {!showSearchField ? (
        <IconButton
          type='button'
          sx={{ p: '5px', color: '#00272B' }}
          aria-label='search'
          onClick={handleSearchToggle}>
          <SearchIcon />
        </IconButton>
      ) : (
        <>
          <input
            className='search-bar'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            type='submit'
            sx={{ p: '5px', color: '#00272B' }}
            aria-label='search'>
            <SearchIcon />
          </IconButton>
        </>
      )}
    </Paper>
  );
};
