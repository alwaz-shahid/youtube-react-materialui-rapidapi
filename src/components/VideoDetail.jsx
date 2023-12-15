import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';
import { Videos, Loader } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import RepeatIcon from '@mui/icons-material/Repeat';
import Favorite from '@mui/icons-material/Favorite';
import { addDataToLike, removeDataFromLike } from '../utils/db';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [cont, setCont] = useState({ loop: false, liked: false, pip: false });
  const [dataLoaded, setDataLoaded] = useState(false); // Add this state variable

  const handleLoopToggle = (p) => {
    if (p == 'loop') {
      setCont((prevState) => ({
        ...prevState,
        loop: !prevState.loop, // Toggle the loop state
      }));
    }
    if (p == 'pip') {
      setCont((prevState) => ({
        ...prevState,
        pip: !prevState.pip, // Toggle the loop state
      }));
    }
  };

  const { id } = useParams();

  // useEffect(() => {
  //   fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
  //     setVideoDetail(data.items[0]);
  //   });

  //   fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
  //     (data) => {
  //       setVideos(data.items);
  //     }
  //   );
  // }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await fetchFromAPI(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(videoData.items[0]);

        const relatedVideosData = await fetchFromAPI(
          `search?part=snippet&relatedToVideoId=${id}&type=video`
        );
        setVideos(relatedVideosData.items);

        setDataLoaded(true); // Set the state to indicate that data has been fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  // if (!videoDetail?.snippet) return <Loader />;
  if (!dataLoaded || !videoDetail?.snippet) {
    return <Loader />;
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  const handleLikedToggle = async () => {
    setCont((prevState) => ({
      ...prevState,
      liked: !prevState.liked, // Toggle the liked state
    }));

    // Add or remove the like in the IndexedDB based on the current liked state
    const { liked } = cont;
    const data = { id: videoDetail.id, snippet: videoDetail.snippet };

    try {
      if (!liked) {
        // If not liked (false), add the like to the database using addDataToLike function
        await addDataToLike(data);
      } else {
        // If already liked (true), remove the like from the database using removeDataFromLike function
        await removeDataFromLike(videoDetail.id);
      }
    } catch (error) {
      console.error('Error handling liked toggle:', error);
    }
  };

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'column' }} boxShadow={2}>
        <Box flex={1} position={'relative'}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className='react-player'
              controls
              playing
              pip={cont?.pip}
              loop={cont?.loop}
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
                    color: '#fff'
                  }}
                >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>

                {/* <Typography
                  variant={{ sm: 'subtitle1', md: 'h6' }}
                  pr={{ sm: 1, md: 3 }}
                  color='#fff'>
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                  />
                </Typography> */}
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
