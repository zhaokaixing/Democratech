import {Component, OnInit} from '@angular/core';
import {Projecct, Project} from'./model/Project';
import {ProjectService} from "./service/project.service";
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'views/home.component.html',
  styleUrls : ['views/styles/home.component.styles.css'],
  providers: [ProjectService]
})

export class HomeComponent implements OnInit{

  projects : [Project];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(){
    this.projectService.getAll().subscribe(projects => {
      console.log(projects);
    });
  }
  PROJECTS: Projecct[] = [
    {id: 1, image: '/ressources/images/ecole.jpg' , label: 'Construction', description: 'Construction d\'une école'},
    {id: 2, image: '/ressources/images/ecolo.jpg', label: 'Ecologie', description: 'Ouverture gîte écologique'},
    {id: 3, image: '/ressources/images/pont.jpg', label: 'Construction', description: 'Construction d\'un pont traversant la Loire'},
    {id: 4, image: '/ressources/images/route.jpg', label: 'Construction', description: 'Rénovation de l\'autoroute A10'}
  ];

  selectProject(project:Projecct ):void {
    localStorage.setItem("id", project.id.toString());
    this.router.navigateByUrl('/project').then(res => console.log(res));
  }
}

