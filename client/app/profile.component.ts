import { Component, OnInit } from '@angular/core';
import { OrganisationService } from "./service/organisation.service";
import { CitizenService } from "./service/citizen.service";
import { User } from "./model/User";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'views/profile.component.html',
  providers: [ OrganisationService, CitizenService ]
})

export class ProfileComponent implements OnInit {
  user: User = new User();
  defaultPicture: string;

  constructor(private userService: OrganisationService, private citizenService: CitizenService) {}

  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let identity = profile['identities'][0];
    this.defaultPicture = profile['picture'];

    console.log(profile);

    this.userService.getOne(identity['user_id'])
      .subscribe(org => {
        this.user = org != null ? org : this.user;

        console.log(this.user);
      });

    this.citizenService.getCitizen(identity['user_id'])
      .subscribe(citizen => {
        this.user = citizen != null ? citizen : this.user;

        console.log(this.user);
      });
  }
}