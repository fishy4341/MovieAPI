import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../API/movie-api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private searchApi: MovieAPIService) { }

  search: string;
  searchResults;

  ngOnInit() {
  }

  Search(value){
    console.log(value);
    this.searchApi.searchMovies(value).subscribe(data => {
      this.searchResults = data.results;
    });
  }

}
