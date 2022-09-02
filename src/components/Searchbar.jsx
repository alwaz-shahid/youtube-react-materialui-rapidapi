import { Search } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import React from "react";

export default function Searchbar() {
  return (
    <Paper
      component={"form"}
      onSubmit={() => {}}
      sx={{
        borderRadius: 20,
        pl: 2,
        border: "1px solid #e3e3e3",
        mr:{sm:5},
        boxShadow:'none',
        overflow:'hidden',
      }}
    >
    <input className="search-bar" type="text" placeholder="Search" value="" onChange={()=>{}} />
      <IconButton type="submit" aria-label="search"sx={
        {
            color: "red",
            p:'10px'
        }
      }>
        <Search/>
      </IconButton>
    </Paper>
  );
}
