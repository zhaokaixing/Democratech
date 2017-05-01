import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/User";

@Component({
  selector: 'app-profile-organisation',
  templateUrl: './profile-organisation.component.html',
  styleUrls: ['./profile-organisation.component.css']
})
export class ProfileOrganisationComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
