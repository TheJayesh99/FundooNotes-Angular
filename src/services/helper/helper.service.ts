import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private alert: MatSnackBar) { }

  noteAdded(note:Notes){
    this.noteNew.next(note) 
  }

  alerts_box(message:string,close_message:string){
    this.alert.open('Note Deleted', 'close', {
      duration:5000,
      horizontalPosition: "start",
      verticalPosition: "bottom",
    });
  }
}
