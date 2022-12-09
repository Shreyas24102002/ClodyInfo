import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          fontWeight="800"
          fontStyle="italic"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ flexGrow: 1 }}
        >
          CloudyInfo
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
