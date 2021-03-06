import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable} from 'rxjs';
import { label } from 'src/app/model/label.model';
import { Notes } from 'src/app/model/notes.model';
import { HelperService } from '../helper/helper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly server = "http://ec2-52-66-252-217.ap-south-1.compute.amazonaws.com:8000"
  private readonly registerUrl = "/user/register/"
  private readonly loginUrl = "/user/login/"
  private readonly notesUrl = "/notes/"
  private readonly userlabelUrl = "/notes/userLabels/"
  private readonly labelNotesUrl = "/notes/noteLabel/"
  private readonly labelUrl = "/notes/label/"
  
  errorMessage: string | undefined;
  token = ""
  header = new HttpHeaders().set('token',this.getHeader())

  constructor(
    public http: HttpClient,
    private helper: HelperService
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
  
  userlabels():Observable<any> {
    return this.http.get(this.server+this.userlabelUrl,{
      headers:this.header
    })    
  }

  labeledNotes(label_id:number):Observable<any>{
    return this.http.get(this.server+this.labelNotesUrl+label_id,{
      headers:this.header
    })
  }

  setLabelToNotes(note:Notes):Observable<any>{
    let noteData = this.helper.noteCheck(note)
    return  this.http.put(this.server+this.labelNotesUrl,noteData,{
      headers:this.header
    })
  }

  removeLabelFromNote(noteid:number,labelid:number):Observable<any>{
    const options = {
      headers: this.header,
      body: {
        "id":noteid,
        "label_id":labelid
      },
    };
    return this.http.delete(this.server+this.labelNotesUrl,options)
  }

  getlabel(label_id:number):Observable<any>{
    return this.http.get(this.server+this.labelUrl+label_id,{
      headers:this.header
    })
  }

  createLabel(labelData:FormBuilder):Observable<any>{
    return this.http.post(this.server+this.labelUrl,labelData,{
      headers:this.header
    })
  }

  deleteLabel(label_id:number):Observable<any>{
    const options = {
      headers: this.header,
      body: {
       id:label_id
      },
    };
    return this.http.delete(this.server+this.labelUrl,options)
  }

  updatelabel(label:label):Observable<any>{
    return this.http.put(this.server+this.labelUrl,label,{
      headers:this.header
    })
  }
}


