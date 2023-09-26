import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseComplaintsReceivedComponent } from './customer-wise-complaints-received.component';

describe('CustomerWiseComplaintsReceivedComponent', () => {
  let component: CustomerWiseComplaintsReceivedComponent;
  let fixture: ComponentFixture<CustomerWiseComplaintsReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWiseComplaintsReceivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWiseComplaintsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
