import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReceivableChartComponent } from './customer-receivable-chart.component';

describe('CustomerReceivableChartComponent', () => {
  let component: CustomerReceivableChartComponent;
  let fixture: ComponentFixture<CustomerReceivableChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReceivableChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReceivableChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
