import { Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { ProviderMovieMap } from "../../movie";
import { useEffect, useState } from "react";

import defaultPoster from '../../assets/DefaultPoster.png'
import { Link } from "react-router-dom";

interface Props {
    providerMovie: ProviderMovieMap;
};

const checkImageValid = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(true); // Image loaded successfully.
    img.onerror = () => resolve(false); // Image failed to load.
  });
};

const MovieCard = (props: Props) => {

  const [validMovie, setValidMovie] = useState(props.providerMovie.cinemaworldMovie ?? props.providerMovie.filmworldMovie);
  const [loading, setLoading] = useState(true);

  // Sometimes only one of the providers has a valid image, prioritise using the data from the provider with the valid poster image.
  useEffect(() => {
    const checkPosterImage = async () => {
      if (props.providerMovie.cinemaworldMovie && await checkImageValid(props.providerMovie.cinemaworldMovie.poster))
      {
        setValidMovie(props.providerMovie.cinemaworldMovie);
      }
      else if (props.providerMovie.filmworldMovie && await checkImageValid(props.providerMovie.filmworldMovie.poster))
      {
        setValidMovie(props.providerMovie.filmworldMovie);
      } 
    }

    checkPosterImage().then(() => {
      setLoading(false);
    });
  })

  return (
    <Card sx={{ minWidth: 200, maxWidth: 220, flexShrink: 0 }}>
      {loading ? (
        <Typography variant="h6" align="center">
          <CircularProgress />
        </Typography>
      ) : 
      (
        <Link to={`/movieDetailsPage/${props.providerMovie.cinemaworldMovie?.id}/${props.providerMovie.filmworldMovie?.id}`}>
          <CardMedia
            component="img"
            height="300"
            image={validMovie?.poster}
            alt={defaultPoster}
            onError={e => {
              console.log("Error: ", e)
            }} // Call handleError if the image fails to load
          />
        </Link>
      )}
      <CardContent>
        <Typography variant="h6">{validMovie?.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {validMovie?.year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
