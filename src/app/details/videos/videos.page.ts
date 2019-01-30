import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../../API/movie-api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SelectedMovieService} from '../../API/selected-movie.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  get movieId(): number {
    return this.selectedMovie.movieId;
  }

  constructor(private movieApi: MovieAPIService, public sanitizer: DomSanitizer, private selectedMovie: SelectedMovieService) { }

  id = this.movieId;
  movie$;
  private url: string;
  video$;

  ngOnInit() {
    this.movie$ = this.movieApi.getMovieDetail(this.id);
    this.video$ = this.movieApi.getMovieVideo(this.id);
  }

  cleanUrl(url) {
    const newUrl = `https://www.youtube.com/embed/${url}?showinfo=0&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
  }


}
