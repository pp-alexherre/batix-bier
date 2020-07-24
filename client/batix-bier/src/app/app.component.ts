import { Component, OnInit } from '@angular/core';

import { UploadFileService } from './_services/upload-file.service';
import { GetDataService } from './_services/getdata/get-data.service';
import { LoadingService } from './_services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  
  title = 'BATIX Bier Chart';

  public statusOverlay:boolean;
  public statusUploadBox$:boolean;
  public statusDeleteBox$:boolean;
  public statusSideBar:boolean;

  constructor(
    private _uploadFileService: UploadFileService,
    private _getDataService: GetDataService,
    public _loadingService: LoadingService){

    this.statusOverlay = false;
    this.statusUploadBox$ = false;
    this.statusDeleteBox$ = false;
    this.statusSideBar = false;

  }
  ngOnInit(){
    this._uploadFileService.statusFileUploadBoxPing.subscribe((status:boolean) => {
      this.statusOverlay = status;
      this.statusUploadBox$ = status;
      this.statusDeleteBox$ = !status;
    })
    
    this._getDataService.stateOverloayBoxDeletePing.subscribe((status:boolean) => {
      this.statusOverlay = status;
      this.statusDeleteBox$ = status;
      this.statusUploadBox$ = !status;
    })
  }

  closeUploadBox():void {
    this.statusOverlay = false;
    this.statusDeleteBox$ = false;
    this.statusUploadBox$ = false;

  }

  openCloseSideBar():void{
    console.log('click Side Bar Banner');
  }
}
