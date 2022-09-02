import { Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import {Searchbar} from "./";

export default function Navbar() {
  return (
    <Stack
      color={"white"}
      direction={"row"}
      alignItems={"center"}
      p={2}
      sx={{
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" height={45} />
      </Link>
      <Searchbar />
    </Stack>
  );
}
