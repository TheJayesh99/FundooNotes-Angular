import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { HelperService } from 'src/services/helper/helper.service';
import { label } from '../model/label.model';
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
  removable = true;
  selectable = true;
  labelList:label[] = []
  labelForm = this.fb.group({
    id:[0,Validators.required],
    label:["",Validators.required],
    color:["white"]
  })

  constructor(
    public route: ActivatedRoute,
    public auth: AuthService,
    public dialog: MatDialog,
    public helper: HelperService,
    public fb:FormBuilder
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
      
      }
    )
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
  
          this.getNotes()
        }
      )
    }
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

  removeLabelFromNote(note:Notes,label:label){
    this.auth.removeLabelFromNote(note.id,label.id).subscribe(
      data=>{
        this.getNotes()
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
