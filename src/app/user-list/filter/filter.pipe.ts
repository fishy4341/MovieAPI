import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(movies: any, args?: any): any {
    return movies
      ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(args.toLowerCase())
      )
      : [];
  }

}
