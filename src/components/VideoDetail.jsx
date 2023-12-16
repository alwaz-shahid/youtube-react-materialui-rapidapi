import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import RepeatIcon from '@mui/icons-material/Repeat';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';

import { Videos, Loader } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { addDataToLike, removeDataFromLike, getAllDataFromLike } from '../utils/db';

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [cont, setCont] = useState({ loop: false, liked: false, pip: false });
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleLoopToggle = (property) => {
    setCont((prevState) => ({
      ...prevState,
      [property]: !prevState[property], // Toggle the specified state property
    }));
  };

  const fetchLikedVideos = useCallback(async () => {
    try {
      const likedVideos = await getAllDataFromLike();
      const isLiked = likedVideos.some((video) => video.id === id);
      setCont((prevState) => ({
        ...prevState,
        liked: isLiked,
      }));
    } catch (error) {
      console.error('Error fetching liked videos:', error);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchLikedVideos();

        const [videoData, relatedVideosData] = await Promise.all([
          fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
          fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`),
        ]);

        setVideoDetail(videoData.items[0]);
        setVideos(relatedVideosData.items);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, fetchLikedVideos]);

  useEffect(() => {
    const handleMediaSession = () => {
      if (navigator.mediaSession && videoDetail?.snippet) {
        const { title, channelTitle } = videoDetail.snippet;
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: title || 'Video Title',
          artist: channelTitle || 'Channel Title',
          artwork: [
            { src: 'path-to-thumbnail', sizes: '96x96', type: 'image/png' },
          ],
        });

        navigator.mediaSession.setActionHandler('play', () => {
          // Handle play action
        });

        navigator.mediaSession.setActionHandler('pause', () => {
          // Handle pause action
        });
      }
    };

    handleMediaSession();
  }, [videoDetail]);

  const handleLikedToggle = async () => {
    setCont((prevState) => ({
      ...prevState,
      liked: !prevState.liked,
    }));

    const { liked } = cont;
    const data = { id: videoDetail.id, snippet: videoDetail.snippet };

    try {
      if (!liked) {
        await addDataToLike(data);
      } else {
        await removeDataFromLike(videoDetail.id);
      }
    } catch (error) {
      console.error('Error handling liked toggle:', error);
    }
  };

  if (!dataLoaded || !videoDetail?.snippet) {
    return <Loader />;
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'column' }} boxShadow={2}>
        <Box flex={1} position='relative'>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className='react-player'
              controls
              playing
              pip={cont.pip}
              loop={cont.loop}
            />
            <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: '#fff' }}
              py={1}
              px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography
                  sx={{
                    variant: { sm: 'subtitle1', md: 'h6' },
                    color: '#fff',
                  }}
                >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
              px={2}>
              <IconButton
                type='button'
                sx={{ p: '5px', color: cont.liked ? '#0466c8' : '#fff' }}
                aria-label='like song'
                onClick={handleLikedToggle}>
                <ThumbUpAltIcon />
              </IconButton>
              <IconButton
                type='button'
                sx={{ p: '5px', color: cont.loop ? '#0466c8' : '#fff' }}
                aria-label='repeat song'
                onClick={() => handleLoopToggle('loop')}>
                <RepeatIcon />
              </IconButton>
              <IconButton
                onClick={() => handleLoopToggle('pip')}
                type='button'
                sx={{ p: '5px', color: cont.pip ? '#fff' : '#e71d36' }}
                aria-label='repeat song'>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent='center'
          alignItems='center'
          borderTop={1}
          borderColor={'gray'}
          mt={2}>
          <Typography variant='h6' py={2} sx={{ opacity: 0.7 }} color='#fff'>
            Related Videos
          </Typography>
          <Videos videos={videos} direction={{ xs: 'column', md: 'row' }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
