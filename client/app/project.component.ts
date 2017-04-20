import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from './service/project.service';
import {CommentService} from './service/comment.service';
import {Project} from'./model/Project';
import { AuthService } from './service/auth.service';
import 'rxjs/add/operator/switchMap';
import {Comments} from "./model/Comments";

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
    providers: [ProjectService,CommentService],
})


export class ProjectComponent implements OnInit{
    MessageList: Comments[];
    project: Project = new Project();
    /*MessageList: Message[] = [
        { username: "Marc",hour:13,minute:25,jour:15,mois:3,annee:2017,message:"Projet très utile"},
        { username: "Marie",hour:15,minute:11,jour:15,mois:3,annee:2017,message:"Très bonne initiative."},
        { username: "Lucas",hour:16,minute:52,jour:15,mois:3,annee:2017,message:"Depuis le temps !!!!"},
        { username: "Alex",hour:17,minute:16,jour:15,mois:3,annee:2017,message:"Tout à fait d'accord avec Marie !"},
        { username: "Claire",hour:18,minute:25,jour:15,mois:3,annee:2017,message:"Quand serons finis les travaux ?"},
        { username: "Entreprise de construction Dupont",hour:18,minute:45,jour:15,mois:3,annee:2017,message:"Les travaux seront terminés avant les vacances de noel !" }
    ];*/
    constructor(private projectService: ProjectService,private commentService:CommentService, private router: Router, private route: ActivatedRoute,private authService: AuthService) {this.project=new Project();}


    ngOnInit(): void {
        this.route.params
                .switchMap((params: Params) => this.projectService.getOne(params['id']))
                .subscribe(project => {
                        //console.log(project);
                     this.project = project;
                     this.getComments(this.project._id);

                     var progressBar = document.getElementById("progress");
                     progressBar.style.width=((this.project.progress*100).toString())+"%";
                 });

    }

    getComments(idProject:string):void{
        this.commentService
            .getComments(idProject)
            .then(com => this.MessageList = com);
    }
    getProgress():number{
       return this.project.progress*100;
    }


}
