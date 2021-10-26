import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Notes } from '../model/notes.model';

import { ArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveComponent ],
      imports:[
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers:[
        MatSnackBar,
        Overlay,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component on init should have notelist', () => {
    const NoteList:Notes[] = [
      {
        id: 1,
        title: '1st',
        description: 'this is 1st Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: true
      },
      {
        id: 2,
        title: '2nd',
        description: 'this is 2nd Note',
        label: [],
        collaborators: [],
        is_archive: true,
        is_binned: false
      },
      {
        id: 3,
        title: '4th',
        description: 'this is 4th Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
      {
        id: 4,
        title: '3rd',
        description: 'this is 3rd Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      }
    ]
    spyOn(component.helper,'title').and.callFake(()=>{
      return of('notes')
    })
    spyOn(component.auth,'fetchNotes').and.callFake(()=>{
      return of({data:{notelist:NoteList}})
    })
    component.ngOnInit()
    expect(component.auth.fetchNotes).toHaveBeenCalled()
  })

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

  it('on unarchive notes updateNote should be called ',()=>{
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
    component.unArchiveNote(note)
    expect(component.auth.updateNote).toHaveBeenCalled()
  })
});
