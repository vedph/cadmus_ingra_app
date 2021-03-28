import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonInfoPartComponent } from './prison-info-part.component';

describe('PrisonInfoPartComponent', () => {
  let component: PrisonInfoPartComponent;
  let fixture: ComponentFixture<PrisonInfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonInfoPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
