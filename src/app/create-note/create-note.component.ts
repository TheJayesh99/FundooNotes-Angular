import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import {MatAccordion} from '@angular/material/expansion';
import { HelperService } from 'src/services/helper/helper.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  createNoteForm = this.fb.group({
    title: ["", Validators.required],
    description: [""],
  });

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public helper: HelperService
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.createNoteForm.valid) {
      this.auth.createNote(this.createNoteForm.value).subscribe(
        data => {
          this.helper.noteAdded(data.data.note[0])
          this.accordion.closeAll()
        },
        error => {
      
        }
      )
    }
  }
}
