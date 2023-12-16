import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Divider, Stack } from '@mui/material';

import { Videos, Loader, VideoCard } from './'; // Assuming you have Videos and Loader components
import { getAllDataFromLike } from '../utils/db';

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

    if (!dataLoaded) {
        return <Loader />;
    }

    return (
        <Box minHeight='95vh'>
            <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
                <Typography variant='h6' py={2} sx={{ opacity: 0.7 }} color='#fff'>
                    Liked Videos
                </Typography>
                {/* {JSON.stringify(likedVideos)} */}
                <Stack
                    direction={'row'}
                    flexWrap='wrap'
                    justifyContent='space-evenly'
                    alignItems='start'
                    gap={2}>

                    {likedVideos && likedVideos.length > 0 ? 
                        likedVideos.map((item, id) => <VideoCard video={item} key={id} />) 

                     : (
                        <Typography variant='body1' sx={{ opacity: 0.7 }} color='#fff'>
                            You haven't liked any videos yet.
                        </Typography>
                    )}
                </Stack>
            </Box>
            <Divider />
        </Box>
    );
};

export default LikedVideos;
