import {Movie} from "./movie";

export interface User {
    id: string;
    name: string;
    movieList: Movie[];
}
