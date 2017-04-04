import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from './service/project.service';
import {Project} from'./model/Project';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'views/project.component.html',
    styleUrls: ['views/styles/project.component.styles.css'],
    providers: [ProjectService],
})

export class ProjectComponent implements OnInit{

    project: Project = new Project();
    lat: number = 51.678418;
    lng: number = 7.809007;
    constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {}


    ngOnInit(): void {

        this.route.params
                .switchMap((params: Params) => this.projectService.getOne(params['id']))
                .subscribe(project => {
                        console.log(project);
                     this.project = project
                       });
    }

}
