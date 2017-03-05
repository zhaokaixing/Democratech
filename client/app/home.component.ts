import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'views/home.component.html',
  styles : ['.navbar-right { margin-right: 0px !important}']
})

export class HomeComponent { 
  constructor(private authService: AuthService) {}
}
