import { TestBed } from '@angular/core/testing';

import { SalaryServiceService } from '../services/salary-service.service';

describe('SalaryServiceService', () => {
  let service: SalaryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
