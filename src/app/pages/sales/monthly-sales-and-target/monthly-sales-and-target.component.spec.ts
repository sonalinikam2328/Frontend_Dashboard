import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalesAndTargetComponent } from './monthly-sales-and-target.component';

describe('MonthlySalesAndTargetComponent', () => {
  let component: MonthlySalesAndTargetComponent;
  let fixture: ComponentFixture<MonthlySalesAndTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySalesAndTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlySalesAndTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
