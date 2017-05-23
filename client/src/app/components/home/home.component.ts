import {Component, OnInit} from '@angular/core';
import { Jsonp, Http, Headers, URLSearchParams } from "@angular/http";
import { Router, ActivatedRoute } from '@angular/router';

import {Project} from'../../models/Project';
import {ProjectService} from "../../services/project.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { LoaderService } from 'app/services/loader.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ ProjectService ]
})
export class HomeComponent implements OnInit {

  constructor(private loaderService: LoaderService,
              private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,) {}

  projects: Project[];
  result: any;

  ngOnInit() {
    this.loaderService.display(true);
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
      this.loaderService.display(false);
    });
  }
  selectProject(project: Project):void {
    this.router.navigate(['/projet', project._id]);
  }
}
