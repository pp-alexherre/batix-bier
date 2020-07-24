import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../_services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    private requests: HttpRequest<any>[] = [];
    private INIT_INDEX = 0;

    public removeRequest(req:HttpRequest<any>){
        const INDEX = this.requests.indexOf(req);
        console.log('INDEX Interceptor --> ', INDEX)
        console.log('INDEX Interceptor requests--> ', this.requests)
        if( INDEX <= 0) {
            this.requests.splice(INDEX, 1 );
            this._loadingService.isLoading.next(this.requests.length > 0);
        }
        if( this.INIT_INDEX >= 4){
          console.log('%c in der SUBSCRIPTION Weiche','color: #8fc01a');
          this._loadingService.isLoading.next(false);
        }
    }

    constructor ( private _loadingService: LoadingService) {}

    public intercept( request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

        console.log('Request Interceptor -->', request);
        
        if( this.INIT_INDEX >= 4){
          console.info('%c in der SUBSCRIPTION Weiche','color: #8fc01a');
          this._loadingService.isLoading.next(true);
        }
        
        this.requests.push(request);
        console.log('Requests Array -->', this.requests);
        return new Observable( observer => {
            const SUBSCRIPTION = next.handle(request).subscribe( event => {
                console.log('SUBSCRIPTION Event --> ', event);
                this.INIT_INDEX++;
                console.log('SUBSCRIPTION INIT_INDEX --> ', this.INIT_INDEX);
                this.uploadProgressStateMessage(event, request);
                observer.next(event);
            }, err => {
                console.log('Error SUBSCRIPTION --> ', err);
            });
        });
    }

    // Helper Funktionen --------------------------------------------------------------------- //

    // Upload Status
    public uploadProgressStateMessage(event: HttpEvent<any>, request){
        switch (event.type){ 
    
          case HttpEventType.UploadProgress:
            console.log('HttpEventType.UploadProgress Weiche ');
            return this.fileProgress(event);
            break;
    
          case HttpEventType.Response:
            console.log('HttpEventType.Response Weiche ');
            this.removeRequest(request);
            return this.apiStatusResponse(event);
            break;
    
          default:
            // return `File "${formData.get('file').name}"`
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

