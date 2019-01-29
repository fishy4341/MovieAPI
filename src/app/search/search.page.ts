import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {SelectedMovieService} from '../API/selected-movie.service';
import {Router} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor( private movieService: MovieAPIService, private selectedMovie: SelectedMovieService, private navController: NavController, private loader: LoadingController) { }

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
      console.log(gen);
      this.genres = _.mapKeys(gen, 'id' );
    });

  }

  Search(value) {
    console.log(value);
    if (value === '') {
      console.log('empty!');
      this.searchResults = this.topRatedList;
    } else {
      this.movieService.searchMovies(value).subscribe(data => {
        this.searchResults = data['results'];
      });
    }

  }

  goToDetails(movieId) { //add async for loader
    // const loading = await this.loader.create({
    //   content: 'Loading',
    //   animation: 'fade-in',
    //   showBackdrop: true,
    //   maxWidth: 300,
    //   showDelay: 0
    // });
    // loading.present().then(_ => {
    //   // this.router.navigate(['tournaments']);
    // });
    console.log(movieId);
    this.selectedMovie.movieId = movieId;
    this.navController.navigateForward('details');
  }



}
