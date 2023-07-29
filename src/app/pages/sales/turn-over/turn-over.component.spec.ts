import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnOverComponent } from './turn-over.component';

describe('TurnOverComponent', () => {
  let component: TurnOverComponent;
  let fixture: ComponentFixture<TurnOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnOverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
