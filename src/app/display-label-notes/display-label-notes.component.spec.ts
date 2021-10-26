import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Notes } from '../model/notes.model';
import { DisplayLabelNotesComponent } from './display-label-notes.component';

describe('DisplayLabelNotesComponent', () => {
  let component: DisplayLabelNotesComponent;
  let fixture: ComponentFixture<DisplayLabelNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLabelNotesComponent ],
      imports:[
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers:[
        MatSnackBar,
        Overlay,
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ]
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


  it('on showFooterAction the show card should equal to note id',()=>{
    let note:Notes = {
      id: 1,
      title: '1st',
      description: 'this is 1st Note',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: true
    }
    component.showFooterAction(note)
    expect(component.showCard).toEqual(1)
  })

  it('on stopFooterAction the show card should equal to 0',()=>{
    let note:Notes = {
      id: 1,
      title: '1st',
      description: 'this is 1st Note',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: true
    }
    component.stopFooterAction(note)
    expect(component.showCard).toEqual(0)
  })


  it('on showMenu the show card should equal to note id',()=>{
    let note:Notes = {
      id: 1,
      title: '1st',
      description: 'this is 1st Note',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: true
    }
    component.showMenu(note)
    expect(component.openMenu).toEqual(1)
  })

  it('on closeMenu the show card should equal to 0',()=>{
    let note:Notes = {
      id: 1,
      title: '1st',
      description: 'this is 1st Note',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: true
    }
    component.closeMenu(note)
    expect(component.openMenu).toEqual(0)
  })

  it('on delete notes updateNote should be called ',()=>{
    const note:Notes = {
      id: 0,
      title: 'new title',
      description: 'new desc',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: false
    }
    spyOn(component.auth,'updateNote').and.callFake(()=>{
      return of(true)
    })
    component.deleteNote(note)
    expect(component.auth.updateNote).toHaveBeenCalled()
  })

  it('on archive note the note should be remove from the list',()=>{
    let note:Notes = {
      id: 1,
      title: '1st',
      description: 'this is 1st Note',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: true
    }
    spyOn(component.helper,'alerts_box')
    spyOn(component.helper,'noteCheck')
    spyOn(component.auth,'updateNote').and.callFake(()=>{
      return of(true)
    })
    component.archiveNote(note)
    expect(component.auth.updateNote).toHaveBeenCalled()
  })

  it('on get labels name should call getlabel',()=>{
    spyOn(component.auth,'getlabel').and.callFake(()=>{
      return of(true)
    })
    component.getLabelName()
    expect(component.auth.getlabel).toHaveBeenCalled()
  })

  it('on get notes should call labeledNote',()=>{
    spyOn(component.auth,'labeledNotes').and.callFake(()=>{
      return of(true)
    })
    component.getNotes()
    expect(component.auth.labeledNotes).toHaveBeenCalled()
  })
});
