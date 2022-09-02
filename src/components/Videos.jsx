import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { ChannelCard, VideoCard } from "./";

export default function Videos({ videos }) {
  return (
    <Stack direction={"row"} flexWrap="wrap" justifyContent={"start"} gap={2}>
      {videos.map((item, index) => (
        <Box key={index}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.videoId && <ChannelCard channel={item} />}
        </Box>
      ))}
    </Stack>
  );
}
