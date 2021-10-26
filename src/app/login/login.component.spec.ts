import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        MatSnackBar,
        Overlay,
        MatFormField
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitted variable should be false', () =>{
    expect(component.submitted).toEqual(false)
  })

  it("on submit submited value should be true",()=> {
    component.onSubmit()
    expect(component.submitted).toEqual(true)
  })

  it("on submit if from data is in valid it should not login",()=>{
    component.loginForm.setValue({username: "jaya",password: "Password"})
    component.onSubmit()
    expect(component.onSubmit()).toEqual(false)
  })
 
  it("on submit if from data is valid it should login",()=>{
    component.loginForm.setValue({username: "jaya",password: "Password@12"})
    spyOn(component.auth,'login').and.callFake(()=>{
      return of({data:{token:"sucess"}})
    })
    component.onSubmit()
    expect(component.auth.login).toHaveBeenCalled()
  })

  it("on submit if from data is valid it should navigate to notes",()=>{
    component.loginForm.setValue({username: "jaya",password: "Password@12"})
    spyOn(component.router,'navigate')
    spyOn(component.auth,'login').and.callFake(()=>{
      return of({data:{token:"sucess"}})
    })
    component.onSubmit()
    expect(component.router.navigate).toHaveBeenCalledWith(["/notes"])
  })
});
