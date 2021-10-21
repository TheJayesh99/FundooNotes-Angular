import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';
import { HelperService } from 'src/services/helper/helper.service';
import { Notes } from '../model/notes.model';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
  noteList: Notes[] = []
  showButton: boolean = false;
  showCard: number = 0;
  openMenu: number = 0;
  noteData:any = {}
  label = false;
  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private helper: HelperService,
  ) { }

  ngOnInit(): void {
    this.displayNotes()
    this.helper.title("Notes")
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
        this.noteList = []
        for (let note  of data.data.notelist){
          if (!note.is_binned && !note.is_archive){
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
        this.auth.updateNote(result.value).subscribe(
          data => {
            this.displayNotes()
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }

  deleteNote(note: Notes) {
    note.is_binned = true;
    this.updateNote(note)
    this.helper.alerts_box("Note added to trash", "close")
    
  }

  archiveNote(note:Notes){
    note.is_archive = true;
    this.updateNote(note)
  }

  updateNote(note:Notes){
    this.noteData = this.helper.noteCheck(note)
    this.auth.updateNote(this.noteData).subscribe(
      data => {
        this.displayNotes()
      },
      error =>{
        console.log(error);
      }
    )
  }

  addLabel(note:Notes){
    console.log("i called log label");
    
  }

  showAddlabel(){
    this.label = !this.label
    return this.label
  }
}