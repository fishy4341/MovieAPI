import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  constructor(private http: HttpClient) { }

 apiKey = 'api_key=bf58ce7909a019c277bfd3ae8194e2bf';
  baseUrl = 'https://api.themoviedb.org/3/';
 // tslint:disable-next-line:max-line-length
 // readToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjU4Y2U3OTA5YTAxOWMyNzdiZmQzYWU4MTk0ZTJiZiIsInN1YiI6IjVjNDczYTQ2MGUwYTI2NDk1ZGNhMWI4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6i5lgiN-BAiYVPaREWXS1MMEpD7r4i0XMrjCKZ0rko';

  searchMovies(searchTerms: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.baseUrl}search/movie?${this.apiKey}&language=en-US&query=${searchTerms}&page=1&include_adult=false`);
  }

  getTopRated(page) {
    return this.http.get(`${this.baseUrl}movie/top_rated?${this.apiKey}&language=en-US&page=${page}`);
  }
  getLatest(page) {
    return this.http.get(`${this.baseUrl}movie/latest?${this.apiKey}&language=en-US&page=${page}`);
  }
  getNowPlaying(page) {
    return this.http.get(`${this.baseUrl}movie/now_playing?${this.apiKey}&language=en-US&page=${page}`);
  }
  getPopular(page) {
    return this.http.get(`${this.baseUrl}movie/popular?${this.apiKey}&language=en-US&page=${page}`);
  }
  getUpcoming(page) {
    return this.http.get(`${this.baseUrl}movie/upcoming?${this.apiKey}&language=en-US&page=${page}`);
  }


  getMovieDetail(id: number) {
    return this.http.get(`${this.baseUrl}movie/${id}?${this.apiKey}&language=en-US`);
  }

  getMovieVideo(id: number) {
    return this.http.get(`${this.baseUrl}movie/${id}/videos?${this.apiKey}&language=en-US`);
  }

  getgenreIds() {
    return this.http.get(`${this.baseUrl}genre/movie/list?${this.apiKey}&language=en-US`);
  }

  getRelated(id: number) {
    return this.http.get(`${this.baseUrl}movie/${id}/similar?${this.apiKey}&language=en-US`);
  }

  getRecommended(id: number) {
    return this.http.get(`${this.baseUrl}movie/${id}/recommendations?${this.apiKey}&language=en-US`);
  }


}



