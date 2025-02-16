import { Card, CardContent, Typography, Box, CardMedia, Divider, Container, CircularProgress } from '@mui/material';
import { MovieDetails } from '../movie';
import { getMovieDetailsById } from '../api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate for back button navigation

const MovieDetailsPage = () => {
  const [cinemaWorldMovie, setCinemaWorldMovie] = useState<MovieDetails | null>(null);
  const [filmWorldMovie, setFilmWorldMovie] = useState<MovieDetails | null>(null);

  const [loadingCount, setLoadingCount] = useState(2); // Start with 2 (for both cinemaworld/filmworld API calls)
  const navigate = useNavigate(); // Initialize useNavigate

  const { movieId } = useParams<{ movieId: string }>(); // Extract provider and id from URL

  useEffect(() => {
    const fetchCinemaworldMovies = async () => {
      try {
        const movieDetails = await getMovieDetailsById("cinemaworld", movieId);
        setCinemaWorldMovie(movieDetails?.data as any);
        console.log("cinemaworld price: $", cinemaWorldMovie?.price);
      } catch (error) {
        console.error('Failed to fetch movies', error); // TODO: Have an error card pop onto website.
      }
    };

    const fetchFilmworldMovies = async () => {
      try {
        const movieDetails = await getMovieDetailsById("filmworld", movieId);
        setFilmWorldMovie(movieDetails?.data as any);
        console.log("filmworld price: $", filmWorldMovie?.price);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchCinemaworldMovies().then(() => {
      setLoadingCount((prev) => prev - 1);
    });

    fetchFilmworldMovies().then(() => {
      setLoadingCount((prev) => prev - 1);
    });
  }, [movieId]);

  var lowestPriceMovie = undefined;
  var lowestPricedProvider = "";
  if (cinemaWorldMovie)
  {
    lowestPriceMovie = cinemaWorldMovie;
    lowestPricedProvider = "Cinema World";
  }
  
  if (filmWorldMovie)
  {
    if (!lowestPriceMovie || parseFloat(lowestPriceMovie.price) > parseFloat(filmWorldMovie.price))
    {
      lowestPriceMovie = filmWorldMovie;
      lowestPricedProvider = "Cinema World";
    }
  }
  
  console.log("cinemaworld price: $", cinemaWorldMovie?.price);
  console.log("filmworld price: $", filmWorldMovie?.price);
  return (
    <Container sx={{ py: 4 }}>
      {loadingCount > 0 ? (
        <Typography variant="h6" align="center">
          <CircularProgress />
        </Typography>
      ) : lowestPriceMovie ? (
        <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
          {/* Movie Poster Section */}
          <Box
            sx={{
              maxWidth: 400,
              mb: { xs: 3, sm: 0 },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={lowestPriceMovie?.poster || ''}
                alt={`Poster of ${lowestPriceMovie?.title}`}
              />
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "goldenrod" }}>
                Lowest Price ${lowestPriceMovie?.price}
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "goldenrod" }}>
                From {lowestPricedProvider}
              </Typography>
            </CardContent>
            </Card>
          </Box>

          {/* Movie Information Section */}
          <Box sx={{ maxWidth: 600 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {lowestPriceMovie?.title} ({lowestPriceMovie?.year})
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Main Price */}
                {lowestPriceMovie?.price && (
                  <Typography variant="h6" gutterBottom color="primary">
                    <strong>Price:</strong> {lowestPriceMovie?.price}
                  </Typography>
                )}
                {/* Other Movie Details */}
                {lowestPriceMovie?.type && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Type:</strong> {lowestPriceMovie?.type}
                  </Typography>
                )}
                {lowestPriceMovie?.release && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Release:</strong> {lowestPriceMovie?.release}
                  </Typography>
                )}
                {lowestPriceMovie?.rated && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Rated:</strong> {lowestPriceMovie?.rated}
                  </Typography>
                )}
                {lowestPriceMovie?.runtime && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Runtime:</strong> {lowestPriceMovie?.runtime}
                  </Typography>
                )}
                {lowestPriceMovie?.genre && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Genre:</strong> {lowestPriceMovie?.genre}
                  </Typography>
                )}
                {lowestPriceMovie?.director && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Director:</strong> {lowestPriceMovie?.director}
                  </Typography>
                )}
                {lowestPriceMovie?.writer && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Writer:</strong> {lowestPriceMovie?.writer}
                  </Typography>
                )}
                {lowestPriceMovie?.actors && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Actors:</strong> {lowestPriceMovie?.actors}
                  </Typography>
                )}
                {lowestPriceMovie?.plot && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Plot:</strong> {lowestPriceMovie?.plot}
                  </Typography>
                )}
                {lowestPriceMovie?.language && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Language:</strong> {lowestPriceMovie?.language}
                  </Typography>
                )}
                {lowestPriceMovie?.country && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Country:</strong> {lowestPriceMovie?.country}
                  </Typography>
                )}
                {lowestPriceMovie?.awards && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Awards:</strong> {lowestPriceMovie?.awards}
                  </Typography>
                )}
                {lowestPriceMovie?.metascore && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Metascore:</strong> {lowestPriceMovie?.metascore}
                  </Typography>
                )}
                {lowestPriceMovie?.rating && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Rating:</strong> {lowestPriceMovie?.rating}
                  </Typography>
                )}
                {lowestPriceMovie?.votes && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Votes:</strong> {lowestPriceMovie?.votes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" align="center">
          Movie details not available.
        </Typography>
      )}
    </Container>
  );
};

export default MovieDetailsPage;
