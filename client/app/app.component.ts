import { Component , OnInit} from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'views/app.component.html',
  styleUrls : ['views/styles/app.component.styles.css']
})

export class AppComponent { 
  title = 'Democratech';
  profile: any = {};

  constructor(private authService: AuthService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }
}
