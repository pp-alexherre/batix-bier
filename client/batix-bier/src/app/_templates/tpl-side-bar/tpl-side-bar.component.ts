import { Component, OnInit } from '@angular/core';

import { InternDataPingService } from 'src/app/_services/_intern/intern-data-ping.service';
import { CountryItem } from 'src/app/_interfaces/meta-data/country-item';

@Component({
  selector: 'bx-tpl-side-bar',
  templateUrl: './tpl-side-bar.component.html',
  styleUrls: ['./tpl-side-bar.component.less']
})
export class TplSideBarComponent implements OnInit {

  public $dataCountries:CountryItem[];

  constructor(private _internDataPingService: InternDataPingService) { 
    this.$dataCountries = [];
  }

  ngOnInit() {

    this._internDataPingService.countryItemsPing.subscribe((items:CountryItem[]) => {
      items.forEach((item:CountryItem) => {
        this.$dataCountries.push(item);
      })
    })
    
  }

}
