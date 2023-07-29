import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCollectionPlanComponent } from './payment-collection-plan.component';

describe('PaymentCollectionPlanComponent', () => {
  let component: PaymentCollectionPlanComponent;
  let fixture: ComponentFixture<PaymentCollectionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCollectionPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCollectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
