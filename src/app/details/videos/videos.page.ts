import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../../API/movie-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SelectedMovieService } from '../../API/selected-movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  constructor(private movieApi: MovieAPIService, public sanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  id = Number(this.route.parent.snapshot.paramMap.get('id'));
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
