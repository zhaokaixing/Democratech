import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from './service/project.service';
import {Project} from'./model/Project';
import 'rxjs/add/operator/switchMap';

export class Message {
    username: string;
    hour:number;
    minute:number;
    message:string;
    jour:number;
    mois:number;
    annee:number;

}

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'views/project.component.html',
    styleUrls: ['views/styles/project.component.styles.css'],
    providers: [ProjectService],
})


export class ProjectComponent implements OnInit{

    project: Project = new Project();
    MessageList: Message[] = [
        { username: "Marc",hour:13,minute:25,jour:15,mois:3,annee:2017,message:"Projet très utile"},
        { username: "Marie",hour:15,minute:11,jour:15,mois:3,annee:2017,message:"Très bonne initiative."},
        { username: "Lucas",hour:16,minute:52,jour:15,mois:3,annee:2017,message:"Depuis le temps !!!!"},
        { username: "Alex",hour:17,minute:16,jour:15,mois:3,annee:2017,message:"Tout à fait d'accord avec Marie !"},
        { username: "Claire",hour:18,minute:25,jour:15,mois:3,annee:2017,message:"Quand serons finis les travaux ?"},
        { username: "Entreprise de construction Dupont",hour:18,minute:45,jour:15,mois:3,annee:2017,message:"Les travaux seront terminés avant les vacances de noel !" }
    ];
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
