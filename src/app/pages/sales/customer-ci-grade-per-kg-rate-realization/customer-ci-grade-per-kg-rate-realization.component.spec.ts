import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCIGradePerKgRateRealizationComponent } from './customer-ci-grade-per-kg-rate-realization.component';

describe('CustomerCIGradePerKgRateRealizationComponent', () => {
  let component: CustomerCIGradePerKgRateRealizationComponent;
  let fixture: ComponentFixture<CustomerCIGradePerKgRateRealizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCIGradePerKgRateRealizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCIGradePerKgRateRealizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
