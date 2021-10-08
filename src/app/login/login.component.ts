import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  logoImage = "assets/images/FundooNotes.png";
  errorMessage: string | undefined;

  loginForm = this.fb.group({
    username: ['', [ Validators.required,Validators.minLength(4) ]],
    password: ['', [ Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
    ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
    }
  }

  get f() { 
    return this.loginForm.controls;
  }
}
