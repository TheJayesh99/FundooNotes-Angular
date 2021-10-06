import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  logoImage = "assets/images/FundooNotes.png"

  loginForm = this.fb.group({
    username: ['', [ Validators.required,Validators.minLength(4) ]],
    password: ['', [ Validators.required]],
  });
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
            console.log(this.loginForm.value)
    }
  }

  get f() { 
    return this.loginForm.controls;
  }
}
