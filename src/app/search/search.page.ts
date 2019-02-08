import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {IonInput, LoadingController} from '@ionic/angular';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderFixService} from "../shared/loader-fix.service";
import {Observable} from "rxjs";
import {APISearchResult} from "../shared/apisearch-result";
import {APIMovie} from "../shared/apimovie";
import {APIGenre} from "../shared/apigenre";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private movieService: MovieAPIService,
    private router: Router,
    private loader: LoadingController,
    private route: ActivatedRoute,
    private loadingService: LoaderFixService
  ) { }

  private topRatedList: APIMovie[];
  private search: string;
  private searchResults: APIMovie[];
  private genres: APIGenre[] = [];
  private searching: boolean;

  ngOnInit(): void {
    this.movieService.getTopRated(1).subscribe( (list:APISearchResult) => {
      this.topRatedList = list['results'];
      if (!this.searchResults) { this.searchResults = this.topRatedList; }
    });
    this.movieService.getgenreIds().subscribe((list:APIGenre[]) => {
      const gen = list['genres'];
      this.genres = _.mapKeys(gen, 'id');
    });

  }

  Search(element:IonInput): void {
    if (element.value === '') {
      this.searchResults = null;
    } else {
      this.searching = true;
      this.movieService.searchMovies(element.value).subscribe((data:APISearchResult) => {
        this.searching = false;
        this.searchResults = data['results'];
      });
    }

  }

  async goToDetails(movieId): Promise<any> { // add async for loader
    this.loadingService.isLoading();
    const loading = await this.loader.create({
    });
    loading.present().then( _ => {
      this.router.navigate(['details', movieId]);
    });
  }

}
