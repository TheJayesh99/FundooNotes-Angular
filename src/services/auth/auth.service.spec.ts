import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notes } from 'src/app/model/notes.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { label } from 'src/app/model/label.model';

describe('AuthService', () => {
  let server = "http://127.0.0.1:8000"
  let registerUrl = "/user/register/"
  let loginUrl = "/user/login/"
  let notesUrl = "/notes/"
  let userlabelUrl = "/notes/userLabels/"
  let labelNotesUrl = "/notes/noteLabel/"
  let labelUrl = "/notes/label/"
  let service: AuthService;
  let httpTestCrtl: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MatSnackBar,
        Overlay,
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestCrtl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestCrtl.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on get notes, notelist should be retrive from database', () => {
    const noteList: Notes[] = [
      {
        id: 0,
        title: '1st',
        description: 'this is 1st Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
      {
        id: 0,
        title: '2nd',
        description: 'this is 2nd Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
      {
        id: 0,
        title: '3rd',
        description: 'this is 3rd Note',
        label: [],
        collaborators: [],
        is_archive: false,
        is_binned: false
      }
    ]

    service.fetchNotes().subscribe(data => {
      expect(noteList).toEqual(data)
    })

    const req = httpTestCrtl.expectOne(server + notesUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(noteList)

  })

  it('on create note note should be created', () => {

    let fb = new FormBuilder
    let noteForm = fb.group({
      title: [""],
      description: [""],
    })

    noteForm.setValue({ title: "new label", description: "note created" })
    service.createNote(noteForm.value).subscribe(data => {
      expect(data).toEqual(noteForm.value)
    })
    const req = httpTestCrtl.expectOne(server + notesUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(noteForm.value)
  })

  it('on update note data should update', () => {
    let updatedNote: Notes = {
      id: 0,
      title: 'new Note',
      description: 'Updated Note',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: false
    }
    service.updateNote(updatedNote).subscribe(data => {
      expect(data).toEqual(updatedNote)
    })
    const req = httpTestCrtl.expectOne(server + notesUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(updatedNote)
  })

  it('on delete note data should deleted', () => {
    let note: Notes = {
      id: 3,
      title: 'new Note',
      description: 'Updated Note',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: false
    }
    service.deleteNote(note).subscribe(data => {
      expect(data.id).toEqual(note.id)
    })
    const req = httpTestCrtl.expectOne(server + notesUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(note)
  })

  it('on userlabels list of label data should be get', () => {
    const labels: label[] = [
      {
        id: 1,
        label: 'label1',
        color: 'white',
        user: 0
      },
      {
        id: 2,
        label: 'label2',
        color: 'white',
        user: 0
      },
    ]
    service.userlabels().subscribe(data => {
      expect(data).toEqual(labels)
    })
    const req = httpTestCrtl.expectOne(server + userlabelUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(labels)
  })

  it('on labelnote note notes having that label should retrive', () => {
    const noteList: Notes[] = [
      {
        id: 0,
        title: '1st',
        description: 'this is 1st Note',
        label: [{
          id: 1,
          label: 'label1',
          color: 'white',
          user: 0
        }],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
      {
        id: 0,
        title: '2nd',
        description: 'this is 2nd Note',
        label: [{
          id: 1,
          label: 'label1',
          color: 'white',
          user: 0
        }],
        collaborators: [],
        is_archive: false,
        is_binned: false
      },
    ]
    let label_id = 1
    service.labeledNotes(label_id).subscribe(data => {
      expect(data).toEqual(noteList)
    })
    const req = httpTestCrtl.expectOne(server + labelNotesUrl + label_id)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(noteList)
  })

  it('on setLabelToNote it should update note with that label', () => {
    let note: Notes = {
      id: 0,
      title: '',
      description: '',
      label: [{
        id: 1,
        label: 'labelUpdated',
        color: 'white',
        user: 0
      }],
      collaborators: [],
      is_archive: false,
      is_binned: false
    }

    service.setLabelToNotes(note).subscribe(data => {
      expect(data).toEqual(note)
    })
    const req = httpTestCrtl.expectOne(server + labelNotesUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(note)
  })

  it('on removeLabelFromNote it should update note with that label', () => {
    let note: Notes = {
      id: 0,
      title: '',
      description: '',
      label: [{
        id: 1,
        label: 'labelUpdated',
        color: 'white',
        user: 0
      }],
      collaborators: [],
      is_archive: false,
      is_binned: false
    }

    service.removeLabelFromNote(0, 2).subscribe(data => {
      expect(data).toEqual(note)
    })
    const req = httpTestCrtl.expectOne(server + labelNotesUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(note)
  })

  it('on get label label details should retrive', () => {
    let label: label = {
      id: 1,
      label: 'label1',
      color: 'white',
      user: 0
    }
    service.getlabel(label.id).subscribe(data => {
      expect(data).toEqual(label)
    })
    const req = httpTestCrtl.expectOne(server + labelUrl + label.id)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(label)
  })

  it('on create label label details should created', () => {
    let label: label = {
      id: 1,
      label: 'label1',
      color: 'white',
      user: 0
    }
    let fb = new FormBuilder
    let labelFrom = fb.group({
      label: [""],
      color: ["white"]
    })
    labelFrom.setValue({ label: "label1", color: "white" })
    service.createLabel(labelFrom.value).subscribe(data => {
      expect(data).toEqual(label)
    })
    const req = httpTestCrtl.expectOne(server + labelUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(label)
  })

  it('on delete label label should be deleted', () => {
    let label: label = {
      id: 1,
      label: 'label1',
      color: 'white',
      user: 0
    }
    service.deleteLabel(label.id).subscribe(data => {
      expect(data.id).toEqual(label.id)
    })
    const req = httpTestCrtl.expectOne(server + labelUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(label)
  })

  it('on delete label label should be deleted', () => {
    let label: label = {
      id: 1,
      label: 'label1',
      color: 'white',
      user: 0
    }
    service.deleteLabel(label.id).subscribe(data => {
      expect(data.id).toEqual(label.id)
    })
    const req = httpTestCrtl.expectOne(server + labelUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(label)
  })

  it('on updatelabel label should be updated', () => {
    let label: label = {
      id: 1,
      label: 'label1',
      color: 'white',
      user: 0
    }
    service.updatelabel(label).subscribe(data => {
      expect(data).toEqual(label)
    })
    const req = httpTestCrtl.expectOne(server + labelUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(label)
  })

  it('on signup user should be register', () => {
    let fb = new FormBuilder
    let signupForm = fb.group({
      first_name: [''],
      last_name: [''],
      username: [''],
      email: [''],
      password: [''],
      confirm: [''],
    });
    signupForm.setValue({
      first_name: 'bob',
      last_name: 'builder',
      username: 'builder',
      email: 'abc@mail.com',
      password: 'Password@01',
      confirm: 'Password@01',
    })
    let user = {
      id: 0,
      first_name: 'bob',
      last_name: 'builder',
      username: 'builder',
      email: 'abc@mail.com',
      password: 'Password@01',
    }
    service.SignUp(signupForm.value).subscribe(data => {
      expect(data.id).toEqual(user.id)
    })
    const req = httpTestCrtl.expectOne(server + registerUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(user)
  })

  it('on signup user should be register', () => {
    let fb = new FormBuilder
    let loginForm = fb.group({
      password: [''],
      username: ['']
    });
    loginForm.setValue({
      username: 'builder',
      password: 'Password@01',
    })
    let user = {
      token: "user_token"
    }
    service.login(loginForm.value).subscribe(data => {
      expect(data.token).toEqual(user.token)
    })
    const req = httpTestCrtl.expectOne(server + loginUrl)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')
    req.flush(user)
  })
});
