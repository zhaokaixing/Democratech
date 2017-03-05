import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'views/app.component.html',
  styles : ['.navbar-right { margin-right: 0px !important}']
})

export class AppComponent { 
  title = 'Democratech';
  constructor(private authService: AuthService) {}
}
