import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Movie } from "../../movie";
import { useState } from "react";

import defaultPoster from '../../assets/DefaultPoster.png'
import { Link } from "react-router-dom";

interface Props {
    movie: Movie;
};

const MovieCard = (props: Props) => {

  const [imagePoster, setImagePoster] = useState(props.movie.poster);

  return (
    <Card sx={{ minWidth: 200, maxWidth: 220, flexShrink: 0 }}>
      <Link to={`/movieDetailsPage/${"cinemaworld"}/${props.movie.id}`}>
        <CardMedia
          component="img"
          height="300"
          image={imagePoster}
          onError={e => {
            console.log("Set movie default poster for: ", props.movie.title)
            console.log("Error: ", e)
            setImagePoster(defaultPoster);
          }} // Call handleError if the image fails to load
        />
      </Link>
      <CardContent>
        <Typography variant="h6">{props.movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.movie.year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
