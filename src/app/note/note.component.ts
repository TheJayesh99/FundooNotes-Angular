import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { HelperService } from 'src/services/helper/helper.service';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { label } from '../model/label.model';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  fundooImage = "assets/images/FundooNotes.png";
  labelsList: label[] = []
  title = "Notes"


  constructor(
    public helper: HelperService,
    public auth: AuthService,
    private labeldialog: MatDialog,
    public fb: FormBuilder,
    public router: Router,
    private ref: ChangeDetectorRef
  ) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 5);
  }

  ngOnInit(): void {

    this.helper.newTitle.subscribe(

      data => {
        this.ref.detach();
        this.title = data
      }
    )

    this.getLabels()


    this.helper.updateLabel.subscribe(
      data => {
        this.getLabels()
      }
    )
  }
  openDialog(): void {
    const dialogRef = this.labeldialog.open(EditlabelComponent, {
      width: '',
      data: this.labelsList
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLabels()
    })
  }

  getLabels() {
    this.auth.userlabels().subscribe(
      data => {
        this.labelsList = data.data.label
      }
    )
  }

  logout() {
    localStorage.removeItem("currentUser")
    this.router.navigate(["/login"])
  }
}
