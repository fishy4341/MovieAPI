export interface Movie {
    title: string;
    movieID: number;
    rating: number;
    comment: string;
    hasSeen: boolean;
}
export interface Movie2 {
    title: string;
    movieID: number;
    pic: string;
    genres: [];
    rating?: number;
}