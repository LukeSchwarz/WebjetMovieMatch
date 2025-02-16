import axios from "axios";
import { Movie } from "./movie";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

interface GetMoviesResponse
{
    data: Movie[];
}

export const getMovies = async (provider: string) =>
{
    try
    {
        const data = await axios.get<GetMoviesResponse>(`${API_URL}/${provider}/movies`)
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
        const data = await axios.get<GetMoviesResponse>(`${API_URL}/${provider}/movie/${movieId}`)
        return data;
    }
    catch (error)
    {
        console.log("Error Message: ", error);
    }
}