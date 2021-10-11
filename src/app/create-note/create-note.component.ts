import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  createNoteForm = this.fb.group({
    title: ["", Validators.required],
    description: [""],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
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
          console.log(data);
        },
        error => {
          console.log(error.error.message);

        }
      )
    }
  }
}
