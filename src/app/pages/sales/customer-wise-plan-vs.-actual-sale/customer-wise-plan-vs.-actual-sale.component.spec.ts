import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWisePlanVsActualSaleComponent } from './customer-wise-plan-vs.-actual-sale.component';

describe('CustomerWisePlanVsActualSaleComponent', () => {
  let component: CustomerWisePlanVsActualSaleComponent;
  let fixture: ComponentFixture<CustomerWisePlanVsActualSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWisePlanVsActualSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWisePlanVsActualSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
