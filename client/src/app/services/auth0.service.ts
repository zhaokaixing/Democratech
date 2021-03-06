import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Config, BaseUrl } from '../config/auth.config';
import Auth0Lock from 'auth0-lock';
import { GlobalProfileService } from "app/services/global.service";

@Injectable()
export class Auth0Service {

  lock = new Auth0Lock(Config.clientID, Config.domain,{
          auth: {redirectUrl: Config.callbackURL, responseType: 'token'},
          language: 'fr',
          signupLink: BaseUrl.client + '/inscription'
      });

  constructor(private router: Router, private globalService: GlobalProfileService) {
    this.lock.on('authenticated', (authResult: any) => {
      console.log('auth result:');
      console.log(authResult);

      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }
        console.log('profile:');
        console.log(profile);

        globalService.profile = JSON.stringify(profile);
        // localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/');
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }
}
