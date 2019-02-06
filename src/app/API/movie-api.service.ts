import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  constructor(private http: HttpClient) { }
  
  searchMovies(searchTerms: string): Observable<Object> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&query=${searchTerms}&page=1&include_adult=false`);
  }

  getTopRated(page): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=${page}`);
  }
  getLatest(page): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/latest?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=${page}`);
  }
  getNowPlaying(page): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=${page}`);
  }
  getPopular(page): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=${page}`);
  }
  getUpcoming(page): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=${page}`);
  }


  getMovieDetail(id: number): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }

  getMovieVideo(id: number): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }

  getgenreIds(): Observable<Object> {
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US');
  }

  getRelated(id: number): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }

  getRecommended(id: number): Observable<Object> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }


}



