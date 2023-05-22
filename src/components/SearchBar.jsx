import { IconButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function SearchBar() {
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
}
