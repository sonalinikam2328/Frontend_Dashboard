import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierWiseBoringRecoveryDetailsComponent } from './supplier-wise-boring-recovery-details.component';

describe('SupplierWiseBoringRecoveryDetailsComponent', () => {
  let component: SupplierWiseBoringRecoveryDetailsComponent;
  let fixture: ComponentFixture<SupplierWiseBoringRecoveryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierWiseBoringRecoveryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierWiseBoringRecoveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
