import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  constructor(private http: HttpClient) { }

  private apiKey: string = 'api_key=bf58ce7909a019c277bfd3ae8194e2bf';
  private baseUrl: string = 'https://api.themoviedb.org/3/';

  searchMovies(searchTerms: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.baseUrl}search/movie?${this.apiKey}&language=en-US&query=${searchTerms}&page=1&include_adult=false`);
  }
  getTopRated(page: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/top_rated?${this.apiKey}&language=en-US&page=${page}`);
  }
  getLatest(page: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/latest?${this.apiKey}&language=en-US&page=${page}`);
  }
  getNowPlaying(page: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/now_playing?${this.apiKey}&language=en-US&page=${page}`);
  }
  getPopular(page: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/popular?${this.apiKey}&language=en-US&page=${page}`);
  }
  getUpcoming(page: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/upcoming?${this.apiKey}&language=en-US&page=${page}`);
  }


  getMovieDetail(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/${id}?${this.apiKey}&language=en-US`);
  }

  getMovieVideo(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/${id}/videos?${this.apiKey}&language=en-US`);
  }

  getgenreIds(): Observable<Object> {
    return this.http.get(`${this.baseUrl}genre/movie/list?${this.apiKey}&language=en-US`);
  }

  getRelated(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/${id}/similar?${this.apiKey}&language=en-US`);
  }

  getRecommended(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}movie/${id}/recommendations?${this.apiKey}&language=en-US`);
  }


}



