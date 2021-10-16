import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable} from 'rxjs';
import { Notes } from 'src/app/model/notes.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly server = "http://127.0.0.1:8000"
  private readonly registerUrl = "/user/register/"
  private readonly loginUrl = "/user/login/"
  private readonly notesUrl = "/notes/"
  
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

  updateNote(note:Notes):Observable<any>{
    console.log(note);
    
    return this.http.put(
      this.server+this.notesUrl,note,{
        headers: this.header
      })
  }

  deleteNote(note:Notes):Observable<any>{
    const options = {
      headers: this.header,
      body: {
       id:note.id
      },
    };
    
    return this.http.delete(
      this.server+this.notesUrl,options)
  }
  
}


