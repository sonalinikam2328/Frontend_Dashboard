import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierwisePurchaseAndCRInTonsComponent } from './supplierwise-purchase-and-cr-in-tons.component';

describe('SupplierwisePurchaseAndCRInTonsComponent', () => {
  let component: SupplierwisePurchaseAndCRInTonsComponent;
  let fixture: ComponentFixture<SupplierwisePurchaseAndCRInTonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierwisePurchaseAndCRInTonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierwisePurchaseAndCRInTonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
