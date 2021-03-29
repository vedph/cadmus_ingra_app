import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingInfoPartFeatureComponent } from './drawing-info-part-feature.component';

describe('DrawingInfoPartFeatureComponent', () => {
  let component: DrawingInfoPartFeatureComponent;
  let fixture: ComponentFixture<DrawingInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingInfoPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
