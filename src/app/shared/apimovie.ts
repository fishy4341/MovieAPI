import {APIGenre} from "./apigenre";
import {APIProdCompany} from "./apiprod-company";
import {APIProdCountry} from "./apiprod-country";
import {APILanguage} from "./apilanguage";

export interface APIMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any;
    budget: number;
    genres: APIGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: APIProdCompany[];
    production_countries: APIProdCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: APILanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
