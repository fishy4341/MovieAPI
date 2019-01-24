import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../../API/movie-api.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SelectedMovieService} from "../../API/selected-movie.service";
import {ModalController} from "@ionic/angular";
import {RatingComponent} from "./rating/rating.component";
import {AuthService} from "../../login/auth.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  get movieId(): number {
    return this.selectedMovie.movieId;
  }

  constructor(private movieApi: MovieAPIService, public sanitizer: DomSanitizer, private selectedMovie: SelectedMovieService, public modalController: ModalController, private auth: AuthService) { }

  authenticated;
  id = this.movieId;
  movie$;
  private url: string;
  video: SafeResourceUrl;

  ngOnInit() {
    this.movie$ = this.movieApi.getMovieDetail(this.id);
    this.movieApi.getMovieVideo(this.id).subscribe(data => {
      this.url = `https://www.youtube.com/embed/?controls=0&showinfo=0&rel=0`;
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    });
    this.auth.isAuthenticated().subscribe( x => this.authenticated = x);
  }

  async presentModal(){
    const modal = await this.modalController.create({
      component: RatingComponent,
      componentProps: { value: this.movie$}
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

}
