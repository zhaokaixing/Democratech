import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Config, BaseUrl } from '../config/auth.config';
import Auth0Lock from 'auth0-lock';
import { GlobalProfileService } from "app/services/global.service";
import {UserService} from "./user.service";
import {register} from "ts-node/dist";

@Injectable()
export class Auth0Service {

  lock = new Auth0Lock(Config.clientID, Config.domain,{
          auth: {redirectUrl: Config.callbackURL, responseType: 'token'},
          language: 'fr',
          allowSignUp: false
      });

  constructor(private router: Router, private globalService: GlobalProfileService, private userService : UserService) {
    this.lock.on('authenticated', (authResult: any) => {

      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) console.log(error);

        console.log('profile:');
        console.log(profile);

        globalService.profile = JSON.stringify(profile);
        console.log(profile['user_id']);
        userService.getOne(profile['identities'][0]['user_id']).subscribe(
          res => {console.log('trouve')},
          err => {
            console.log('non trouve');
            this.router.navigate(['#registerCitizen']);
          }
        );

        var redirectUrl: string = localStorage.getItem('redirect_url');
        if (redirectUrl != undefined){
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirect_url');
        }
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

  public isAdmin() {
    let userProfile = JSON.parse(this.globalService.profile);
    return userProfile && userProfile.app_metadata
      && userProfile.app_metadata.roles
      && userProfile.app_metadata.roles.indexOf('admin') > -1;
  }
}
