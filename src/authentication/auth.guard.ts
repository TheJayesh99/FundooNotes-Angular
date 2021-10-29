import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user:string|null = ""
  constructor(
    private router: Router,
    public authenticationService: AuthService
    ) {

     }
    
    canActivate() {
      this.user = this.authenticationService.currentUserValue;
      if (this.user != null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

