import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  server = "http://127.0.0.1:8000"
  registerUrl = "/user/register/"
  loginUrl = "/user/login/"
  notesUrl = "/notes/"
  errorMessage: string | undefined;
  token = ""
  header = new HttpHeaders().set('token',this.getHeader())

  constructor(
    private http: HttpClient,
    ) { }

  SignUp(signUpData:FormBuilder):Observable<any>{
    return this.http.post(this.server+this.registerUrl,signUpData)
  }
  
  login(loginData:FormBuilder):Observable<any>{
    return this.http.post(this.server+this.loginUrl,loginData)
  }

  get currentUserValue():string | null {
    return localStorage.getItem('currentUser');
  }

  getHeader(){
    if (this.currentUserValue != null){
      this.token = this.currentUserValue
    }
    return this.token
  }

  createNote(notesData:FormBuilder):Observable<any>{
    return this.http.post(this.server+this.notesUrl,notesData,{
      headers: this.header
    })
  }

  fetchNotes(): Observable<any> {
    return this.http.get(this.server+this.notesUrl,{
      headers: this.header
    })
  }
}


