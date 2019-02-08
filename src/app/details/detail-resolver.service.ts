import {Injectable} from '@angular/core';
import {MovieAPIService} from "../API/movie-api.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {catchError, mergeMap, take} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DetailResolverService {

    constructor(
        private movieApi: MovieAPIService,
        private router: Router,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
        let id = Number(route.paramMap.get('id'));
        return this.movieApi.getMovieDetail(id).pipe(
            catchError(error => {
                if (error.status == 404) {
                    this.router.navigate(['/search']);
                    return EMPTY;
                } else {
                    take(1),
                        mergeMap(crisis => {
                            return of(crisis);
                        })
                }
            })
        )
    }
}
