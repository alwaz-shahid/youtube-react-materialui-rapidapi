import { Stack } from "@mui/system";
import React from "react";
import { categories } from "../utils/constants";

export default function Sidebar({ setSelectedCategory, selectedCategory }) {
  return (
    <Stack
      direction={"row"}
      sx={{
        overflowY: "auto",
        height: {
          sx: "auto",
          md: "95%",
        },
        flexDirection: { md: "column" },
      }}
      className="fc"
    >
      {categories.map((category, index) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background:
              category.name === selectedCategory ? "#FC1503" : "transparent",
            color: "white",
          }}
          key={index}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}
            className="category-name"
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? 1 : 0.8,
              marginRight: "15px",
            }}
            className="category-name"
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}
