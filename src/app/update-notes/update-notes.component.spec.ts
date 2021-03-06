import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotesComponent } from './update-notes.component';

xdescribe('UpdateNotesComponent', () => {
  let component: UpdateNotesComponent;
  let fixture: ComponentFixture<UpdateNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
