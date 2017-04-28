import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from './service/project.service';
import {CommentService} from './service/comment.service';
import {Project} from'./model/Project';
import { AuthService } from './service/auth.service';
import 'rxjs/add/operator/switchMap';
import {Comments} from "./model/Comments";
import {Opinion} from "./model/Opinion"
import {OpinionService} from "./service/opinion.service"
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'views/project.component.html',
    styleUrls: ['views/styles/project.component.styles.css'],
    providers: [ProjectService,CommentService,OpinionService],
})


export class ProjectComponent implements OnInit{
    messageToSend:string;
    MessageList: Comments[];
    project: Project = new Project();

    constructor(private opinionService: OpinionService,private projectService: ProjectService,private commentService:CommentService, private router: Router, private route: ActivatedRoute,private authService: AuthService) {this.project=new Project();}


    ngOnInit(): void {
        this.route.params
                .switchMap((params: Params) => this.projectService.getOne(params['id']))
                .subscribe(project => {
                        //console.log(project);
                     this.project = project;
                     this.getComments(this.project._id);
                     var progressBar = document.getElementById("progress");
                     progressBar.style.width=((this.project.progress*100).toString())+"%";
                     this.alreadyGiveOpinion(this.project._id);
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
    alreadyGiveOpinion(idProject:string){
        var opinion=3;
        if(localStorage.getItem('profile').startsWith("{\"email\":")){
            var mail=localStorage.getItem('profile').split(",")[0].split(":")[1];
            mail=mail.substring(1,mail.length-1);
        }
        else if(localStorage.getItem('profile').startsWith("{\"nickname\":")){
            var mail=localStorage.getItem('profile').split(",")[11].split(":")[1];
            mail=mail.substring(1,mail.length-1);
        }
        this.opinionService.alreadyVote(mail,this.project._id)
            .then(response =>{
                this.updateStyleVote(response);

            }

            )
    }
    updateStyleVote(response:number):void{
        if(response==1){
            var button = document.getElementById("like");
            button.style.color='rgb(91,192,222)';
            button = document.getElementById("dislike");
            button.style.color='white';
        }
        if(response==2){
            var button = document.getElementById("dislike");
            button.style.color='rgb(91,192,222)';
            button = document.getElementById("like");
            button.style.color='white';
        }
        if(response==3){
            var button = document.getElementById("dislike");
            button.style.color='white';
            button = document.getElementById("like");
            button.style.color='white';
        }
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
    voteFor():void{

        this.vote(0);
    }
    voteAgainst():void{
        this.vote(1);
    }
    vote(value:number):void{
        var mail="";
        if(localStorage.getItem('profile').startsWith("{\"email\":")){
            mail=localStorage.getItem('profile').split(",")[0].split(":")[1];
            mail=mail.substring(1,mail.length-1);
        }
        else if(localStorage.getItem('profile').startsWith("{\"nickname\":")){
            mail=localStorage.getItem('profile').split(",")[11].split(":")[1];
            mail=mail.substring(1,mail.length-1);

        }
        else{
            alert ("Ce type de compte ne permet pas d'aimer un projet !");
        }

        this.opinionService.vote(value,mail,this.project._id)
            .then((res) => {
                this.updateStyleVote(res);
            })
    }


}
