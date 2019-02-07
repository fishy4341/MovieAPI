import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../../API/movie-api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  constructor(private movieApi: MovieAPIService, public sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  private id: number = Number(this.route.parent.snapshot.paramMap.get('id'));
  private movie$: Observable<Object>;
  private video$: Observable<Object>;

  ngOnInit():void {
    this.movie$ = this.movieApi.getMovieDetail(this.id);
    this.video$ = this.movieApi.getMovieVideo(this.id);
  }

  cleanUrl(url:string):SafeResourceUrl {
    const newUrl = `https://www.youtube.com/embed/${url}?showinfo=0&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
  }


}
