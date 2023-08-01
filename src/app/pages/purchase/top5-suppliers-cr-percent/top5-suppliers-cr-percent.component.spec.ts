import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5SuppliersCRPercentComponent } from './top5-suppliers-cr-percent.component';

describe('Top5SuppliersCRPercentComponent', () => {
  let component: Top5SuppliersCRPercentComponent;
  let fixture: ComponentFixture<Top5SuppliersCRPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top5SuppliersCRPercentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top5SuppliersCRPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
