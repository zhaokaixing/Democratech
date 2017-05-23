import { Component, OnInit } from '@angular/core';
import { Project } from "app/models/Project";
import { ProjectService } from "app/services/project.service";
import { Positioning } from "angular2-bootstrap-confirm/position";
import { ConfirmOptions, Position } from "angular2-bootstrap-confirm";
import { ProjectEditComponent } from "app/components/admin/projects/project-edit/project-edit.component";
import { FlashMessagesService } from "angular2-flash-messages";
import { WindowRef } from "angular2-google-maps/core/utils/browser-globals";

import { LoaderService } from 'app/services/loader.service';

@Component({
  selector: 'app-projects-admin',
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.css'],
  providers: [ ProjectService, ConfirmOptions, { provide: Position, useClass: Positioning } ]
})
export class ProjectsAdminComponent implements OnInit {
  public title: string = 'Avertissement';
  public message: string = 'Êtes vous sure de vouloir supprimer ce projet ? Cette action n\'est pas réversible.';
  public selectedIndex: number = -1;

  projects: Project[] = [];

  constructor(private loaderService: LoaderService,
              private projectService: ProjectService,
              private windowRef: WindowRef,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.getProjects();
  }

  deleteProject(id: number){
    //todo: archive ? suppress ? comments, project followed...
    this.projectService.delete(this.projects[id]._id).subscribe(res => {
      if (res.ok) {
        this.flashMessagesService.show('Projet ' + this.projects[id].title + ' supprimé !',
          { cssClass: 'alert-success', timeout: 5000 });
        this.getProjects();
      }
      else this.flashMessagesService.show('Erreur lors de la suppression du projet.',
            { cssClass: 'alert-danger', timeout: 5000 });

      this.windowRef.getNativeWindow().scrollTo(0,0);
    })
  }

  getProjects() {
    this.projectService.getAll().subscribe(res => {
      this.projects = res;

    })
  }

  selectIndex(id: number) {
    this.selectedIndex = id;
  }
}
