import axios from "axios";
import { Movie } from "./movie";

interface GetMoviesResponse
{
    data: Movie[];
}

export const getMovies = async (provider: string) =>
{
    try
    {
        const data = await axios.get<GetMoviesResponse>(`http://localhost:5000/${provider}/movies`)
        return data;
    }
    catch (error)
    {
        console.log("Error Message: ", error);
    }
}

export const getMovieDetailsById = async (provider: string | undefined, movieId: string | undefined) =>
{
    try
    {
        const data = await axios.get<GetMoviesResponse>(`http://localhost:5000/${provider}/movie/${movieId}`)
        return data;
    }
    catch (error)
    {
        console.log("Error Message: ", error);
    }
}