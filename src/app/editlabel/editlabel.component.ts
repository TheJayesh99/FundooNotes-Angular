import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth/auth.service';
import { label } from '../model/label.model';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {
  
  labelForm: any;
  updateLabelForm:any;
  editId:number = 0;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA)
    public labelList: label[]
    ){
      
    }

  ngOnInit(): void {
    this.labelForm = this.fb.group({
      id:[0,Validators.required],
      label:["",Validators.required],
      color:["white"]
    })

    this.updateLabelForm = this.fb.group({
      label:["",Validators.required],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getLabels(){
    this.auth.userlabels().subscribe(
      data => {
        this.labelList = data.data.label
      }
    ) 
  }

  createNewLabel(){
    if (this.labelForm.valid) {
      this.auth.createLabel(this.labelForm.value).subscribe(
        data=>{
          this.getLabels()
          this.labelForm.reset()
        }
      )
    }
  }

  removeLabel(label:label){
    this.auth.deleteLabel(label.id).subscribe(
      data=>{
        
        this.getLabels()
      }
    )
  }

  updateLabel(label:label){
    this.editId = 0
    if(this.updateLabelForm.valid){
      label.label = this.updateLabelForm.value.label
      this.auth.updatelabel(label).subscribe(
        data=>{
          this.getLabels()
          
        }
      )
    }
  }

  editLabel(label:label){
    this.editId = label.id
  }
}
