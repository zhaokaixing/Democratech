import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/User";

@Component({
  selector: 'app-profile-citizen',
  templateUrl: './profile-citizen.component.html',
  styleUrls: ['./profile-citizen.component.css']
})
export class ProfileCitizenComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }
  
}
