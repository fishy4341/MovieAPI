import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {SelectedMovieService} from '../API/selected-movie.service';
import {LoadingController} from '@ionic/angular';
import * as _ from 'lodash';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private movieService: MovieAPIService,
    private selectedMovie: SelectedMovieService,
    private router: Router,
    private loader: LoadingController) { }

  topRatedList;
  search: string;
  searchResults;
  genres = {};
  genreFilter;

  ngOnInit() {
    this.movieService.getTopRated().subscribe( list => {
      this.topRatedList = list['results'];
      if ( !this.searchResults ) {this.searchResults = this.topRatedList; }
    });
    this.movieService.getgenreIds().subscribe( list => {
      const gen = list['genres'];
      this.genres = _.mapKeys(gen, 'id' );
    });

  }

  Search(element) {
    if (element.value === '') {
      console.log('empty!');
      this.searchResults = this.topRatedList;
    } else {
      this.movieService.searchMovies(element.value).subscribe(data => {
        this.searchResults = data['results'];
      });
    }

  }

  goToDetails(movieId) { // add async for loader
    this.selectedMovie.movieId = movieId;
    this.router.navigate(['details', movieId]);
  }



}
