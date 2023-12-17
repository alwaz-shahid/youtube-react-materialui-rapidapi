import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Stack, Button } from '@mui/material';

import { Loader, VideoCard } from './'; // Assuming you have Videos and Loader components
import { getAllDataFromLike, deleteAllDataFromLike, clearSearchBar } from '../utils/db';

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const likedVideosData = await getAllDataFromLike();
        setLikedVideos(likedVideosData);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching liked videos:', error);
      }
    };

    fetchLikedVideos();
  }, []);

  const handleClearLikedVideos = async () => {
    try {
      await deleteAllDataFromLike();
      setLikedVideos([]);
    } catch (error) {
      console.error('Error clearing liked videos:', error);
    }
  };

  const handleClearSearchBar = async () => {
    try {
      await clearSearchBar();
      // Additional logic if needed, such as clearing the displayed search bar history
    } catch (error) {
      console.error('Error clearing search bar:', error);
    }
  };

  if (!dataLoaded) {
    return <Loader />;
  }

  return (
    <Box minHeight='95vh'>
      <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
        <Typography variant='h6' py={2} sx={{ opacity: 0.7 }} color='#fff'>
          Liked Videos
        </Typography>
        <Stack
          direction={'row'}
          flexWrap='wrap'
          justifyContent='space-evenly'
          alignItems='start'
          gap={2}>
          {likedVideos && likedVideos.length > 0 ? (
            likedVideos.map((item, id) => <VideoCard video={item} vid={item.id} key={id} />)
          ) : (
            <Typography variant='body1' sx={{ opacity: 0.7 }} color='#fff'>
              You haven't liked any videos yet.
            </Typography>
          )}
        </Stack>
 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
 <Button onClick={handleClearLikedVideos} variant="contained" color="error" sx={{margin:2}}>
          Clear Liked Videos
        </Button>
        <Button onClick={handleClearSearchBar} variant="contained" color="warning" sx={{margin:2}} >
          Clear Search Bar
        </Button>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default LikedVideos;
