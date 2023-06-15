import { IconButton, Paper, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useRef } from 'react';
import { useMyContext } from '../store/context';

export default function SearchBar() {
  const navigate = useNavigate();
  const [showSearchField, setShowSearchField] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { setValue, state } = useMyContext();
  const searchInputRef = useRef(null);
  // useEffect(() => {
  //   const history = getLocalData('searchHistory') || [];
  //   setSearchHistory(history.slice(-5)); // Display the latest 5 search terms
  // }, [getLocalData]);

  const handleSearchToggle = () => {
    setShowSearchField(!showSearchField);
    setAnchorEl(showSearchField ? null : searchInputRef.current);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      return; // Ignore empty search terms
    }
    if (window.location.href.includes('FocusPlayer')) {
      // Perform search logic here
      // const updatedHistory = [
      //   searchTerm,
      //   ...searchHistory.filter((term) => term !== searchTerm),
      // ];
      // setLocalData('searchHistory', updatedHistory);
      setValue('video', {
        searchTerm,
      });
      // alert(JSON.stringify(state));
    } else {
      // Navigate to a different route if "xyz" is not in the URL
      navigate(`/search/${searchTerm}`);
    }
    // Perform search logic here
    // const updatedHistory = [
    //   searchTerm,
    //   ...searchHistory.filter((term) => term !== searchTerm),
    // ];
    // setLocalData('searchHistory', updatedHistory);
    // navigate(`/search/${searchTerm}`);
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
          ref={searchInputRef}
          className='search-bar'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
    </div>
  );
}
