import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchAPi";
import axios from 'axios';
const BASE_URL = 'https://youtube-v31.p.rapidapi.comvbv';


import { Videos, Sidebar } from "./";
// reactjs&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
export default function Feed() {
  const [videos, setVideos] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("New");
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      console.log("finally");
    })
  }, [selectedCategory]);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: {
            sx: "auto",
            md: "92vh",
          },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography
          className="copyright"
          variant="caption"
          color="textSecondary"
          sx={{ color: "#fff", mt: 0.5, opacity: 0.5 }}
        >
          CopyRight 2022 AlwDev
        </Typography>
      </Box>
      <Box sx={{ flex: 2, px: { sx: 0, md: 1 }, height: "90vh" }} p={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          color="textSecondary"
          sx={{ color: "#fff" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Feed</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
}
