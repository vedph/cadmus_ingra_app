import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmusIngraPartUiComponent } from './cadmus-ingra-part-ui.component';

describe('CadmusIngraPartUiComponent', () => {
  let component: CadmusIngraPartUiComponent;
  let fixture: ComponentFixture<CadmusIngraPartUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadmusIngraPartUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmusIngraPartUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
