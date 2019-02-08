import {APIMovie} from "./apimovie";

export interface APISearchResult {
    page: number;
    results: APIMovie[];
    total_pages: number;
    total_results: number;
}
