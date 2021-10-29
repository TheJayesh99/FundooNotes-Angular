import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/services/auth/auth.service';

import { AuthGuard } from './auth.guard';

fdescribe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService:AuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers:[
        HttpClient,
        HttpHandler,
        MatSnackBar,
        Overlay
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  xit('be able to hit route when user is logged in', () => {
    // spyOn(guard.authenticationService,"currentUserValue").and.callFake(data=>{
    //   return "this is my token"
    // })
    expect(guard.canActivate()).toBe(true);
  });

  it('not be able to hit route when user is not logged in', () => {
    expect(guard.canActivate()).toBe(false);
  });
});
