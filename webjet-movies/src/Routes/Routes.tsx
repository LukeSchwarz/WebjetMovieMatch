import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import MovieDetailsPage from "../Pages/MovieDetailsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "movieDetailsPage/:provider/:movieId", element: <MovieDetailsPage /> },
        ] 
    }
])
