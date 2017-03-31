import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Config, BaseUrl } from '../auth.config';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  lock = new Auth0Lock(Config.clientID, Config.domain,
      {
          'auth': {'callbackURL': Config.callbackURL, responseType: 'token'},
          'language': 'fr',
          'signUpLink': BaseUrl.name + 'inscription'
      }
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.router.navigateByUrl(authResult.state);

      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        console.log(localStorage.getItem('profile'));
      });
      console.log(localStorage);

      this.lock.hide();
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
    return tokenNotExpired();
  }
}