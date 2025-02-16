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

  const [cinemaworldLoading, setCinemaworldLoading] = useState(true);
  const [filmworldLoading, setFilmworldLoading] = useState(true);

  useEffect(() => {
    const fetchCinemaworldMovies = async () => {
        try {
            const cinemaWorldMovies = await getMovies("cinemaworld");
            setCinemaworldMovies(cinemaWorldMovies?.data as any);
        } catch (error)
        {
            console.error("Failed to fetch movies", error); // TODO: Have an error card pop onto website.
        }
    }

    const fetchFilmworldMovies = async () => {
      try {
          const filmworldMovies = await getMovies("filmworld");
          setFilmworldMovies(filmworldMovies?.data as any);
      } catch (error)
      {
          console.error("Failed to fetch movies", error); // TODO: Have an error card pop onto website.
      }
    }

      fetchCinemaworldMovies().then(() => {
          setCinemaworldLoading(false);
          console.log(cinemaworldLoading);
      });

      fetchFilmworldMovies().then(() => {
        setFilmworldLoading(false);
        console.log(filmworldMovies);
      });
    }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Container sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h2" gutterBottom>
            Cinema World Movies
          </Typography>
          {cinemaworldLoading ? <CircularProgress /> : <MovieCardScrollList movies={cinemaworldMovies} />}
        </Container>

        <Container sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h2" gutterBottom>
            Film World Movies
          </Typography>
          {filmworldLoading ? <CircularProgress /> : <MovieCardScrollList movies={filmworldMovies} />}
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;