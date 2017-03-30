import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Project} from'./model/Project';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'views/home.component.html',
  styleUrls : ['views/styles/home.component.styles.css']
})

export class HomeComponent {
  PROJECTS: Project[] = [
    {id: 1, image: '/ressources/images/ecole.jpg' , label: 'Construction', description: 'Construction d\'une école'},
    {id: 2, image: '/ressources/images/ecolo.jpg', label: 'Ecologie', description: 'Ouverture gîte écologique'},
    {id: 3, image: '/ressources/images/pont.jpg', label: 'Construction', description: 'Construction d\'un pont traversant la Loire'},
    {id: 4, image: '/ressources/images/route.jpg', label: 'Construction', description: 'Rénovation de l\'autoroute A10'}
  ];
  selectProject(project:Project):void {
    localStorage.setItem("id", project.id.toString());
    this.router.navigateByUrl('/project');
  }

  constructor(private authService: AuthService,private router: Router) {}
}
