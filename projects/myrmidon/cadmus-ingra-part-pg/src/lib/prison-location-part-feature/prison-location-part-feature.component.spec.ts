import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonLocationPartFeatureComponent } from './prison-location-part-feature.component';

describe('PrisonLocationPartFeatureComponent', () => {
  let component: PrisonLocationPartFeatureComponent;
  let fixture: ComponentFixture<PrisonLocationPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonLocationPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonLocationPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
