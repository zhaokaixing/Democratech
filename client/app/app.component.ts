import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'views/app.component.html',
  styleUrls : ['views/styles/app.component.styles.css']
})

export class AppComponent { 
  title = 'Democratech';
  profile = JSON.parse(localStorage.getItem('profile'));

  constructor(private authService: AuthService) {
    let test = JSON.parse(localStorage.getItem('profile'));
    console.log(test)
  }
}
