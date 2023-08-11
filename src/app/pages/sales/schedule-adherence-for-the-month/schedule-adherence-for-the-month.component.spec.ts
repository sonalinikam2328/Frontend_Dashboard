import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAdherenceForTheMonthComponent } from './schedule-adherence-for-the-month.component';

describe('ScheduleAdherenceForTheMonthComponent', () => {
  let component: ScheduleAdherenceForTheMonthComponent;
  let fixture: ComponentFixture<ScheduleAdherenceForTheMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAdherenceForTheMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAdherenceForTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
