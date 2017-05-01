import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth0Service } from './auth0.service';

@Injectable()
export class Auth0GuardService implements CanActivate {

  constructor(private auth: Auth0Service, private router: Router) {}

  canActivate() {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
