import { TestBed } from '@angular/core/testing';

import { InternDataPingService } from './intern-data-ping.service';

describe('ChartDataPingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternDataPingService = TestBed.get(InternDataPingService);
    expect(service).toBeTruthy();
  });
});
