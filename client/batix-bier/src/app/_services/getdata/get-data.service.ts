import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {ChartsetItem } from './../../_interfaces/chatset-item/chartset-item';
import { ServerResponse } from './../../_interfaces/server-response/server-response';
import { MetaData } from 'src/app/_interfaces/meta-data/meta-data';
import { CountryItem } from 'src/app/_interfaces/meta-data/country-item';
import { ThemeService } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
    })
  }
  private serverUrl = 'https://api.batix.herre.info/1.0.1';

  constructor(private _http: HttpClient) { }

  public stateOverloayBoxDeletePing: EventEmitter<boolean> = new EventEmitter<boolean>();
  public clearChartsetArrayAfterDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  public getChartItems():Observable<ChartsetItem[]>{
    return this._http.get<ChartsetItem[]>(`${this.serverUrl}/getchartsetdata`, this.httpOptions)
    .pipe(map(Items => this._invertArray(Items), catchError( (err) => throwError(err) )));
  }

  public getChartItem(id:number):Observable<ChartsetItem[]>{
    const currentHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'groupid': `${id}`
      })
    }
    return this._http.get<ChartsetItem[]>(`${this.serverUrl}/getchartsetitem`, currentHttpOptions)
    .pipe(map(Item =>this._invertArray(Item), catchError( (err) => throwError(err) )));
  }

  public getCountries():Observable<MetaData>{
    return this._http.get<MetaData>(`${this.serverUrl}/getmetadata`, this.httpOptions);
  }

  public deleteAllEntries():Observable<ServerResponse>{
    return this._http.post<ServerResponse>(`${this.serverUrl}/deleteallentries`, this.httpOptions);
  }

  public updateCountryItem(countryItem:CountryItem):Observable<CountryItem>{
    return this._http.put<CountryItem>(`${this.serverUrl}/updatecountryitem`, countryItem ,this.httpOptions);
  }



  // ----------------------   Helper Functionen ---------------------------- //

  private _invertArray =  array => {
    array.forEach(element => {
      element.data = element.data.reverse();
    }); 
    return array;
  }

}


