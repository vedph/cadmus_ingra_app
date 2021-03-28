import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonLocationPartComponent } from './prison-location-part.component';

describe('PrisonLocationPartComponent', () => {
  let component: PrisonLocationPartComponent;
  let fixture: ComponentFixture<PrisonLocationPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonLocationPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonLocationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
