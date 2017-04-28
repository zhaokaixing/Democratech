import { Component, OnInit } from '@angular/core';
import { OrganisationService } from "./service/organisation.service";
import { CitizenService } from "./service/citizen.service";
import { User } from "./model/User";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'views/profile.component.html',
  styleUrls: ['views/styles/profile.component.style.css'],
  providers: [ OrganisationService, CitizenService ]
})

export class ProfileComponent implements OnInit {
  user: User = new User();

  constructor(private organisationService: OrganisationService, private citizenService: CitizenService) {}

  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let identity = profile['identities'][0];

    console.log(profile);

    this.organisationService.getOne(identity['user_id'])
      .subscribe(org => {
        this.user = org != null ? org : this.user;
        this.user.image = this.user.image ? this.user.image : profile['picture'];

        console.log(this.user);
      });

    this.citizenService.getOne(identity['user_id'])
      .subscribe(citizen => {
        this.user = citizen != null ? citizen : this.user;
        this.user.image = this.user.image ? this.user.image : profile['picture'];

        console.log(this.user);
      });
  }
}