import { Box } from "@mui/material";
import { Movie } from "../../movie";
import MovieCard from "../Card/MovieCard";

interface Props {
    provider: string;
    movies: Movie[];
};

const MovieCardScrollList = (props: Props) => {

    return(
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, p: 1, scrollbarWidth: "thin", "&::-webkit-scrollbar": { height: 8 } }}>
            {props.movies && props.movies.length > 0 && props.movies.map((movie) =>
                <MovieCard provider={props.provider} movie={movie}></MovieCard>
            )}
        </Box>
    )
}

export default MovieCardScrollList;