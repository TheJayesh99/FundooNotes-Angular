import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public router: Router,
    ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required,Validators.minLength(4) ]],
      password: ['', [ Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        data =>{
          localStorage.setItem('currentUser',data.data.token)
          this.router.navigate(['/notes'])
        },
        error =>{
          this.errorMessage = error.error.message 
        }
      )
    }
    return false
  }

  get f() { 
    return this.loginForm.controls;
  }
}
