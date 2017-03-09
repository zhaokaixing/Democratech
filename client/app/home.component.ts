import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'views/home.component.html',
  styleUrls : ['views/styles/home.component.styles.css']
})

export class HomeComponent { 
  constructor(private authService: AuthService) {}
}
