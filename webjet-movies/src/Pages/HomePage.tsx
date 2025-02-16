import { Container, ThemeProvider, createTheme, CssBaseline, CircularProgress } from "@mui/material";
import { Movie, ProviderMovieMap } from "../movie";
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

const createProviderMovieMap = (cinemaworldMovies: Movie[] | undefined, filmworldMovies: Movie[] | undefined): ProviderMovieMap[] => {
  const providerMap = new Map<string, ProviderMovieMap>();

  // Add Cinemaworld movies.
  cinemaworldMovies?.forEach((movie) => {
    if (!providerMap.has(movie.title)) {
      providerMap.set(movie.title, { title: movie.title, filmworldMovie: null, cinemaworldMovie: movie });
    }
  });

  // Add Filmworld movies.
  filmworldMovies?.forEach((movie) => {
    if (providerMap.has(movie.title)) {
      // Update existing entry.
      providerMap.get(movie.title)!.filmworldMovie = movie;
    } else {
      // Create new entry.
      providerMap.set(movie.title, { title: movie.title, filmworldMovie: movie, cinemaworldMovie: null });
    }
  });

  return Array.from(providerMap.values());
};


const HomePage = () => {

  const [cinemaworldMovies, setCinemaworldMovies] = useState<Movie[] | undefined>([]);
  const [filmworldMovies, setFilmworldMovies] = useState<Movie[] | undefined>([]);

  // const [providerMovieMap, setProviderMovieMap] = useState<Map<string, ProviderMovieMap>>([]);

  const [loadingCount, setLoadingCount] = useState(2); // Start with 2 (for both cinemaworld/filmworld API calls)

  useEffect(() => {
    const fetchCinemaworldMovies = async () => {
        try {
            const response = await getMovies("cinemaworld");
            setCinemaworldMovies(response?.data as Movie[] | undefined);
        } catch (error)
        {
            console.error("Failed to fetch movies", error); // TODO: Have an error card pop onto website.
        }
    }

    const fetchFilmworldMovies = async () => {
      try {
          const response = await getMovies("cinemaworld");
          setFilmworldMovies(response?.data as Movie[] | undefined);
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
            <MovieCardScrollList movies={createProviderMovieMap(filmworldMovies, cinemaworldMovies)} />
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;