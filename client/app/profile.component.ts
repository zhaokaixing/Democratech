import { Component, OnInit } from '@angular/core';
import { OrganisationService } from "./service/OrganisationService";
import {Organisation} from "./model/Organisation";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'views/profile.component.html',
  providers: [ OrganisationService ]
})

export class ProfileComponent implements OnInit {
  user: Organisation = new Organisation();
  defaultPicture: string;

  constructor(private userService: OrganisationService) {

  }

  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let identity = profile['identities'][0];
    this.defaultPicture = profile['picture'];
    console.log(this.defaultPicture);

    this.userService.getOrganisation(identity['user_id'])
      .subscribe(result => {
        this.user = result;
        console.log(this.user.name);
      });
  }
}