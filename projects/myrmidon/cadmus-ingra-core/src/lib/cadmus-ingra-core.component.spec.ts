import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmusIngraCoreComponent } from './cadmus-ingra-core.component';

describe('CadmusIngraCoreComponent', () => {
  let component: CadmusIngraCoreComponent;
  let fixture: ComponentFixture<CadmusIngraCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadmusIngraCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmusIngraCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
