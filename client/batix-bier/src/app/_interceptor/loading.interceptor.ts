import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../_services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    private requests: HttpRequest<any>[] = [];

    public removeRequest(req:HttpRequest<any>){
        const INDEX = this.requests.indexOf(req);
        console.log('INDEX Interceptor --> ', INDEX)
        if( INDEX <= 0) {
            this.requests.splice(INDEX, 1 );
        }
        this._loadingService.isLoading.next(this.requests.length > 0);
    }

    constructor ( private _loadingService: LoadingService) {}

    public intercept( request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

        console.log('Request Interceptor -->', request);

        this.requests.push(request);
        this._loadingService.isLoading.next(true);

        console.log('Requests Array -->', this.requests);
        return new Observable( observer => {
            const SUBSCRIPTION = next.handle(request).subscribe( event => {
                console.log('SUBSCRIPTION Event --> ', event);
                // if ( event instanceof HttpResponse ){
                //     this.removeRequest(request);
                //     observer.next(event);
                //     console.log('remove requests --> ', request.url);
                // }
                this.uploadStateMessage(event, request);
                observer.next(event);
            }, err => {
                console.log('Error SUBSCRIPTION --> ', err);
            });
        });
    }
    public uploadStateMessage(event: HttpEvent<any>, request){
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

