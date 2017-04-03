import {Component, OnInit} from '@angular/core';
import {Project} from'./model/Project';
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

  projects: Project[];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(){
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
      console.log(projects);
    });
  }
  selectProject(project: Project):void {
    // localStorage.setItem("id", project.id.toString());
    this.router.navigate(['/project', project._id]).then(res => console.log(res));
  }
}

