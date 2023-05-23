import { IconButton, Paper, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useMyContext } from '../store/context';

export default function SearchBar() {
  const navigate = useNavigate();
  const [showSearchField, setShowSearchField] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { setLocalData, getLocalData } = useMyContext();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = getLocalData('searchHistory') || [];
    setSearchHistory(history.slice(-5)); // Display the latest 5 search terms
  }, [getLocalData]);

  const handleSearchToggle = () => {
    setShowSearchField(!showSearchField);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      return; // Ignore empty search terms
    }
    // Perform search logic here
    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter((term) => term !== searchTerm),
    ];
    setLocalData('searchHistory', updatedHistory);
    navigate(`/search/${searchTerm}`);
  };

  const handleSearchHistoryClick = (term) => {
    setSearchTerm(term);
    navigate(`/search/${term}`);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Paper
        component='form'
        onSubmit={handleSearchSubmit}
        sx={{
          borderRadius: 20,
          border: '2px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Always display the search field
        }}
        onClick={handleClick}
        aria-describedby={id}>
        <IconButton
          type='button'
          sx={{ color: '#00272B' }}
          aria-label='search'
          onClick={handleSearchToggle}>
          <SearchIcon />
        </IconButton>

        <input
          className='search-bar'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '8px' }}>
          {searchHistory.map((term, index) => (
            <Typography
              key={index}
              variant='body2'
              onClick={() => handleSearchHistoryClick(term)}
              style={{ cursor: 'pointer', marginBottom: '4px' }}>
              {term}
            </Typography>
          ))}

          {searchHistory.length > 5 && (
            <Typography
              variant='body2'
              onClick={() => console.log('Show more clicked')}
              style={{ cursor: 'pointer', marginBottom: '4px' }}>
              Show More
            </Typography>
          )}
        </div>
      </Popover>
    </div>
  );
}
