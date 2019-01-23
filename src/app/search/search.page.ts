import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor( private movieService: MovieAPIService) { }

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
    this.movieService.searchMovies(value).subscribe(data => {
      this.searchResults = data['results'];
    });
    console.log(this.searchResults);
  }

}
