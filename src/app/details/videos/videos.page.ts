import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../../API/movie-api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {APIMovie} from "../../shared/apimovie";
import {APIVideoSearch} from "../../shared/apivideo-search";
import {APIVideo} from "../../shared/apivideo";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  constructor(private movieApi: MovieAPIService, public sanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  private id: number = Number(this.route.parent.snapshot.paramMap.get('id'));
  private movie$: Observable<APIMovie>;
  private video$: APIVideo[];
  private url: string;

  ngOnInit():void {
    this.movie$ = this.movieApi.getMovieDetail(this.id);
    this.movieApi.getMovieVideo(this.id).subscribe((data:APIVideoSearch) => {
      this.video$ = data.results;
      // @ts-ignore
      for(let i=0; i < this.video$.length; i++){
        this.video$[i].safeURL = this.cleanUrl(this.video$[i].key);
      }
    });
  }

  cleanUrl(url:string):SafeResourceUrl {
    const newUrl = `https://www.youtube.com/embed/${url}?showinfo=0&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
  }


}
