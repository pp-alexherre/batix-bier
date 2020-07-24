import { Component, OnInit } from '@angular/core';

import { UploadFileService } from 'src/app/_services/upload-file.service';
import { GetDataService } from 'src/app/_services/getdata/get-data.service';


@Component({
  selector: 'bx-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.less']
})
export class PageDashboardComponent implements OnInit {

  constructor(
    private _uploadFileService: UploadFileService,
    private _getDataService: GetDataService) { }

  ngOnInit() {
  }

  openUploadBox():void{
    console.log('click upload');
    this._uploadFileService.statusFileUploadBoxPing.emit(true);
    
  }

  onDeleteDatabaseEntries(){
    console.log('click delete');
    this._getDataService.stateOverloayBoxDeletePing.emit(true);
  }

}
