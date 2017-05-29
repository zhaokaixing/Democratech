import { Component, OnInit } from '@angular/core';
import { Auth0Service } from "./services/auth0.service";
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";
import { Observable } from "rxjs/Observable";
import { GlobalProfileService } from "app/services/global.service";
import { LoaderService } from 'app/services/loader.service';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoader: boolean;
  title = 'Democratech';
  user = new User();
  role: any;


  constructor(private loaderService: LoaderService,
              private authService: Auth0Service,
              private userService: UserService,
              private globalService: GlobalProfileService) {}

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    this.getUser(localStorage.getItem('profile'));
    this.globalService._profile.subscribe(res => {
      this.getUser(res as string);
    })
  }

  getUser(profileStr: any) {
    let profile = JSON.parse(profileStr);
    if (profile) {
      let userId = profile['identities'][0]['user_id'];
      if (userId) {
        this.userService.getOne(userId).subscribe(res => {
          this.user = res;
        });
      }
    }
  }

  isAdmin(): string {
    if (!this.role)
      this.role = this.authService.isAdmin() ? 'admin' : 'user';

    return this.role;
  }
}
