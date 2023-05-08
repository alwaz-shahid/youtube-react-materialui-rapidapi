import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      // setSearchTerm('');
    }
  };
  return (
    <Stack
      direction='row'
      alignItems='center'
      p={2}
      sx={{
        position: 'sticky',
        background: '#00272B',
        top: 0,
        justifyContent: 'space-between',
      }}>
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='logo' height={35} />{' '}
      </Link>

      {/* SEATCHBART */}
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
      </Paper>
    </Stack>
  );
};

export default Navbar;
