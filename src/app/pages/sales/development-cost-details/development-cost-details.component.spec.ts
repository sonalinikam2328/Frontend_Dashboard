import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentCostDetailsComponent } from './development-cost-details.component';

describe('DevelopmentCostDetailsComponent', () => {
  let component: DevelopmentCostDetailsComponent;
  let fixture: ComponentFixture<DevelopmentCostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentCostDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentCostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
