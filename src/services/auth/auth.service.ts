import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  configUrl = "http://127.0.0.1:8000"
  registerUrl = "/user/register/"
  loginUrl = "/user/login/"
  errorMessage: string | undefined;
  
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  SignUp(signUpData:FormBuilder) {
    this.http.post(this.configUrl+this.registerUrl,signUpData)
    .subscribe(
      data => {
        this.router.navigate(["login"])
      },
      error => {
        console.log(error);
        
      }
      );
  }
  
  login(loginData:FormBuilder):string | undefined{
    this.http.post(this.configUrl+this.loginUrl,loginData)
    .subscribe(
      (data: any) => { 
        localStorage.setItem('currentUser', data.data.token);
        this.router.navigate(["notes"]);

      },
      error =>{
        // console.log(error.error.message);
       this.errorMessage = error.error.message
       
      })
      // console.log(this.errorMessage);
      
      return this.errorMessage
  }

  get currentUserValue():string | null {
    return localStorage.getItem('currentUser');
}
}
