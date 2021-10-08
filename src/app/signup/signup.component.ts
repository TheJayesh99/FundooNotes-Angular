import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
  imageSignUp = "assets/images/fundooAccount.png";
  logoImage = "assets/images/FundooNotes.png"
  submitted = false;
  hide = true;

  signupForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern("^[0-9a-zA-Z]+([.,+,_,-]{1}[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[.]{1}[a-zA-Z]{2,3}([.]{1}[a-zA-Z]{2})?")]],
    password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%^&-+@]).{8,}")]],
    confirm: ['', Validators.required],
  });
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {

    this.submitted = true
    
    if (this.signupForm.value.password != this.signupForm.value.confirm) {
      return alert("password didn't match")
    }
    if (this.signupForm.valid) {
      this.auth.SignUp(this.signupForm.value)
    }
  }

  get f() {
    return this.signupForm.controls
  }
}

