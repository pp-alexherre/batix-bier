import { Injectable, EventEmitter } from '@angular/core';

import { CountryItem } from '../../_interfaces/meta-data/country-item'

@Injectable({
  providedIn: 'root'
})
export class InternDataPingService {

  public countryItemsPing: EventEmitter<CountryItem[]> = new EventEmitter<CountryItem[]>();
  public chartsetUpdateItemPing: EventEmitter<CountryItem> = new EventEmitter<CountryItem>();

  constructor() { }
}
