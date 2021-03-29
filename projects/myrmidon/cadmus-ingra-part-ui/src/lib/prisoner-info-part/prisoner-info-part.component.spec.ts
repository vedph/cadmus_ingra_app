import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonerInfoPartComponent } from './prisoner-info-part.component';

describe('PrisonerInfoPartComponent', () => {
  let component: PrisonerInfoPartComponent;
  let fixture: ComponentFixture<PrisonerInfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonerInfoPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonerInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
