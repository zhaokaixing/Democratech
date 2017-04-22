/**
 * Created by lelib on 06/04/2017.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { BaseUrl } from '../auth.config'
import {Comments} from"../model/Comments"
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CommentService{
    url:string;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private  http:Http) {
        //console.log('Comment Service Initialized...');
    }


    getComments(id:string): Promise<Comments[]>{
        return this.http.get(BaseUrl.name +'api/comments/'+id)
                .toPromise()
                .then(response =>
                    response.json() as Comments[]
                )
                .catch(this.handleError);
    }
    saveComment(message:string, author:string, projectId:string, date:string): Promise<void> {
        this.url = BaseUrl.name +'api/comments';
        return this.http
            .post(this.url, { projectId,author,date,message}, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
