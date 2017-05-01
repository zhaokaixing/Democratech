import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService) {}

  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let identity = profile['identities'][0];

    this.userService.getOne(identity['user_id'])
      .subscribe(org => {
        this.user = org != null ? org : this.user;
        this.user.image = this.user.image ? this.user.image : profile['picture'];

        console.log(this.user);
      });
  }

}
