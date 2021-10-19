import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';
import { HelperService } from 'src/services/helper/helper.service';
import { Notes } from '../model/notes.model';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit {

  noteList: Notes[] = []
  showButton: boolean = false;
  showCard: number = 0;
  openMenu: number = 0;
  noteData: any;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private helper: HelperService,
  ) { }

  ngOnInit(): void {
    this.displayNotes()
    this.helper.noteNew.subscribe(
      data => {
        this.displayNotes()
      }
    )
  }

  showFooterAction(note: Notes) {
    this.showCard = note.id
  }

  stopFooterAction(note: Notes) {
    this.showCard = 0
  }

  showMenu(note: Notes) {
    this.openMenu = note.id

  }
  closeMenu(note: Notes) {
    this.openMenu = 0
  }

  displayNotes() {
    this.auth.fetchNotes().subscribe(
      data => {
        console.log(data.data.notelist);
      for(let note of data.data.notelist){
        if (note.is_binned){
          this.noteList.push(note)
        }
      }
      },
      error => {
        console.log(error);
      }
    )
  }

  openDialog(note: Notes): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: '500px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.helper.alerts_box("Cant update Note in Bin","close")
        }
    })
  }

  undoDelete(note: Notes) {
    note.is_binned = false;
    this.noteData = this.helper.noteCheck(note)
    console.log(this.noteData);

    this.auth.updateNote(this.noteData).subscribe(
      data => {
        this.displayNotes()
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteNote(note: Notes) {
    this.auth.deleteNote(note).subscribe(
      data => {
        this.displayNotes()
        this.helper.alerts_box("note deleted", "close")
      },
      error => {
        console.log(error);
      }
    )
  }

  addLabel(note: Notes) {
    return note
  }
}

