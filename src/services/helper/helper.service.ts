import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { label } from 'src/app/model/label.model';
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
    collaborators: [],
    is_archive: false,
    is_binned: false
  }

  noteNew:Subject<Notes> = new Subject<Notes>();
  newTitle:Subject<string> = new Subject<string>();
  updateLabel:Subject<label> = new Subject<label>()

  constructor(private alert: MatSnackBar) { }

  noteAdded(note:Notes){
    this.noteNew.next(note) 
  }

  alerts_box(message:string,close_message:string){
    this.alert.open(message,close_message, {
      duration:5000,
      horizontalPosition: "start",
      verticalPosition: "bottom",
    });
  }

  noteCheck(note:Notes){
    let noteData:any = {}
    noteData = note
    
    if (note.label.length == 0){
      delete noteData.label;
    }
    else{
      let labelList = []
      for (let label of note.label){
        labelList.push(label.id)
      }
      noteData.label = labelList
    }
    if (note.collaborators.length == 0){
      delete noteData.collaborators;
    }
    else{
      let collabList = []
      for (let collab of note.collaborators){
        collabList.push(collab)
      }
      noteData.collaborators = collabList
    }
    return noteData
  }


title(title:string){
  this.newTitle.next(title)
}

}
