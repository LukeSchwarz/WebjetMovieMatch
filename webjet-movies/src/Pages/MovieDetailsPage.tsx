import { Card, CardContent, Typography, Box, CardMedia, Divider, Container, CircularProgress } from '@mui/material';
import { MovieDetails } from '../movie';
import { getMovieDetailsById } from '../api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate for back button navigation

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const { provider, movieId } = useParams<{ provider: string; movieId: string }>(); // Extract provider and id from URL

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Try and fetch movie details');

        const movieDetails = await getMovieDetailsById(provider, movieId);
        setMovie(movieDetails?.data as any);
      } catch (error) {
        console.error('Failed to fetch movies', error); // TODO: Have an error card pop onto website.
      }
    };

    fetchMovies().then(() => {
      setLoading(false);
    });
  }, [provider, movieId]);

  return (
    <Container sx={{ py: 4 }}>
      {loading ? (
        <Typography variant="h6" align="center">
          <CircularProgress />
        </Typography>
      ) : movie ? (
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
                image={movie?.poster || ''}
                alt={`Poster of ${movie?.title}`}
              />
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "goldenrod" }}>
                Price ${movie?.price}
              </Typography>
            </CardContent>
            </Card>
          </Box>

          {/* Movie Information Section */}
          <Box sx={{ maxWidth: 600 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {movie?.title} ({movie?.year})
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Main Price */}
                {movie?.price && (
                  <Typography variant="h6" gutterBottom color="primary">
                    <strong>Price:</strong> {movie?.price}
                  </Typography>
                )}
                {/* Other Movie Details */}
                {movie?.type && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Type:</strong> {movie?.type}
                  </Typography>
                )}
                {movie?.release && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Release:</strong> {movie?.release}
                  </Typography>
                )}
                {movie?.rated && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Rated:</strong> {movie?.rated}
                  </Typography>
                )}
                {movie?.runtime && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Runtime:</strong> {movie?.runtime}
                  </Typography>
                )}
                {movie?.genre && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Genre:</strong> {movie?.genre}
                  </Typography>
                )}
                {movie?.director && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Director:</strong> {movie?.director}
                  </Typography>
                )}
                {movie?.writer && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Writer:</strong> {movie?.writer}
                  </Typography>
                )}
                {movie?.actors && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Actors:</strong> {movie?.actors}
                  </Typography>
                )}
                {movie?.plot && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Plot:</strong> {movie?.plot}
                  </Typography>
                )}
                {movie?.language && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Language:</strong> {movie?.language}
                  </Typography>
                )}
                {movie?.country && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Country:</strong> {movie?.country}
                  </Typography>
                )}
                {movie?.awards && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Awards:</strong> {movie?.awards}
                  </Typography>
                )}
                {movie?.metascore && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Metascore:</strong> {movie?.metascore}
                  </Typography>
                )}
                {movie?.rating && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Rating:</strong> {movie?.rating}
                  </Typography>
                )}
                {movie?.votes && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Votes:</strong> {movie?.votes}
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
