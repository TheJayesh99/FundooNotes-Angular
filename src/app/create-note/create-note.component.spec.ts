import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { CreateNoteComponent } from './create-note.component';

describe('CreateNoteComponent', () => {
  let component: CreateNoteComponent;
  let fixture: ComponentFixture<CreateNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNoteComponent ],
      imports:[
        ReactiveFormsModule
      ],
      providers:[
        HttpClient,
        HttpHandler,
        MatSnackBar,
        Overlay
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on submit it should call create note',()=>{
    component.createNoteForm.setValue({title:"this is title",
    description: "this is desc"})
    spyOn(component.auth,'createNote').and.callFake(()=>{
      return of(true)
    })
    component.onSubmit()
    expect(component.auth.createNote).toHaveBeenCalled()
  })

});
