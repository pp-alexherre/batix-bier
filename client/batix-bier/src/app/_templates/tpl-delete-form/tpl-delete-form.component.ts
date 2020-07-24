import { Component, OnInit } from '@angular/core';

import { ServerResponse } from '../../_interfaces/server-response/server-response';
import { GetDataService } from 'src/app/_services/getdata/get-data.service';

@Component({
  selector: 'bx-tpl-delete-form',
  templateUrl: './tpl-delete-form.component.html',
  styleUrls: ['./tpl-delete-form.component.less']
})
export class TplDeleteFormComponent implements OnInit {

  public statusMsgBox:boolean;
  public statusServerMsg:string;

  constructor(private _getDataService: GetDataService) {
    this.statusMsgBox = false;
    this.statusServerMsg = undefined;
   }

  ngOnInit() {
  }

  closeBox(){
    console.log('click delete close');
    this._getDataService.stateOverloayBoxDeletePing.emit(false);
  }

  onDelete(){
    console.log('click delete okay');
    this._getDataService.deleteAllEntries().subscribe((res:ServerResponse)  => {
      this.statusServerMsg = res.message;
      if(res.message){
        this.statusMsgBox = res.status;
        setTimeout(() => { 
          this.statusMsgBox = false;
          this._getDataService.stateOverloayBoxDeletePing.emit(false);
          this._getDataService.clearChartsetArrayAfterDelete.emit(true);
        },3000 );
      }
      console.log('Response Server Delete All Entries --> ', res);
    })
  }
}
