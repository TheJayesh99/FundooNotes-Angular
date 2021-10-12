import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<boolean>();



  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  createNoteForm = this.fb.group({
    title: ["", Validators.required],
    description: [""],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("i am submitteds");
    if (this.createNoteForm.valid) {
      console.log("i am valid");
      this.auth.createNote(this.createNoteForm.value).subscribe(
        data => {
          console.log(data.data)
          this.newNoteAdded(data.data)
        },
        error => {
          console.log(error.error.message);
        }
      )
    }
  }

  newNoteAdded(data:any){
    console.log("emiting event");
    
    this.newItemEvent.emit(data)
  }
}
