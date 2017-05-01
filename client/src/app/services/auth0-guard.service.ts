import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth0Service } from './auth0.service';

@Injectable()
export class AuthUserGuardService implements CanActivate {

  constructor(private auth: Auth0Service, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.loggedIn()) return true;
      
    // Save URL to redirect to after login and fetching profile to get roles
    localStorage.setItem('redirect_url', state.url);
    this.auth.login();
    this.router.navigate(['']);
    return false;
    
  }
}

@Injectable()
export class AuthAdminGuardService implements CanActivate {
    constructor(private auth: Auth0Service, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.auth.loggedIn()){

        if(this.auth.isAdmin()) return true;
        
        this.router.navigate(['unauthorized']);
        return false;
      }
      // Save URL to redirect to after login and fetching profile to get roles
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      this.router.navigate(['']);
      return false;
    }
}

