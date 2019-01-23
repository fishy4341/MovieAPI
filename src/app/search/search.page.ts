import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {SelectedMovieService} from "../API/selected-movie.service";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor( private movieService: MovieAPIService, private selectedMovie: SelectedMovieService, private navController: NavController) { }

  topRatedList;
  search: string;
  searchResults;

  ngOnInit() {
    this.movieService.getTopRated().subscribe( list => {
      this.topRatedList = list['results'];
      if ( !this.searchResults ) {this.searchResults = this.topRatedList; }
    });

  }

  Search(value) {
    console.log(value);
    if (value == "") {
      console.log('empty!');
      this.searchResults = this.topRatedList;
    }
    else{
      this.movieService.searchMovies(value).subscribe(data => {
        this.searchResults = data['results'];
      });
      console.log(this.searchResults);
    }

  }

  goToDetails(movieId) {
    console.log(movieId);
    this.selectedMovie.movieId = movieId;
    this.navController.navigateForward('details')
  }

}
