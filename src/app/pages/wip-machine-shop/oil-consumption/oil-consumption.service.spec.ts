import { TestBed } from '@angular/core/testing';

import { OilConsumptionService } from './oil-consumption.service';

describe('OilConsumptionService', () => {
  let service: OilConsumptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OilConsumptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
