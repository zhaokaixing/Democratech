/**
 * Created by lelib on 06/04/2017.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { BaseUrl } from '../config/auth.config'
import {Comment} from 'app/models/Comment'
import {handleError} from 'app/services/handle-error'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService{
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  /**
   * get all comments from one project
   * @param projectId the project's id
   */
  getAll(projectId: string): Observable<Comment[]>{
    return this.http.get(BaseUrl.API + 'api/comments/' + projectId)
      .map(res => res.json())
      .catch(err => handleError(err));
  }

  /**
   * add a new comment
   * @param comment the comment
   */
  add(comment: Comment) {
    return this.http
      .post(BaseUrl.API + 'api/comment', JSON.stringify(comment), { headers: this.headers })
      .map(res => res.json())
      .catch(err => handleError(err));
  }
}
