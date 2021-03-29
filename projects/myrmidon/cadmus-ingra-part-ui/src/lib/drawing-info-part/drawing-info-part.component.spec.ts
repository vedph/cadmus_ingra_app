import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingInfoPartComponent } from './drawing-info-part.component';

describe('DrawingInfoPartComponent', () => {
  let component: DrawingInfoPartComponent;
  let fixture: ComponentFixture<DrawingInfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingInfoPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
