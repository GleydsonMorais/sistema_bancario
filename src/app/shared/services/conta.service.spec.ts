import { TestBed } from '@angular/core/testing';

import { ContaService } from './conta.service';

describe('ClienteService', () => {
  let service: ContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
