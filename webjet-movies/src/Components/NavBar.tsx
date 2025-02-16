import { AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

// Default PNG Image Path
interface Props {
};

const MovieCard = (props: Props) => {
  return (
    <AppBar position="static">
    <Toolbar>
    <Link to="/">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Webjet Movies
        </Typography>
    </Link>
    </Toolbar>
  </AppBar>
  );
};

export default MovieCard;
