import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyValueAdditionTargetVsActualComponent } from './monthly-value-addition-target-vs-actual.component';

describe('MonthlyValueAdditionTargetVsActualComponent', () => {
  let component: MonthlyValueAdditionTargetVsActualComponent;
  let fixture: ComponentFixture<MonthlyValueAdditionTargetVsActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyValueAdditionTargetVsActualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyValueAdditionTargetVsActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
