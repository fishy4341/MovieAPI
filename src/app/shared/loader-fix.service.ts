import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderFixService {

  private loading: boolean = false;
  private noLoad: boolean = false;

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


  checkDestroy(): boolean{
    return this.noLoad;
  }
  didDestroy(): void{
    this.noLoad = false;
  }
  notDestroyed(): void{
    this.noLoad = true;
  }

}
