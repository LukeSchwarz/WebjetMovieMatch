import { Typography, Container, ThemeProvider, createTheme, CssBaseline, CircularProgress } from "@mui/material";
import { Movie } from "../movie";
import { useEffect, useState } from "react";
import { getMovies } from "../api";
import MovieCardScrollList from "../Components/Card List/MovieCardScrollList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const HomePage = () => {

  const [cinemaworldMovies, setCinemaworldMovies] = useState<Movie[]>([]);
  const [filmworldMovies, setFilmworldMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const cinemaWorldMovies = await getMovies("cinemaworld");
            setCinemaworldMovies(cinemaWorldMovies?.data as any);

            const filmworldMovies = await getMovies("filmworld");
            setFilmworldMovies(filmworldMovies?.data as any);
        } catch (error)
        {
            console.error("Failed to fetch movies", error); // TODO: Have an error card pop onto website.
        }
    }

    fetchMovies().then(() => {
        setLoading(false);
    });
  }, [])

  console.log("Cinema World: ", cinemaworldMovies);
  console.log("Film World: ", filmworldMovies);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Hero Section */}
      <Container sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h2" gutterBottom>
          Find Movies At The Best Prices!
        </Typography>
      </Container>

      {/* Scrollable Movie List */}
      <Container sx={{ py: 4 }}>
        {loading ? (
            <CircularProgress />
        ) : 
        (
        <div>
            <MovieCardScrollList movies={cinemaworldMovies}></MovieCardScrollList>
            <MovieCardScrollList movies={filmworldMovies}></MovieCardScrollList>
        </div>
        )}

      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
