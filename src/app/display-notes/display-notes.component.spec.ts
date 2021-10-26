import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { label } from '../model/label.model';
import { Notes } from '../model/notes.model';

import { DisplayNotesComponent } from './display-notes.component';

describe('DisplayNotesComponent', () => {
  let component: DisplayNotesComponent;
  let fixture: ComponentFixture<DisplayNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNotesComponent ],
      imports:[
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers:[
        MatSnackBar,
        Overlay,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNotesComponent);
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
  
  it('when we do display note should have notelist have only notes which are unarchived and not binned', () => {
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
    component.displayNotes()
    expect(component.noteList.length).toEqual(2)
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

  it('on delete note the note should be remove from the list',()=>{
    let notelist:Notes[] = [
      {
        id: 1,
        title: '1st',
        description: 'this is 1st Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned:false
      },
      {
        id: 2,
        title: '2nd',
        description: 'this is 2nd Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
    ]
    spyOn(component.helper,'alerts_box')
    spyOn(component.helper,'noteCheck')
    spyOn(component.auth,'updateNote').and.callFake(()=>{
      return of(true)
    })
    spyOn(component.auth,'fetchNotes').and.callFake(()=>{
      notelist[1].is_binned = true
      return of({data:{notelist:notelist}})
    })
    component.deleteNote(notelist[1])
    expect(component.noteList.length).toEqual(1)
  })

  it('on archive note the note should be remove from the list',()=>{
    let notelist:Notes[] = [
      {
        id: 1,
        title: '1st',
        description: 'this is 1st Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned:false
      },
      {
        id: 2,
        title: '2nd',
        description: 'this is 2nd Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
    ]
    spyOn(component.helper,'alerts_box')
    spyOn(component.helper,'noteCheck')
    spyOn(component.auth,'updateNote').and.callFake(()=>{
      return of(true)
    })
    spyOn(component.auth,'fetchNotes').and.callFake(()=>{
      notelist[1].is_binned = true
      return of({data:{notelist:notelist}})
    })
    component.archiveNote(notelist[1])
    expect(component.noteList.length).toEqual(1)
  })

  it('on get labels all the labels should fetch from database',()=>{
    let labels:label[] =[
      {
        id: 11,
        label: 'label1',
        color: 'white',
        user:0
      },
      {
        id: 11,
        label: 'label2',
        color: 'blue',
        user: 0
      },
    ]
    spyOn(component.auth,'userlabels').and.callFake(()=>{
      return of({data:{label:labels}})
    })
    component.getlabels()
    expect(component.labelList.length).toEqual(2)
  })

  it('on show add labels all the labels should fetch from database',()=>{
    let labels:label[] =[
      {
        id: 11,
        label: 'label1',
        color: 'white',
        user:0
      },
      {
        id: 12,
        label: 'label2',
        color: 'blue',
        user: 0
      },
    ]
    spyOn(component.auth,'userlabels').and.callFake(()=>{
      return of({data:{label:labels}})
    })
    component.showAddlabel()
    expect(component.labelList.length).toEqual(2)
  })

  it('on add labels a labels should add to the list',()=>{
    const NoteList:Notes[] = [
      {
        id: 1,
        title: '1st',
        description: 'this is 1st Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
      {
        id: 2,
        title: '2nd',
        description: 'this is 2nd Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
    ]
    let label:label = {
      id: 2,
      label: 'new label',
      color: 'white',
      user: 0
    }
    spyOn(component.auth,'setLabelToNotes').and.callFake(()=>{
      NoteList[0].label.push(label)
      return of(NoteList)
    })
    // spyOn(component.auth,'fetchNotes').and.callFake(()=>{
    //   return of({data:{notelist:NoteList}})
    // })
    component.addLabel(NoteList[0],label)
    expect(component.auth.setLabelToNotes).toHaveBeenCalled()
  })

  it('on remove label from note label should remove',()=>{
    const NoteList:Notes[] = [
      {
        id: 1,
        title: '1st',
        description: 'this is 1st Note',
        label: [{
          id: 2,
          label: 'new label',
          color: 'white',
          user: 0
        }],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
      {
        id: 2,
        title: '2nd',
        description: 'this is 2nd Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
    ]
    let label:label = {
      id: 2,
      label: 'new label',
      color: 'white',
      user: 0
    }
    spyOn(component.auth,'removeLabelFromNote').and.callFake(()=>{
      return of(true)
    })
    component.removeLabelFromNote(NoteList[0],label)
    expect(component.auth.removeLabelFromNote).toHaveBeenCalled()
  })

  it('on create new label it should call createlabel',()=>{
    component.labelForm.setValue({
      id: 2,
      label:"new label",
      color:"white"
    })
    spyOn(component.auth,'createLabel').and.callFake(()=>{
      return of(true)
    })
    component.createNewLabel()
    expect(component.auth.createLabel).toHaveBeenCalled()
  })
});
