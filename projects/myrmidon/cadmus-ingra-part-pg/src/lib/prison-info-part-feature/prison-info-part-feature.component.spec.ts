import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonInfoPartFeatureComponent } from './prison-info-part-feature.component';

describe('PrisonInfoPartFeatureComponent', () => {
  let component: PrisonInfoPartFeatureComponent;
  let fixture: ComponentFixture<PrisonInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonInfoPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
