import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos } from './';
import { useMyContext } from '../store/context';

export default function FocusPlayer() {
  const [videos, setVideos] = useState(null);
  const { state } = useMyContext();
  let searchTerm = state?.video?.searchTerm;
  //   const { searchTerm } = state?.video;
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);

  return (
    <Box p={2} minHeight='95vh'>
      {state?.video?.searchTerm && (
        <Typography
          variant='h4'
          fontWeight={900}
          color='white'
          mb={3}
          ml={{ sm: '100px' }}>
          Search Results for{' '}
          <span style={{ color: '#0092FF' }}>{searchTerm}</span> videos{' '}
        </Typography>
      )}
      <Box display='flex'>
        <Box sx={{ mr: { sm: '100px' } }} />
        {!state?.video?.searchTerm ? (
          <Typography
            variant='h4'
            fontWeight={900}
            color='white'
            mb={3}
            ml={{ sm: '100px' }}>
            <span style={{ color: '#0092FF' }}>Please enter search term</span>{' '}
            to watch AD free YT videos{' '}
            <span style={{ color: '#0092FF' }}>AD free YT</span>
          </Typography>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  );
}
