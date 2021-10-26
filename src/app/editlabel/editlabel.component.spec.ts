import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditlabelComponent } from './editlabel.component';

xdescribe('EditlabelComponent', () => {
  let component: EditlabelComponent;
  let fixture: ComponentFixture<EditlabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlabelComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
      ],
      providers:[
        MatSnackBar,
        Overlay,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
