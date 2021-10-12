import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() item = "";

  fundooImage = "assets/images/FundooNotes.png";
  displayNoteReload:string = "no";
  constructor() { }

  ngOnInit(): void {
  }

  newNoteAdded(item:any){
    if(item){
      this.displayNoteReload = item
    }
  }
}
