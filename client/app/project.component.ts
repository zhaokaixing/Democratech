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
    messageToSend:string;
    MessageList: Comments[];
    project: Project = new Project();

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

    Send():void{
        var infoConnexion="";
        infoConnexion=localStorage.getItem('profile').split(",")[3].split(":")[1];
        var name=infoConnexion.substring(1,infoConnexion.length-1);
        var d = new Date();
        var date= new Date();
        this.commentService.saveComment(this.messageToSend, name, this.project._id, date.toLocaleDateString());
        this.messageToSend="";
        this.getComments(this.project._id);
    }


}
