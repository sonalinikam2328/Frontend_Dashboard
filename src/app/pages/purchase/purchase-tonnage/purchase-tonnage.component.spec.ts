import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTonnageComponent } from './purchase-tonnage.component';

describe('PurchaseTonnageComponent', () => {
  let component: PurchaseTonnageComponent;
  let fixture: ComponentFixture<PurchaseTonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTonnageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseTonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
