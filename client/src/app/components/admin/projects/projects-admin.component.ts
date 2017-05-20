import { Component, OnInit } from '@angular/core';
import { Project } from "app/models/Project";
import { ProjectService } from "app/services/project.service";
import { Positioning } from "angular2-bootstrap-confirm/position";
import { ConfirmOptions, Position } from "angular2-bootstrap-confirm";
import { ProjectEditComponent } from "app/components/admin/projects/project-edit/project-edit.component";
import { FlashMessagesService } from "angular2-flash-messages";
import { WindowRef } from "angular2-google-maps/core/utils/browser-globals";

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

  constructor(private projectService: ProjectService,
              private windowRef: WindowRef,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.getProjects();
  }

  deleteProject(id: number){
    //todo: archive ? suppress ? comments, project followed...
    this.projectService.delete(this.projects[id]._id).subscribe(res => {
      console.log(res);
      if (res.ok) {
        this.flashMessagesService.show('Utilisateur ' + this.projects[id].title + ' supprimé !', 
          { cssClass: 'alert-success', timeout: 5000 });
        this.getProjects();
      }
      else this.flashMessagesService.show('Erreur lors de la suppression de l\'utilisateur.', { cssClass: 'alert-success', timeout: 5000 });
      this.windowRef.getNativeWindow().scrollTo(0,0);
    })
  }

  getProjects() {
    this.projectService.getAll().subscribe(res => {
      this.projects = res;
      console.log(this.projects);
    })
  }
  
  selectIndex(id: number) {
    this.selectedIndex = id;
  }
}
