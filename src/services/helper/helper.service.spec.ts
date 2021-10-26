import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notes } from 'src/app/model/notes.model';


import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        MatSnackBar,
        Overlay
      ]
    });
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('if there are no label and collaboraters it should delete that fileds',()=>{
    let note:Notes = {
      id: 0,
      title: '',
      description: '',
      label: [],
      collaborators: [],
      is_archive: false,
      is_binned: false
    }
    let result = service.noteCheck(note)
    expect(result).toEqual(note)
  })

  it('if there are label and collaboraters it should return label id ',()=>{
    let note:Notes = {
      id: 0,
      title: '1st',
      description: 'this is 1st Note',
      label: [{
        id: 1,
        label: 'label1',
        color: 'white',
        user: 0
      }],
      collaborators: ["jaya"],
      is_archive: false,
      is_binned: false
    }
    let result = service.noteCheck(note)
    expect(result.label[0]).toEqual(1)
  })

  xit('if new title is added newTile should also change',()=>{
    let title = "" 
    service.title("myTitle")
    service.newTitle.subscribe(data=>{
      title = data
    })
    expect(title).toEqual("myTitle")
  })
});
