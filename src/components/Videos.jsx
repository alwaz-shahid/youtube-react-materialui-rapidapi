import React, { useState } from 'react';
import { Stack, Box, Button } from '@mui/material';

import { ChannelCard, Loader, VideoCard } from './';
import { useMyContext } from '../store/context';
import { useEffect } from 'react';

const Videos = ({ videos, direction }) => {
  const [showMore, setShowMore] = useState(false);

  const { state } = useMyContext();
  useEffect(() => {
    // alert(JSON.stringify(state));
    // console.log(videos)
  }, []);
  if (!videos?.length) return <Loader />;

  const videosList = videos?.map((item, idx) => (
    <Box key={idx}>

      {item.id.videoId && <VideoCard video={item} />}
      {item.id.channelId && <ChannelCard channelDetail={item} />}
    </Box>
  ));
  const moreList = state?.videos?.map((item, idx) => (
    <Box key={idx}>
      {item.id.videoId && <VideoCard video={item} />}
      {item.id.channelId && <ChannelCard channelDetail={item} />}
    </Box>
  ));

  return (
    <Stack
      direction={direction || 'row'}
      flexWrap='wrap'
      justifyContent='space-evenly'
      alignItems='start'
      gap={2}>
      {videosList}
      {state?.videos && (
        <Button
          onClick={() => setShowMore(!showMore)}
          variant='contained'
          px={4}
          py={2}
          fullWidth>
          {' '}
          See more!
        </Button>
      )}
      {showMore && moreList}
    </Stack>
  );
};

export default Videos;
