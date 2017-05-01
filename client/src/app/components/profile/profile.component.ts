import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";
import { ProfileCitizenComponent } from "app/components/profile/profile-citizen/profile-citizen.component";
import { ProfileOrganisationComponent } from "app/components/profile/profile-organisation/profile-organisation.component";
import { DepartmentService } from "app/services/department.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ DepartmentService ]
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  departments = [{}];

  constructor(private userService: UserService, private departmentService: DepartmentService) {}

  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let identity = profile['identities'][0];

    this.userService.getOne(identity['user_id'])
      .subscribe(usr => {
        this.user = usr ? usr : this.user;
        this.user.image = this.user.image ? this.user.image : profile['picture'];

        console.log(this.user);
      });
  }
  

  getDepartments() {
    console.log('coucou');
    this.departmentService.getAll().subscribe(dpts => {
      this.departments = dpts;
    })
  }
}
