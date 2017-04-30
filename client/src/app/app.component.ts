import { Component, OnInit } from '@angular/core';
import {Auth0Service} from "./services/auth0.service";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: Auth0Service) {}

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.profile = JSON.parse(localStorage.getItem('profile'));
    }
  }

  title = 'Democratech';
  profile: string = null;
}
