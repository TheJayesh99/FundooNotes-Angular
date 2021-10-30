import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';
import { HelperService } from 'src/services/helper/helper.service';
import { label } from '../model/label.model';
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
  removable = true;
  selectable = true;
  labelList:label[] = []
  labelForm = this.fb.group({
    id:[0,Validators.required],
    label:["",Validators.required],
    color:["white"]
  })
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public helper: HelperService,
    private fb: FormBuilder
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
        this.noteList = []
        for (let note  of data.data.notelist){
          if (!note.is_binned && !note.is_archive){
            this.noteList.push(note)
          }
        }
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
     
      }
    )
  }

  getlabels(){
    this.auth.userlabels().subscribe(
      data=>{
        this.labelList = data.data.label
      }
    )
  }

  showAddlabel(event:any = null)
  {
    if (event!=null){
      event.stopPropagation()
    }
    this.label = true
    this.getlabels()
  }

  addLabel(note:Notes,label:label){
    this.label = false
    let  labelALreadyData = false
    for (let labels of note.label)
    {    
      if(labels.id === label.id){
        labelALreadyData = true
      }
    }

    if (!labelALreadyData){
      note.label.push(label)
      this.auth.setLabelToNotes(note).subscribe(
        data=>{
          this.displayNotes()
        }
      )
    }
  }

  removeLabelFromNote(note:Notes,label:label){
    this.auth.removeLabelFromNote(note.id,label.id).subscribe(
      data=>{
       
        this.displayNotes()
      }
    )
  }

  createNewLabel(){
    if (this.labelForm.valid) {
      this.auth.createLabel(this.labelForm.value).subscribe(
        data=>{
          this.getlabels()
          this.helper.updateLabel.next(data.data)
        }
      )
    }
  }
}