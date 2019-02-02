import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  constructor(private http: HttpClient) { }

 // apiKey = 'bf58ce7909a019c277bfd3ae8194e2bf';
 // tslint:disable-next-line:max-line-length
 // readToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjU4Y2U3OTA5YTAxOWMyNzdiZmQzYWU4MTk0ZTJiZiIsInN1YiI6IjVjNDczYTQ2MGUwYTI2NDk1ZGNhMWI4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6i5lgiN-BAiYVPaREWXS1MMEpD7r4i0XMrjCKZ0rko';

  searchMovies(searchTerms: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&query=${searchTerms}&page=1&include_adult=false`);
  }

  getTopRated() {
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=1`);
  }
  getLatest() {
    return this.http.get(`https://api.themoviedb.org/3/movie/latest?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=1`);
  }
  getNowPlaying() {
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=1`);
  }
  getPopular() {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=1`);
  }
  getUpcoming() {
    return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US&page=1`);
  }


  getMovieDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }

  getMovieVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }

  getgenreIds() {
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US');
  }

  getRelated(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }

  getRecommended(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bf58ce7909a019c277bfd3ae8194e2bf&language=en-US`);
  }


}



