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
          signupLink: BaseUrl.client + '/inscription'
      });

  constructor(private router: Router, private globalService: GlobalProfileService, private userService : UserService) {
    this.lock.on('authenticated', (authResult: any) => {

      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) console.log(error);

        // let profile = JSON.stringify(profileStr);
        console.log(profile);

        if(profile['identities'][0]['isSocial'])
        {
          localStorage.setItem('profile', JSON.stringify(profile));

          console.log('its social  user_id : ');
          console.log(profile['identities'][0]['user_id']);

          userService.getWithKey('socialId', profile['identities'][0]['user_id']).subscribe(
            res => {
              if(res == null){
                console.log('Social not found');
                localStorage.removeItem('id_token');

                this.router.navigate(['inscription']);
              }
              else {
                console.log('Social found');

                profile['identities'][0]['user_id'] = res._id;
                console.log(profile);
                globalService.profile = JSON.stringify(profile);
              }
            },
            err => {
              console.log('Social error');
              localStorage.removeItem('profile');
              this.router.navigate(['#registerCitizen']);
            }
          );
        }
        else {
          globalService.profile = JSON.stringify(profile);
          userService.getOne(profile['identities'][0]['user_id']).subscribe(
            res => {
              console.log('trouve')
            },
            err => {
              console.log('non trouve');
              this.router.navigate(['#registerCitizen']);
            }
          );
        }

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
    console.log(userProfile);
    return userProfile && userProfile.app_metadata
      && userProfile.app_metadata.roles
      && userProfile.app_metadata.roles.indexOf('admin') > -1;
  }
}
