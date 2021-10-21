import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { HelperService } from 'src/services/helper/helper.service';
import { Notes } from '../model/notes.model';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-display-label-notes',
  templateUrl: './display-label-notes.component.html',
  styleUrls: ['./display-label-notes.component.scss']
})
export class DisplayLabelNotesComponent implements OnInit {

  noteList:Notes[]= [];
  showCard: number = 0;
  openMenu: number= 0;
  noteData:any = {};
  label: boolean = false;
  label_id:number = 0
  // elseBlock:any;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    public dialog: MatDialog,
    private helper: HelperService,
    ) 
    {
      this.route.params.subscribe( params => {
        this.label_id = params.id
        this.getLabelName()
        this.getNotes()
      } );
      
     }
  ngOnInit(): void {
    
  }
  
  getLabelName(){
    this.auth.getlabel(this.label_id).subscribe(
      data=>{
        console.log(data.data.label[0].label);
        this.helper.newTitle.next(data.data.label[0].label)
      }
    )
  }

  getNotes(){
    this.auth.labeledNotes(this.label_id).subscribe(
      data => {
        this.noteList = data.data.notelist;           
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


  openDialog(note: Notes): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: '500px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.auth.updateNote(result.value).subscribe(
          data => {
            this.getNotes()
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
        this.getNotes()
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
