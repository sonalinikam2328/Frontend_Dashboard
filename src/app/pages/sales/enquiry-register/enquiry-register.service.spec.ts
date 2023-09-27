import { TestBed } from '@angular/core/testing';

import { EnquiryRegisterService } from './enquiry-register.service';

describe('EnquiryRegisterService', () => {
  let service: EnquiryRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
