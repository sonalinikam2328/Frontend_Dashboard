import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilConsumptionComponent } from './oil-consumption.component';

describe('OilConsumptionComponent', () => {
  let component: OilConsumptionComponent;
  let fixture: ComponentFixture<OilConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilConsumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OilConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
