import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Project} from'./model/Project';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'views/home.component.html',
  styleUrls : ['views/styles/home.component.styles.css']
})

export class HomeComponent implements OnInit{
  PROJECTS:Project[] = [
    { image:"/ressources/images/ecole.jpg" , label: 'Construction', description:"Construction d'une école"},
    { image:"/ressources/images/ecolo.jpg", label: 'Ecologie', description:"Ouverture gîte écologique"},
    { image: "/ressources/images/pont.jpg", label: 'Construction', description:"Construction d'un pont traversant la Loire"},
    { image: "/ressources/images/route.jpg", label: 'Construction', description:"Rénovation de l'autoroute A10"}
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    var i=0;
    for (i=0; i<4; i++){
      console.log(this.PROJECTS[i]);
    }

  }
}
