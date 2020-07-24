import { Component, OnInit, Input } from '@angular/core';

import { CountryItem } from 'src/app/_interfaces/meta-data/country-item';
import { ChartsetItem } from './../../../_interfaces/chatset-item/chartset-item';
import { GetDataService } from 'src/app/_services/getdata/get-data.service';
import { InternDataPingService } from 'src/app/_services/_intern/intern-data-ping.service';


@Component({
  selector: 'bx-tpl-side-bar-item',
  templateUrl: './tpl-side-bar-item.component.html',
  styleUrls: ['./tpl-side-bar-item.component.less']
})
export class TplSideBarItemComponent implements OnInit {

  @Input() public $countryItem:CountryItem;


  constructor(
    private _getDataService:GetDataService,
    private _internDataPing:InternDataPingService) {
   }

  ngOnInit() {
  }

  loadItem():void{
    console.log('Load Item --> GroupID --> ', this.$countryItem.group_id + ' Land: ' + this.$countryItem.country);
    
    this._getDataService.updateCountryItem(this.$countryItem).subscribe((res:CountryItem) => {
      console.log('Server Response Country Item --> ', res);
      this.$countryItem.status = res.status;
      this._internDataPing.chartsetUpdateItemPing.emit(res);
    })
  }

  // activateItem(){
  //   console.log('activateItem');
  //   this.$countryItem.status = true;
  //   this._getDataService.updateCountryItem(this.$countryItem).subscribe((res:CountryItem) => {
  //     console.log('Server Response Country Item --> ', res);
  //   })
  // }

  // deactivateItem(){
  //   console.log('deactivateItem');
  //   console.log('activateItem');
  //   this.$countryItem.status = false;
  //   this._getDataService.updateCountryItem(this.$countryItem).subscribe((res:CountryItem) => {
  //     console.log('Server Response Country Item --> ', res);
  //   })
  // }

}
