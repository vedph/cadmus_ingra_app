import { TestBed } from '@angular/core/testing';

import { CadmusIngraPartPgService } from './cadmus-ingra-part-pg.service';

describe('CadmusIngraPartPgService', () => {
  let service: CadmusIngraPartPgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadmusIngraPartPgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
