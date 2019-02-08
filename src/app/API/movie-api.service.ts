import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {APIMovie} from "../shared/apimovie";
import {APISearchResult} from "../shared/apisearch-result";
import {APINowPlaying} from "../shared/apinow-playing";
import {APIVideoSearch} from "../shared/apivideo-search";
import {APIGenre} from "../shared/apigenre";

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  constructor(private http: HttpClient) { }

  private apiKey: string = 'api_key=bf58ce7909a019c277bfd3ae8194e2bf';
  private baseUrl: string = 'https://api.themoviedb.org/3/';

  searchMovies(searchTerms: string): Observable<APISearchResult> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<APISearchResult>(`${this.baseUrl}search/movie?${this.apiKey}&language=en-US&query=${searchTerms}&page=1&include_adult=false`);
  }
  getTopRated(page: number): Observable<APISearchResult> {
    return this.http.get<APISearchResult>(`${this.baseUrl}movie/top_rated?${this.apiKey}&language=en-US&page=${page}`);
  }
  getLatest(page: number): Observable<APIMovie> {
    return this.http.get<APIMovie>(`${this.baseUrl}movie/latest?${this.apiKey}&language=en-US&page=${page}`);
  }
  getNowPlaying(page: number): Observable<APINowPlaying> {
    return this.http.get<APINowPlaying>(`${this.baseUrl}movie/now_playing?${this.apiKey}&language=en-US&page=${page}`);
  }
  getPopular(page: number): Observable<APISearchResult> {
    return this.http.get<APISearchResult>(`${this.baseUrl}movie/popular?${this.apiKey}&language=en-US&page=${page}`);
  }
  getUpcoming(page: number): Observable<APINowPlaying> {
    return this.http.get<APINowPlaying>(`${this.baseUrl}movie/upcoming?${this.apiKey}&language=en-US&page=${page}`);
  }


  getMovieDetail(id: number): Observable<APIMovie> {
    return this.http.get<APIMovie>(`${this.baseUrl}movie/${id}?${this.apiKey}&language=en-US`);
  }

  getMovieVideo(id: number): Observable<APIVideoSearch> {
    return this.http.get<APIVideoSearch>(`${this.baseUrl}movie/${id}/videos?${this.apiKey}&language=en-US`);
  }

  getgenreIds(): Observable<APIGenre[]> {
    return this.http.get<APIGenre[]>(`${this.baseUrl}genre/movie/list?${this.apiKey}&language=en-US`);
  }

  getRelated(id: number): Observable<APISearchResult> {
    return this.http.get<APISearchResult>(`${this.baseUrl}movie/${id}/similar?${this.apiKey}&language=en-US`);
  }

  getRecommended(id: number): Observable<APISearchResult> {
    return this.http.get<APISearchResult>(`${this.baseUrl}movie/${id}/recommendations?${this.apiKey}&language=en-US`);
  }
}
