import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { Notes } from '../model/notes.model';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit, OnChanges {
  noteList: Notes[] = []
  showButton: boolean = false;
  showCard: number = 0
  @Input() item = '';
  
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(){
    this.displayNotes()
  }

  showFooterAction(note:Notes){
    this.showCard = note.id
  }
  
  stopFooterAction(note:Notes){
    this.showCard = 0
  }

  displayNotes(){
    this.auth.fetchNotes().subscribe(
      data => {
        console.log(data.data.notelist);
        this.noteList = data.data.notelist
      },
      error => {
        console.log(error);
      }
    )
  }
}