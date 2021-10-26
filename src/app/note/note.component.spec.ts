import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { label } from '../model/label.model';

import { NoteComponent } from './note.component';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      imports:[
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers:[
        MatSnackBar,
        Overlay,
        HttpClient,
        HttpHandler,
        
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init the get label should call', () =>{
    let labellist:label[]=[
      {
        id: 1,
        label: 'label1',
        color: 'white',
        user: 0
      },
      {
        id: 2,
        label: 'label2',
        color: 'white',
        user: 0
      }
    ]
    spyOn(component.auth,'userlabels').and.callFake(()=>{
      return of({data:{label:labellist}})
    })
    component.ngOnInit()
    expect(component.labelsList.length).toBeGreaterThan(0)
    expect(component.labelsList).toEqual(labellist)
    })
});
