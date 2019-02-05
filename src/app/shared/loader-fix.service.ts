import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderFixService {

  private loading: boolean = false;

  constructor() { }

  isLoading(): void{
    this.loading = true;
  }
  stopLoading(): void{
    this.loading = false;
  }
  getLoading(): boolean{
    return this.loading;
  }

}
