import { Pipe, PipeTransform } from '@angular/core';
import {Movie} from "../../shared/movie";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(movies: Movie[], args?: any): Movie[] {
    return movies
      ? movies.filter((movie:Movie) =>
        movie.title.toLowerCase().includes(args.toLowerCase())
      )
      : [];
  }

}
