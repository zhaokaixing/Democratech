import {Component, OnInit} from '@angular/core';
import { AuthService } from './service/auth.service';
import {Projecct, Project} from'./model/Project';
import {ProjectService} from "./service/project.service";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'views/home.component.html',
  styleUrls : ['views/styles/home.component.styles.css'],
  providers: [ProjectService]
})

export class HomeComponent implements OnInit{

  projects : Project = new Project();

  constructor(private projectService: ProjectService){}

  ngOnInit(){

    this.projectService.getAll().subscribe(projects =>{
      console.log(projects);
    });
  }

  PROJECTS: Projecct[] = [
    {id: 1, image: '/ressources/images/ecole.jpg' , label: 'Construction', description: 'Construction d\'une école'},
    {id: 2, image: '/ressources/images/ecolo.jpg', label: 'Ecologie', description: 'Ouverture gîte écologique'},
    {id: 3, image: '/ressources/images/pont.jpg', label: 'Construction', description: 'Construction d\'un pont traversant la Loire'},
    {id: 4, image: '/ressources/images/route.jpg', label: 'Construction', description: 'Rénovation de l\'autoroute A10'}
  ];
}

