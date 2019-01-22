import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../API/movie-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor( private movieService: MovieAPIService) { }

  filteredList;
  topRatedList;


  ngOnInit() {
    this.movieService.getTopRated().subscribe( list => {
      this.topRatedList = list['results'];
      if ( !this.filteredList ) {this.filteredList = this.topRatedList; }
      console.log(this.filteredList);
    });

  }

}
