import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addDataToSearchBar } from '../utils/db';
import SearchTermView from './SearchTermView';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchViewVisible, setSearchViewVisible] = useState(false);
  const searchViewRef = useRef(null); // Create a ref for the SearchTermView component

  const handleSearchFocus = () => {
    setSearchViewVisible(true);
  };

  const handleSearchBlur = () => {
    // Hide the search view with a slight delay to allow click on the view
    setTimeout(() => {
      setSearchViewVisible(false);
    }, 200);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Perform search logic here
    // console.log('Searching for:', searchTerm);

    // Store the search term in the offline database
    await addDataToSearchBar({ term: searchTerm });

    navigate(`/search/${searchTerm}`);
  };

  useEffect(() => {
    // Event listener to close the component when clicking outside
    const handleOutsideClick = (event) => {
      if (
        searchViewRef.current &&
        !searchViewRef.current.contains(event.target)
      ) {
        // Click outside the component, close it
        setSearchViewVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

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
        position: 'relative',
        justifyContent: 'flex-start', // Always show search bar to the left
      }}>
      <input
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleSearchFocus} // Show the search view when the input is focused
        onBlur={handleSearchBlur} // Hide the search view when the input loses focus
      />
      <IconButton
        type='submit'
        sx={{ p: '5px', color: '#00272B' }}
        aria-label='search'>
        <SearchIcon />
      </IconButton>

      {/* Conditionally render the SearchTermView component */}
      {searchViewVisible && <SearchTermView ref={searchViewRef} />}
    </Paper>
  );
}
