import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraffitiInfoPartFeatureComponent } from './graffiti-info-part-feature.component';

describe('GraffitiInfoPartFeatureComponent', () => {
  let component: GraffitiInfoPartFeatureComponent;
  let fixture: ComponentFixture<GraffitiInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraffitiInfoPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraffitiInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
