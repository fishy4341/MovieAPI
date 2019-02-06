import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SelectedMovieService} from '../API/selected-movie.service';
import {NavParams} from "@ionic/angular";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit():void {
    this.router.navigate(['details', this.route.snapshot.paramMap.get('id'), 'movie-details']);

  }

}
