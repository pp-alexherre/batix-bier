import { Component, OnInit } from '@angular/core';

import { GetDataService } from 'src/app/_services/getdata/get-data.service';
import { ChartItem } from './../../_interfaces/chart-item';
import { MetaData } from 'src/app/_interfaces/meta-data/meta-data';
import { ChartsetItem } from 'src/app/_interfaces/chatset-item/chartset-item';
import { CountryItem } from './../../_interfaces/meta-data/country-item';
import { UploadFileService } from 'src/app/_services/upload-file.service';
import { InternDataPingService } from 'src/app/_services/_intern/intern-data-ping.service';

@Component({
  selector: 'bx-section-chart',
  templateUrl: './section-chart.component.html',
  styleUrls: ['./section-chart.component.less']
})
export class SectionChartComponent implements OnInit {

  public $chartItemsArray:ChartItem[];

  public year = [];
  public beer = [];
  public years = [];
  public country = [];
  public countries:CountryItem[] = [];
  public chartDataSet = [];
  public chartTypeLine:string;
  public chartTypeBalken:string;
  public barChartLegend = true;
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  constructor(
    private _getChartService: GetDataService,
    private _uploadFileService: UploadFileService,
    private _internDataPing: InternDataPingService,) { 
    this.beer = [];
    this.country = ['Germany','SwitzerLand','Austria'];
    this.countries = [];
    this.chartTypeLine = 'line';
    this.chartTypeBalken = 'bar';
    this.$chartItemsArray = [];
    this.chartDataSet = [
      { data: [], label:'',backgroundColor:'', }
    ];
  }

  ngOnInit( ) {

    this.loadCharsetData(true);

    this._uploadFileService.statusUploadedPing.subscribe( res => {
      this.loadCharsetData(false);
    })

    this._getChartService.clearChartsetArrayAfterDelete.subscribe((res:boolean) => {
      if (res) {
        console.log('in der clearArrayWeiche')
        location.reload();
      }
    })

    this._internDataPing.chartsetUpdateItemPing.subscribe( res => {
      res.status ? this.loadItemToArray(res) : this.removeItemFromArray(res);
    })
  }

  loadCharsetData(init:boolean){

    this._getChartService.getCountries().subscribe((metadata:MetaData) => {
      metadata.countries.forEach((country:CountryItem) => {
        this.countries.push(country);
      })
      metadata.years.forEach((year:string) => {
        this.years.push(year);
      })
      this.years.sort(( obj1, obj2) => {
        return obj1 - obj2;
      })
      console.log('Array Metadata Countries --> ', this.countries)
      this._internDataPing.countryItemsPing.emit(this.countries)
    })

    this._getChartService.getChartItems().subscribe((res:ChartsetItem[]) => {
      console.log('items --> ', res);
      res.forEach((item:ChartsetItem) =>{
        this.chartDataSet.push(item);
      })
      console.log('array Daten von Server --> ', this.chartDataSet);
      if(init){
        console.log('-------------> in der Init Weiche <-------------')
        this.chartDataSet.shift();
      }
    })
  }

  getProperties( chartItems:ChartItem[] ):void {
    chartItems.forEach((chartItem:any ) => {
      if(!this.countries.includes(chartItem.country)){
        this.countries.push(chartItem.country)
      }
      if(!this.years.includes(chartItem.year)){
        this.years.push(chartItem.year);
      }
    })
  }

  loadItemToArray(item:CountryItem){
    console.log('loadItemToArray --> ', item);
    this._getChartService.getChartItem(item.group_id).subscribe((res:ChartsetItem[]) => {
      console.log('Server Response Get Chart Item --> ', res);
      res.forEach( (item:ChartsetItem) => {
        this.chartDataSet.push(item);
      })
    })
  }

  removeItemFromArray(item: CountryItem){
    this.chartDataSet.forEach( currentItemArray => {
      const INDEX = this.chartDataSet.indexOf(currentItemArray);
      if (currentItemArray.label == item.country){
        this.chartDataSet.splice(INDEX, 1)
      }
    })
  }
}
