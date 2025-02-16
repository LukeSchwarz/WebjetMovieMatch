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

const checkImageValid = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(true); // Image loaded successfully.
    img.onerror = () => resolve(false); // Image failed to load.
  });
};

const HomePage = () => {

  const [cinemaworldMovies, setCinemaworldMovies] = useState<Movie[]>([]);
  const [filmworldMovies, setFilmworldMovies] = useState<Movie[]>([]);

  const [loadingCount, setLoadingCount] = useState(2); // Start with 2 (for both cinemaworld/filmworld API calls)

  useEffect(() => {
    const fetchCinemaworldMovies = async () => {
        try {
            const response = await getMovies("cinemaworld");
            setCinemaworldMovies(response?.data as any);
        } catch (error)
        {
            console.error("Failed to fetch movies", error); // TODO: Have an error card pop onto website.
        }
    }

    const fetchFilmworldMovies = async () => {
      try {
          const response = await getMovies("cinemaworld");
          setFilmworldMovies(response?.data as any);
      } catch (error)
      {
          console.error("Failed to fetch movies", error); // TODO: Have an error card pop onto website.
      }
    }

      fetchCinemaworldMovies().then(() => {
        setLoadingCount((prev) => prev - 1);
      });

      fetchFilmworldMovies().then(() => {
        setLoadingCount((prev) => prev - 1);
      });
    }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Container sx={{ textAlign: "center", py: 4 }}>
            {loadingCount > 0 && <CircularProgress />}
            <MovieCardScrollList movies={combineMovieLists(filmworldMovies, cinemaworldMovies)} />
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;