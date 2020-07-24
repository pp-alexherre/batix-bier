import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = new BehaviorSubject(false);
  public loadingStatus:boolean;

  constructor() { 
    this.isLoading.subscribe((status:boolean) => {
      console.log('Loading Status Änderung --> ', status);
      this.loadingStatus = status;
    })
  }
}
