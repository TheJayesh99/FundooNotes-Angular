import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers:[
        MatSnackBar,
        Overlay
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
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

  it("on submit if from data is in valid it should not sign up",()=>{
    component.signupForm.setValue({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm: '',
    })
    component.onSubmit()
    expect(component.onSubmit()).toEqual(false)
  })
  
  it("on submit if from data is valid it should call signup",()=>{
    component.signupForm.setValue({
    first_name: 'bob',
    last_name: 'builder',
    username: 'builder',
    email: 'abc@mail.com',
    password: 'Password@01',
    confirm: 'Password@01',
    })
    spyOn(component.auth,'SignUp').and.callFake(()=>{
      return of(true)
    })
    component.onSubmit()
    expect(component.auth.SignUp).toHaveBeenCalled()
  })
  
  it("on submit if from data is valid it should navigate to login",()=>{
    component.signupForm.setValue({
    first_name: 'bob',
    last_name: 'builder',
    username: 'builder',
    email: 'abc@mail.com',
    password: 'Password@01',
    confirm: 'Password@01',
    })
    spyOn(component.auth,'SignUp').and.callFake(()=>{
      return of(true)
    })
    spyOn(component.router,'navigate')
    component.onSubmit()
    expect(component.router.navigate).toHaveBeenCalledWith(['/login'])
  })
  
  it("on submit if from password miss match it should call alert",()=>{
    component.signupForm.setValue({
    first_name: 'bob',
    last_name: 'builder',
    username: 'builder',
    email: 'abc@mail.com',
    password: 'Password@01',
    confirm: 'Password@012',
    })
    spyOn(component.helper,'alerts_box').and.callFake(()=>{
      return 
    })
    component.onSubmit()
    expect(component.helper.alerts_box).toHaveBeenCalled()
  })
});
