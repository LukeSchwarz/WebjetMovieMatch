export interface Movie {
    title: string;
    year: string;
    id: string;
    type: string;
    poster: string;
}

export interface MovieDetails {
    title: string;
    year: string;
    id: string;
    type: string;
    poster: string;
    
    release?: string;
    rated?: string;
    released?: string;
    runtime?: string;
    genre?: string;
    director?: string;
    writer?: string;
    actors?: string;
    plot?: string;
    language?: string;
    country?: string;
    awards?: string;
    metascore?: string;
    rating?: string;
    votes?: string;
    price?: string;
}