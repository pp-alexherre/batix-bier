import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  public statusFileUploadBoxPing:EventEmitter<boolean> = new EventEmitter<boolean>();
  public statusFileDeleteBoxPing:EventEmitter<boolean> = new EventEmitter<boolean>();
  public statusUploadedPing:EventEmitter<boolean> = new EventEmitter<boolean>();

  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':'multipart/form-data; boundary=hiereinzufaelligerBullshit',
      // 'Content-Type': 'multipart/form-data; boundary=' + Math.random(),
      // 'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }
  private serverUrl = 'https://api.batix.herre.info/1.0.1';

  constructor(private _http: HttpClient) { }


  uploadFile(file: File): Observable<any>{
    let formData: FormData = new FormData();
    formData.append('type', file.name);
    formData.append('file', file, file.name);


    return this._http.post(`${this.serverUrl}/uploadfile`, formData,{
      reportProgress: true,
      observe: 'events'
    }).pipe(map( event => this.uploadStateMessage(event, formData)), catchError( err => {
      console.log('Error State --> ', err);
      return throwError(err);
    }));
  }

  public uploadStateMessage(event: HttpEvent<any>, formData){
    switch (event.type){ 

      case HttpEventType.UploadProgress:
        console.log('HttpEventType.UploadProgress Weiche ');
        return this.fileProgress(event);
        break;

      case HttpEventType.Response:
        console.log('HttpEventType.Response Weiche ');
        return this.apiStatusResponse(event);
        break;

      default:
        return `File "${formData.get('file').name}"`
    }
  }

  private fileProgress(event){
    const persenctDone = Math.round(event.loaded / event.total * 100);
    return { status: 'progressBar', value: persenctDone };
  }

  private apiStatusResponse(event){
    return event.body;
  }
}
