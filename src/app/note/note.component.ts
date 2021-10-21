import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';
import { HelperService } from 'src/services/helper/helper.service';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { label } from '../model/label.model';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  fundooImage = "assets/images/FundooNotes.png";
  labelsList: label[] = []
  title = "Notes"

  constructor(
    private helper: HelperService,
    private auth: AuthService,
    private labeldialog : MatDialog,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.helper.newTitle.subscribe(
      data => {
        this.title = data
      }
    )
    
    this.getLabels()
    
  }

  openDialog(): void {
    const dialogRef = this.labeldialog.open(EditlabelComponent, {
      width: '',
      data:this.labelsList
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getLabels()
    })
  }

  getLabels(){
    this.auth.userlabels().subscribe(
      data => {
        console.log(data.data.label);
        this.labelsList = data.data.label
      }
    ) 
  }
}
