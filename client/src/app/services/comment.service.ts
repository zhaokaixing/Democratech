/**
 * Created by lelib on 06/04/2017.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { BaseUrl } from '../config/auth.config'
import {Comment} from 'app/models/Comment'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CommentService{
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  getAll(projectId: string): Observable<Comment[]>{
    return this.http.get(BaseUrl.API + 'api/comments/' + projectId)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }

  add(comment: Comment) {
    return this.http
      .post(BaseUrl.API + 'api/comment', JSON.stringify(comment), { headers: this.headers })
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        console.log(error);

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
