import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmusIngraPartPgComponent } from './cadmus-ingra-part-pg.component';

describe('CadmusIngraPartPgComponent', () => {
  let component: CadmusIngraPartPgComponent;
  let fixture: ComponentFixture<CadmusIngraPartPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadmusIngraPartPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmusIngraPartPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
