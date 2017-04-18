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

    constructor(private  http:Http) {
        //console.log('Comment Service Initialized...');
    }


    /*getComments(idProject:string): Observable<Comments[]> {
        return this.http.get('/api/comment/'+idProject)
            .map(res => res.json());
    }*/

    getComments(id:string): Promise<Comments[]>{
        //console.log(id);
        /*return this.http.get('/api/comment'+id)
            .map(res =>{
                console.log(res.json());
                return res.json();
            } );*/
        return this.http.get(BaseUrl.name +'api/comments/'+id)
                .toPromise()
                .then(response =>
                    response.json() as Comments[]
                )
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
