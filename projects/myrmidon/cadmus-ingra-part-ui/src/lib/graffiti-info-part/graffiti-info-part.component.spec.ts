import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraffitiInfoPartComponent } from './graffiti-info-part.component';

describe('GraffitiInfoPartComponent', () => {
  let component: GraffitiInfoPartComponent;
  let fixture: ComponentFixture<GraffitiInfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraffitiInfoPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraffitiInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
