import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notes } from '../model/notes.model';

@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNotesComponent implements OnInit {

  updateNoteForm = this.fb.group({
    id: [this.note.id, Validators.required],
    title: [ this.note.title, Validators.required],
    description: [this.note.description, Validators.required]
  })

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateNotesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public note: Notes) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}