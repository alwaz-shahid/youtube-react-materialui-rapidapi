import React from "react";
import { Box, Button } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChannelDetail, Feed, Navbar, SearchFeed, VideoDetail } from "./components";

function App() {
  return (<div className="home">

    <BrowserRouter>
      <Box sx={{ backgroundColor: "black", minHeight: "100vh" }}>
    <Navbar/>
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </div>
  );
}

export default App;
