import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonerInfoPartFeatureComponent } from './prisoner-info-part-feature.component';

describe('PrisonerInfoPartFeatureComponent', () => {
  let component: PrisonerInfoPartFeatureComponent;
  let fixture: ComponentFixture<PrisonerInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonerInfoPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonerInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
