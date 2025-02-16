import { Box } from "@mui/material";
import { Movie } from "../../movie";
import MovieCard from "../Card/MovieCard";

interface Props {
    movies: Movie[];
};

const MovieCardScrollList = (props: Props) => {

    return(
        <Box key={"MainBox2"} sx={{ display: "flex", overflowX: "auto", gap: 2, p: 1, scrollbarWidth: "thin", "&::-webkit-scrollbar": { height: 8 } }}>
            {props.movies && props.movies.length > 0 && props.movies.map((movie) =>
                <MovieCard movie={movie}></MovieCard>
            )}
        </Box>
    )
}

export default MovieCardScrollList;