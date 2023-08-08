import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySalesDataComponent } from './daily-sales-data.component';

describe('DailySalesDataComponent', () => {
  let component: DailySalesDataComponent;
  let fixture: ComponentFixture<DailySalesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailySalesDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailySalesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
