import { Component, OnInit } from '@angular/core';
import { Project } from "app/models/Project";
import { ProjectService } from "app/services/project.service";
import { Positioning } from "angular2-bootstrap-confirm/position";
import { ConfirmOptions, Position } from "angular2-bootstrap-confirm";

@Component({
  selector: 'app-projects-admin',
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.css'],
  providers: [ ProjectService, ConfirmOptions, { provide: Position, useClass: Positioning } ]
})
export class ProjectsAdminComponent implements OnInit {
  public title: string = 'Avertissement';
  public message: string = 'Ếtes vous sure de vouloir supprimer ce projet ? Cette action n\'est pas réversible.';

  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(res => {
      this.projects = res;
      console.log(this.projects);
    })
  }

  deleteProject(){
    console.log('todo');
  }
}
