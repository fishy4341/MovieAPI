import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../API/movie-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(private movieApi: MovieAPIService, private route: ActivatedRoute) { }
  id = Number(this.route.snapshot.paramMap.get('id'));
  movie$;
  ngOnInit() {
    this.movie$ = this.movieApi.getMovieDetail(this.id);
  }

}
