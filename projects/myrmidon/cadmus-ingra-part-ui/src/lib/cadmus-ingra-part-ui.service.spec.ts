import { TestBed } from '@angular/core/testing';

import { CadmusIngraPartUiService } from './cadmus-ingra-part-ui.service';

describe('CadmusIngraPartUiService', () => {
  let service: CadmusIngraPartUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadmusIngraPartUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
