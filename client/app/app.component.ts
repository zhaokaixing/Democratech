import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'views/app.component.html',
  styleUrls : ['views/styles/home.component.styles.css']
})

export class AppComponent { 
  title = 'Democratech';
  constructor(private authService: AuthService) {}
}
