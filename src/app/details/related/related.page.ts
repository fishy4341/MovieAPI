import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../../API/movie-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-related',
  templateUrl: './related.page.html',
  styleUrls: ['./related.page.scss'],
})
export class RelatedPage implements OnInit {

  constructor(private movieApi: MovieAPIService,
              private route: ActivatedRoute,
              private router: Router) { }

  id;
  related$;

  ngOnInit() {
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.related$ = this.movieApi.getRelated(this.id);
  }

  goToMovie(movieId){
    this.router.navigate(['details', movieId]);
  }

}
