import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
    noteList:any=[]
  constructor(
      private auth : AuthService
  ) { }

  ngOnInit(): void {
    this.auth.fetchNotes().subscribe(
        data=>{
            console.log(data.data.notelist);
            this.noteList=data.data.notelist
        },
        error=>{
            console.log(error);
            
        }
    )
  }
}