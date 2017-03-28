import { Component, OnInit } from '@angular/core';
import { OrganisationService } from "./service/OrganisationService";

@Component({
  moduleId: module.id,
  selector: 'profile',
  template: `<h1 class="page-header">Private content</h1>`,
  providers: [ OrganisationService ]
})

export class ProfileComponent implements OnInit {
  organisation: any;

  constructor(private userService: OrganisationService) {}

  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let nickname = profile['nickname'];
    let identity = profile['identities'][0];

    console.log(profile);

    this.userService.getOrganisation(identity['user_id'])
      .subscribe(result => {
        this.organisation = result;
        console.log(this.organisation);
      });
  }
}