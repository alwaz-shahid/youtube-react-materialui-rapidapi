import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from '../utils/constants';

const FocusVideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => (
  <Card
    sx={{
      width: { xs: '100%', sm: '500px', md: '300px' },
      boxShadow: 'none',
      borderRadius: 2,
      minWidth: { xs: '100%', sm: '500px', md: '300px' },
      '&:hover': {
        opacity: 0.72,
      },
    }}>
    <CardMedia
      image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
      alt={snippet?.title}
      sx={{ width: { xs: '100%', sm: '358px' }, height: 150 }}
    />

    <CardContent sx={{ backgroundColor: '#1E1E1E', height: '106px' }}>
      <Typography variant='subtitle1' fontWeight='bold' color='#FFF'>
        {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
      </Typography>

      <Typography variant='subtitle2' color='gray'>
        {snippet?.channelTitle || demoChannelTitle}
        <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
      </Typography>
    </CardContent>
  </Card>
);

export default FocusVideoCard;
