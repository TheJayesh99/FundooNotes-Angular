import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notes } from 'src/app/model/notes.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  newNote:Notes= {
    id: 0,
    title: '',
    description: '',
    label: [],
    collaborators: []
  }

  noteNew:Subject<Notes> = new Subject<Notes>();

  constructor() { }

  noteAdded(note:Notes){
    this.noteNew.next(note) 
  }
}
