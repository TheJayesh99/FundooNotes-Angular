import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLabelNotesComponent } from './display-label-notes.component';

describe('DisplayLabelNotesComponent', () => {
  let component: DisplayLabelNotesComponent;
  let fixture: ComponentFixture<DisplayLabelNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLabelNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLabelNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
