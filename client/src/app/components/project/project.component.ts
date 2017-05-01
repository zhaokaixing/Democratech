import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { OpinionService } from "app/services/opinion.service";
import { ProjectService } from "app/services/project.service";
import { CommentService } from "app/services/comment.service";

import { Auth0Service } from "app/services/auth0.service";
import 'rxjs/add/operator/switchMap';

import { Opinion } from "app/models/Opinion";
import { Comment } from "app/models/Comment";
import { Project } from "app/models/Project";

@Component({
  moduleId: module.id,
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, CommentService, OpinionService]
})
export class ProjectComponent implements OnInit {
    messageToSend:string;
    MessageList: Comment[];
    project: Project = new Project();
    profile: any;
    userId: string;
    opinion: Opinion = null;

    constructor(private opinionService: OpinionService,
                private projectService: ProjectService,
                private commentService:CommentService, 
                private router: Router, 
                private route: ActivatedRoute,
                private authService: Auth0Service) {}

    ngOnInit(): void {
        this.getUserInfo();

        this.route.params.switchMap(params => {
            return this.projectService.getOne(params['id'])
        })
        .subscribe(project => {
                this.project = project;
                
                var progressBar = document.getElementById("progress");
                progressBar.style.width=((this.project.progress*100).toString())+"%";

                this.getOpinion(project._id);
                this.getComments(this.project._id);
                this.getVotesCount(this.project);
        });
    }

    getUserInfo() {
      this.profile = JSON.parse(localStorage.getItem('profile'));
      if (this.profile)
        this.userId = this.profile['identities'][0]['user_id'].replace('auth0|', '');
    }

    getOpinion(idProject: string) {
        if (this.profile) {
            this.opinionService.getOne(this.userId, idProject).subscribe(res => {
                this.opinion = res;
                this.updateVoteStyle(res ? res.opinion : 2)
                this.getVotesCount(this.project);
            })
        } 
    }
    getComments(idProject: string):void{
        this.commentService
            .getAll(idProject)
            .subscribe(comments => this.MessageList = comments);
    }
    getProgress():number{
       return this.project.progress*100;
    }

    updateVoteStyle(vote:number):void{
        if(vote==1){
            var button = document.getElementById("like");
            button.style.color='rgb(91,192,222)';
            button = document.getElementById("dislike");
            button.style.color='white';
        }
        else if(vote==0){
            var button = document.getElementById("dislike");
            button.style.color='rgb(91,192,222)';
            button = document.getElementById("like");
            button.style.color='white';
        }
        else {
            var button = document.getElementById("dislike");
            button.style.color='white';
            button = document.getElementById("like");
            button.style.color='white';
        }
    }

    send():void{
        var infoConnexion="";
        var name = this.profile['name'];
        let comment = {
          idProject: this.project._id,
          date: new Date(),
          content: this.messageToSend,
          name: name
        }
        this.commentService.add(comment).subscribe(res => {
            this.MessageList.push(res);
        });
        this.messageToSend="";
        this.getComments(this.project._id);
    }
    

    vote(value:number):void{
        if (!this.opinion) {
            let opinion: Opinion = {
                idProject: this.project._id,
                idUser: this.userId,
                opinion: value
            }
            this.opinionService.add(opinion).subscribe(res => {
                this.opinion = res;
                this.updateVoteStyle(res.opinion);
                this.getVotesCount(this.project)
            });
        }
        else if (this.opinion.opinion == value) {
            this.opinionService.remove(this.opinion._id).subscribe(res => {
                this.updateVoteStyle(res.opinion);
                this.getVotesCount(this.project)
                this.opinion = null;
            });
        }
        else {
            this.opinion.opinion = value;
            this.opinionService.update(this.opinion).subscribe((res) => {
                this.updateVoteStyle(value);
                this.getVotesCount(this.project)
            })
        }
    }

    getVotesCount(project: Project) {
        this.opinionService.getVotesCount(project._id, 1).subscribe((res) => {
            project.plusMark = res;
        })
        this.opinionService.getVotesCount(project._id, 0).subscribe((res) => {
            project.minusMark = res;
        })
    }
}