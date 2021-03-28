import { TestBed } from '@angular/core/testing';

import { CadmusIngraCoreService } from './cadmus-ingra-core.service';

describe('CadmusIngraCoreService', () => {
  let service: CadmusIngraCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadmusIngraCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
